import { FunctionComponent } from 'react';
import { AuthContext } from '../context/useAuthContext';
import { mockLoggedInUser, mockOtherUsers } from './mockUser';
import { mockProfile } from './mockProfile';

const MockUseAuthProvider: FunctionComponent = ({ children }) => {
  return (
    <AuthContext.Provider
      value={{
        userProfiles: mockOtherUsers,
        profileDetails: mockProfile,
        loggedInUser: mockLoggedInUser,
        updateLoginContext: jest.fn(),
        updateUserProfilesContext: jest.fn(),
        updateProfileDetailsContext: jest.fn(),
        logout: jest.fn(),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default MockUseAuthProvider;
