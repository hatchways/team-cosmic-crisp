import { User } from './User';
import { Profile } from './Profile';

export interface AuthApiDataSuccess {
  message: string;
  user: User;
  token: string;
}

export interface SitterProfilesApiDataSuccess {
  message: string;
  profiles: Profile[];
  token: string;
}

export interface UserProfileApiDataSuccess {
  message: string;
  profile: Profile;
  token: string;
}

export interface AuthApiData {
  error?: { message: string };
  success?: AuthApiDataSuccess;
}

export interface SitterProfilesApiData {
  error?: { message: string };
  success?: SitterProfilesApiDataSuccess;
}

export interface UserProfileApiData {
  error?: { message: string };
  success?: UserProfileApiDataSuccess;
}
