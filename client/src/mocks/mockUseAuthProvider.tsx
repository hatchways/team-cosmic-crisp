import { FunctionComponent } from 'react';
import { AuthContext } from '../context/useAuthContext';
import { mockLoggedInUser, mockOtherUsers } from './mockUser';
import { mockProfile } from './mockProfile';
import { mockNotification } from './mockNotifications';

const MockUseAuthProvider: FunctionComponent = ({ children }) => {
  return (
    <AuthContext.Provider
      value={{
        userProfiles: mockOtherUsers,
        profileDetails: mockProfile,
        loggedInUser: mockLoggedInUser,
        loading: true,
        errorMsg: '',
        setLoading: jest.fn(),
        updateLoginContext: jest.fn(),
        updateUserProfilesContext: jest.fn(),
        updateProfileDetailsContext: jest.fn(),
        logout: jest.fn(),
        notifications: mockNotification,
        updateNotificationsContext: jest.fn(),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default MockUseAuthProvider;
