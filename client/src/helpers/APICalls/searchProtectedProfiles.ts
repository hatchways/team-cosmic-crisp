import { UserProfileApiData } from '../../interface/AuthApiData';
import { FetchOptions } from '../../interface/FetchOptions';

const searchProtectedProfiles = async (): Promise<UserProfileApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  return await fetch(`/profiles/protected`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default searchProtectedProfiles;
