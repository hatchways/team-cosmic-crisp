import { FunctionComponent } from 'react';
import { AuthContext } from '../context/useAuthContext';
import { mockLoggedInUser } from './mockUser';
import { mockProfile, mockProfiles } from './mockProfile';
import { mockReviews } from './mockReview';

const MockUseAuthProvider: FunctionComponent = ({ children }) => {
  return (
    <AuthContext.Provider
      value={{
        sitterProfiles: mockProfiles,
        sitterReviews: mockReviews,
        loggedInUserDetails: mockProfile,
        loggedInUser: mockLoggedInUser,
        loading: true,
        errorMsg: '',
        setLoading: jest.fn(),
        updateLoginContext: jest.fn(),
        updateSitterProfilesContext: jest.fn(),
        updateReviewsContext: jest.fn(),
        updateLoggedInUserDetails: jest.fn(),
        logout: jest.fn(),
        getUserProfileDetails: jest.fn(),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default MockUseAuthProvider;
