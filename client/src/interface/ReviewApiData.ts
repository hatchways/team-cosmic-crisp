import { Profile } from './Profile';

export interface ReviewsApiDataSuccess {
  message: string;
  profile: Profile;
}

export interface ReviewsApiData {
  error?: { message: string };
  success?: ReviewsApiDataSuccess;
}
