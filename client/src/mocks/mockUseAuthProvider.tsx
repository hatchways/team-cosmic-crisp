import { FunctionComponent } from 'react';
import { AuthContext } from '../context/useAuthContext';
import { mockLoggedInUser } from './mockUser';
import { mockNotification } from './mockNotifications';
import { mockProfile, mockProfiles } from './mockProfile';

const MockUseAuthProvider: FunctionComponent = ({ children }) => {
  return (
    <AuthContext.Provider
      value={{
        sitterProfiles: mockProfiles,
        loggedInUserDetails: mockProfile,
        loggedInUser: mockLoggedInUser,
        loading: true,
        errorMsg: '',
        setLoading: jest.fn(),
        updateLoginContext: jest.fn(),
        updateSitterProfilesContext: jest.fn(),
        updateLoggedInUserDetails: jest.fn(),
        logout: jest.fn(),
        notifications: mockNotification,
        updateNotificationsContext: jest.fn(),
        getUserProfileDetails: jest.fn(),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default MockUseAuthProvider;
