import { useState, useContext, createContext, FunctionComponent, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import {
  AuthApiData,
  AuthApiDataSuccess,
  UserProfileApiData,
  UserProfileApiDataSuccess,
  SitterProfilesApiData,
  SitterProfilesApiDataSuccess,
} from '../interface/AuthApiData';
import { User } from '../interface/User';
import { Profile } from '../interface/Profile';
import loginWithCookies from '../helpers/APICalls/loginWithCookies';
import logoutAPI from '../helpers/APICalls/logout';
import searchSitterProfilesAPI from '../helpers/APICalls/searchProfiles';
import getUserProfileDetailsAPI from '../helpers/APICalls/getUserProfileDetails';
import { boolean } from 'yup';

interface IAuthContext {
  loggedInUser: User | null | undefined;
  loggedInUserDetails: Profile | null | undefined;
  sitterProfiles: Profile[];
  loading: boolean;
  errorMsg: string;
  updateLoginContext: (data: AuthApiDataSuccess) => void;
  updateLoggedInUserDetails: (data: UserProfileApiDataSuccess) => void;
  updateSitterProfilesContext: (data: SitterProfilesApiDataSuccess) => void;
  logout: () => void;
  setLoading: (value: boolean) => void;
}

export const AuthContext = createContext<IAuthContext>({
  loggedInUser: undefined,
  loggedInUserDetails: undefined,
  sitterProfiles: [],
  loading: true,
  errorMsg: '',
  updateLoginContext: () => null,
  updateLoggedInUserDetails: () => null,
  updateSitterProfilesContext: () => null,
  logout: () => null,
  setLoading: () => boolean,
});

export const AuthProvider: FunctionComponent = ({ children }): JSX.Element => {
  // default undefined before loading, once loaded provide user or null if logged out
  const [loggedInUser, setLoggedInUser] = useState<User | null | undefined>();
  const [loggedInUserDetails, setLoggedInUserDetails] = useState<Profile | null | undefined>();
  const [sitterProfiles, setSitterProfiles] = useState<Profile[]>([]);
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
      setSitterProfiles(data.users);
    },
    [history],
  );

  const updateLoggedInUserDetails = useCallback(
    (data: UserProfileApiDataSuccess) => {
      setLoggedInUserDetails(data.profile);
    },
    [history],
  );

  const getUserProfileDetails = useCallback(
    (id: string) => {
      getUserProfileDetailsAPI(id).then((data: UserProfileApiData) => {
        if (data.success) {
          updateLoggedInUserDetails(data.success);
        } else if (data.error) {
          setLoggedInUserDetails(null);
        }
      });
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

  useEffect(() => {
    const fetchSitterProfiles = async () => {
      setLoading(true);
      await searchSitterProfilesAPI().then((data: SitterProfilesApiData) => {
        if (data.success) {
          setErrorMsg('');
          updateSitterProfilesContext(data.success);
        } else if (data.error) {
          setErrorMsg(data.error.message);
        }
        setLoading(false);
      });
    };
    fetchSitterProfiles();
  }, [loggedInUser]);

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
        loading,
        errorMsg,
        setLoading,
        updateLoggedInUserDetails,
        updateLoginContext,
        updateSitterProfilesContext,
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
