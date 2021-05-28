export interface User {
  _id: string;
  email: string;
  profile: string;
}

export interface SearchUsersApiData {
  users?: User[];
  error?: { message: string };
}
