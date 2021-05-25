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
import loginWithCookies from '../helpers/APICalls/loginWithCookies';
import logoutAPI from '../helpers/APICalls/logout';
import searchProfilesAPI from '../helpers/APICalls/searchProfiles';
import searchProtectedProfilesAPI from '../helpers/APICalls/searchProtectedProfiles';

interface IAuthContext {
  loggedInUser: User | null | undefined;
  userProfiles: User[];
  profileDetails: Profile | null | undefined;
  updateLoginContext: (data: AuthApiDataSuccess) => void;
  updateUserProfilesContext: (data: UserProfileApiDataSuccess) => void;
  updateProfileDetailsContext: (data: ProfileDetailsApiDataSuccess) => void;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  loggedInUser: undefined,
  userProfiles: [],
  profileDetails: undefined,
  updateLoginContext: () => null,
  updateUserProfilesContext: () => null,
  updateProfileDetailsContext: () => null,
  logout: () => null,
});

export const AuthProvider: FunctionComponent = ({ children }): JSX.Element => {
  // default undefined before loading, once loaded provide user or null if logged out
  const [loggedInUser, setLoggedInUser] = useState<User | null | undefined>();
  const [userProfiles, setUserProfiles] = useState<User[]>([]);
  const [profileDetails, setProfileDetails] = useState<Profile | null | undefined>();
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
    [loggedInUser],
  );

  const updateProfileDetailsContext = useCallback((data: ProfileDetailsApiDataSuccess) => {
    setProfileDetails(data.profile);
  }, []);

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
      await searchProfilesAPI().then((data: UserProfileApiData) => {
        if (data.success) {
          updateUserProfilesContext(data.success);
        }
      });
    };

    const fetchProtectedProfiles = async () => {
      await searchProtectedProfilesAPI().then((data: UserProfileApiData) => {
        if (data.success) {
          updateUserProfilesContext(data.success);
        }
      });
    };

    loggedInUser ? fetchProtectedProfiles() : fetchUserProfiles();
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
        userProfiles,
        profileDetails,
        updateProfileDetailsContext,
        loggedInUser,
        updateLoginContext,
        updateUserProfilesContext,
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
