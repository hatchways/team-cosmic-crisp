import { User } from './User';
import { Profile } from './Profile';

export interface AuthApiDataSuccess {
  message: string;
  user: User;
  token: string;
}

export interface UserProfileApiDataSuccess {
  message: string;
  users: User[];
  token: string;
}

export interface ProfileDetailsApiDataSuccess {
  message: string;
  profile: Profile;
  token: string;
}

export interface AuthApiData {
  error?: { message: string };
  success?: AuthApiDataSuccess;
}

export interface UserProfileApiData {
  error?: { message: string };
  success?: UserProfileApiDataSuccess;
}

export interface ProfileDetailsApiData {
  error?: { message: string };
  success?: ProfileDetailsApiDataSuccess;
}
