import {
  useState,
  useContext,
  createContext,
  FunctionComponent,
  useEffect,
  useCallback,
  Dispatch,
  SetStateAction,
} from 'react';
import { useHistory } from 'react-router-dom';
import {
  AuthApiData,
  AuthApiDataSuccess,
  UserProfileApiData,
  SitterProfilesApiData,
  SitterProfilesApiDataSuccess,
} from '../interface/AuthApiData';
import { ReviewsApiDataSuccess } from '../interface/ReviewApiData';
import { User } from '../interface/User';
import { Profile } from '../interface/Profile';
import { Notification, createNotificationData } from '../interface/Notification';
import { Review } from '../interface/Review';
import { Filter } from '../interface/Profile';
import loginWithCookies from '../helpers/APICalls/loginWithCookies';
import logoutAPI from '../helpers/APICalls/logout';
import searchSitterProfilesAPI from '../helpers/APICalls/searchProfiles';
import getUserProfileDetailsAPI from '../helpers/APICalls/getUserProfileDetails';
import { boolean } from 'yup';
import { getUnreadNotifications, createNewNotification } from '../helpers/APICalls/notifications';

interface IAuthContext {
  loggedInUser: User | null | undefined;
  loggedInUserDetails: Profile | null | undefined;
  sitterProfiles: Profile[];
  notifications: Notification[];
  filters: Filter;
  loading: boolean;
  errorMsg: string;
  updateLoginContext: (data: AuthApiDataSuccess) => void;
  updateLoggedInUserDetails: (data: UserProfileApiData) => void;
  updateSitterProfilesContext: (data: SitterProfilesApiDataSuccess) => void;
  updateNotificationsContext: (data: Notification[]) => void;
  createNotification: ({ types, description, targetId }: createNotificationData) => void;
  updateReviewsContext: (data: ReviewsApiDataSuccess) => void;
  logout: () => void;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setFilters: Dispatch<SetStateAction<Filter>>;
  getUserProfileDetails: (id: string) => void;
  calculateAvgRating: (reviews: Review[]) => number;
  fetchSitterProfiles: ({ city, startDate, endDate }: Filter) => void;
}

export const AuthContext = createContext<IAuthContext>({
  loggedInUser: undefined,
  loggedInUserDetails: undefined,
  sitterProfiles: [],
  notifications: [],
  filters: {},
  loading: true,
  errorMsg: '',
  updateLoginContext: () => null,
  updateLoggedInUserDetails: () => null,
  updateSitterProfilesContext: () => null,
  updateNotificationsContext: () => null,
  createNotification: () => null,
  updateReviewsContext: () => null,
  logout: () => null,
  setLoading: () => boolean,
  setFilters: () => null,
  getUserProfileDetails: () => null,
  calculateAvgRating: () => 0,
  fetchSitterProfiles: () => null,
});

export const AuthProvider: FunctionComponent = ({ children }): JSX.Element => {
  // default undefined before loading, once loaded provide user or null if logged out
  const [loggedInUser, setLoggedInUser] = useState<User | null | undefined>();
  const [loggedInUserDetails, setLoggedInUserDetails] = useState<Profile | null | undefined>();
  const [notifications, setNotification] = useState<Notification[]>([]);
  const [sitterProfiles, setSitterProfiles] = useState<Profile[]>([]);
  const [filters, setFilters] = useState<Filter>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const history = useHistory();

  const updateLoginContext = useCallback(
    (data: AuthApiDataSuccess) => {
      setLoggedInUser(data.user);
      history.push('/listings');
    },
    [history],
  );

  const updateSitterProfilesContext = useCallback(
    (data: SitterProfilesApiDataSuccess) => {
      setSitterProfiles(data.profiles);
    },
    [history],
  );

  const updateLoggedInUserDetails = useCallback(
    (data: UserProfileApiData) => {
      if (data.success !== undefined) {
        setLoggedInUserDetails(data.success.profile);
      }
    },
    [history],
  );

  const updateReviewsContext = useCallback(
    (data: ReviewsApiDataSuccess) => {
      const reviewedProfiles = sitterProfiles.map((profile) => {
        return profile._id !== data.profile._id ? profile : data.profile;
      });
      setSitterProfiles(reviewedProfiles);
    },
    [history, sitterProfiles],
  );

  const calculateAvgRating = useCallback(
    (reviews: Review[]) => {
      return reviews.reduce((a, { rating }) => a + rating, 0) / reviews.length;
    },
    [history],
  );

  const getUserProfileDetails = useCallback(
    (id: string) => {
      getUserProfileDetailsAPI(id).then((data: UserProfileApiData) => {
        if (data.success) {
          updateLoggedInUserDetails(data);
        } else if (data.error) {
          setLoggedInUserDetails(null);
        }
      });
    },
    [history],
  );

  const updateNotificationsContext = useCallback(
    (data: Notification[]) => {
      setNotification(data);
    },
    [history],
  );

  const createNotification = useCallback(
    async ({ types, description, targetId }: createNotificationData) => {
      try {
        if (targetId === '') {
          const res = await createNewNotification(types, description, targetId);
          res && res.notifications && updateNotificationsContext(res?.notifications);
        } else {
          await createNewNotification(types, description, targetId);
        }
      } catch (error) {
        throw new Error(`error updating notifications, ${error}`);
      }
    },
    [history],
  );

  const logout = useCallback(async () => {
    // needed to remove token cookie
    await logoutAPI()
      .then(() => {
        history.push('/login');
        setLoggedInUser(null);
        setLoggedInUserDetails(null);
      })
      .catch((error) => console.error(error));
  }, [history]);

  const fetchSitterProfiles = useCallback(
    async ({ city, startDate, endDate }: Filter) => {
      setLoading(true);
      await searchSitterProfilesAPI({ city, startDate, endDate }).then((data: SitterProfilesApiData) => {
        if (data.success) {
          updateSitterProfilesContext(data.success);
        } else if (data.error) {
          setErrorMsg(data.error.message);
        }
        setLoading(false);
      });
    },
    [history],
  );

  useEffect(() => {
    fetchSitterProfiles(filters);
  }, [loggedInUser, filters]);

  useEffect(() => {
    async function fetchNotification() {
      try {
        const res = await getUnreadNotifications();
        res.notifications && updateNotificationsContext(res.notifications);
      } catch (error) {
        console.log('error occurred getting notifications', error);
      }
    }
    fetchNotification();
  }, [loggedInUser, history]);

  // use our cookies to check if we can login straight away
  useEffect(() => {
    const checkLoginWithCookies = async () => {
      await loginWithCookies().then((data: AuthApiData) => {
        if (data.success) {
          getUserProfileDetails(data.success.user.profile);
          updateLoginContext(data.success);
          history.push('/listings');
        } else {
          // don't need to provide error feedback as this just means user doesn't have saved cookies or the cookies have not been authenticated on the backend
          setLoggedInUser(null);
        }
      });
    };
    checkLoginWithCookies();
  }, [updateLoginContext, history]);

  return (
    <AuthContext.Provider
      value={{
        loggedInUser,
        loggedInUserDetails,
        sitterProfiles,
        notifications,
        filters,
        loading,
        errorMsg,
        setLoading,
        setFilters,
        updateLoggedInUserDetails,
        updateLoginContext,
        updateNotificationsContext,
        createNotification,
        updateSitterProfilesContext,
        updateReviewsContext,
        logout,
        getUserProfileDetails,
        calculateAvgRating,
        fetchSitterProfiles,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): IAuthContext {
  return useContext(AuthContext);
}
