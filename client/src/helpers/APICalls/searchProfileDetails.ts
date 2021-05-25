import { ProfileDetailsApiData } from '../../interface/AuthApiData';
import { FetchOptions } from '../../interface/FetchOptions';

const searchProfiles = async (id: string): Promise<ProfileDetailsApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  return await fetch(`/profiles/${id}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default searchProfiles;
