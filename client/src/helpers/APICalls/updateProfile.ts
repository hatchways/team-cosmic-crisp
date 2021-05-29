import { UserProfileApiData } from '../../interface/AuthApiData';
import { FetchOptions } from '../../interface/FetchOptions';
import { OwnerFormProfile } from '../../interface/Profile';

const updateProfiles = async (profileId: string, profile: OwnerFormProfile): Promise<UserProfileApiData> => {
  console.log('profile is ', profile);
  const fetchOptions: FetchOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(profile),
    credentials: 'include',
  };
  return await fetch(`/profiles/${profileId}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default updateProfiles;
