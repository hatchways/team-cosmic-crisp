import { SitterProfilesApiData } from '../../interface/AuthApiData';
import { FetchOptions } from '../../interface/FetchOptions';

type filters = {
  city?: string;
  startDate?: Date;
  endDate?: Date;
};

const searchProfiles = async ({ city, startDate, endDate }: filters = {}): Promise<SitterProfilesApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  return await fetch(`/profiles?city=${city}&startDate=${startDate}&endDate=${endDate}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default searchProfiles;
