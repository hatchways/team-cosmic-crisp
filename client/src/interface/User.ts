import { Profile } from './Profile';

export interface User {
  _id: string;
  email: string;
  profile?: Profile;
}

export interface SearchUsersApiData {
  users?: User[];
  error?: { message: string };
}
