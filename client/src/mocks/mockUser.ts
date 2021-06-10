import { User } from '../interface/User';

const mockLoggedInUser: User = {
  _id: '1a',
  email: 'mockLoggedInUser@gmail.com',
  profile: '123a',
};

const mockOtherUser1: User = {
  _id: '1b',
  email: 'mockTestUser1@gmail.com',
  profile: '123b',
};
const mockOtherUser2: User = {
  _id: '1c',
  email: 'mockTestUser2@gmail.com',
  profile: '123c',
};
const mockOtherUser3: User = {
  _id: '1d',
  email: 'mockTestUser3@gmail.com',
  profile: '123d',
};

const mockOtherUsers: User[] = [mockOtherUser1, mockOtherUser2, mockOtherUser3];

export { mockLoggedInUser, mockOtherUsers };
