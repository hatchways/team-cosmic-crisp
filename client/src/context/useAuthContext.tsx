import { useState, useContext, createContext, FunctionComponent, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import {
  AuthApiData,
  AuthApiDataSuccess,
  UserProfileApiData,
  UserProfileApiDataSuccess,
  ProfileDetailsApiDataSuccess,
} from '../interface/AuthApiData';
import { User } from '../interface/User';
import { Profile } from '../interface/Profile';
import { Notification } from '../interface/Notification';
import loginWithCookies from '../helpers/APICalls/loginWithCookies';
import logoutAPI from '../helpers/APICalls/logout';
import { getUnreadNotifications } from '../helpers/APICalls/notifications';
import searchProfilesAPI from '../helpers/APICalls/searchProfiles';
import { boolean } from 'yup';

interface IAuthContext {
  loggedInUser: User | null | undefined;
  userProfiles: User[];
  profileDetails: Profile | null | undefined;
  loading: boolean;
  errorMsg: string;
  updateLoginContext: (data: AuthApiDataSuccess) => void;
  updateUserProfilesContext: (data: UserProfileApiDataSuccess) => void;
  updateProfileDetailsContext: (data: ProfileDetailsApiDataSuccess) => void;
  updateNotificationsContext: (data: Notification[]) => void;
  logout: () => void;
  setLoading: (value: boolean) => void;
  notifications: Notification[];
}

export const AuthContext = createContext<IAuthContext>({
  loggedInUser: undefined,
  userProfiles: [],
  profileDetails: undefined,
  notifications: [],
  loading: true,
  errorMsg: '',
  updateLoginContext: () => null,
  updateUserProfilesContext: () => null,
  updateProfileDetailsContext: () => null,
  updateNotificationsContext: () => null,
  logout: () => null,
  setLoading: () => boolean,
});

export const AuthProvider: FunctionComponent = ({ children }): JSX.Element => {
  // default undefined before loading, once loaded provide user or null if logged out
  const [loggedInUser, setLoggedInUser] = useState<User | null | undefined>();
  const [userProfiles, setUserProfiles] = useState<User[]>([]);
  const [notifications, setNotification] = useState<Notification[]>([]);
  const [profileDetails, setProfileDetails] = useState<Profile | null | undefined>();
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

  const updateUserProfilesContext = useCallback(
    (data: UserProfileApiDataSuccess) => {
      setUserProfiles(data.users);
    },
    [history],
  );

  const updateProfileDetailsContext = useCallback(
    (data: ProfileDetailsApiDataSuccess) => {
      setProfileDetails(data.profile);
      setLoading(false);
    },
    [history],
  );

  const updateNotificationsContext = useCallback(
    (data: Notification[]) => {
      setNotification(data);
    },
    [history],
  );

  const logout = useCallback(async () => {
    // needed to remove token cookie
    await logoutAPI()
      .then(() => {
        history.push('/login');
        setLoggedInUser(null);
      })
      .catch((error) => console.error(error));
  }, [history]);

  useEffect(() => {
    const fetchUserProfiles = async () => {
      setLoading(true);
      await searchProfilesAPI().then((data: UserProfileApiData) => {
        if (data.success) {
          setErrorMsg('');
          updateUserProfilesContext(data.success);
        } else if (data.error) {
          setErrorMsg(data.error.message);
        }
        setLoading(false);
      });
    };
    fetchUserProfiles();
  }, [loggedInUser]);

  useEffect(() => {
    async function fetchNotification() {
      try {
        const res = await getUnreadNotifications();
        console.log(res);
        res.notifications && updateNotificationsContext(res.notifications);
      } catch (error) {
        console.log('error occurred getting notifications', error);
      }
    }
    fetchNotification();
  }, [loggedInUser]);

  // use our cookies to check if we can login straight away
  useEffect(() => {
    const checkLoginWithCookies = async () => {
      await loginWithCookies().then((data: AuthApiData) => {
        if (data.success) {
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
        userProfiles,
        profileDetails,
        notifications,
        loading,
        errorMsg,
        setLoading,
        updateProfileDetailsContext,
        updateLoginContext,
        updateUserProfilesContext,
        updateNotificationsContext,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): IAuthContext {
  return useContext(AuthContext);
}
