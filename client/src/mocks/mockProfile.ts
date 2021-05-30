import { Profile } from '../interface/Profile';

export const mockProfile: Profile = {
  _id: '1abc',
  isDogSitter: true,
  firstName: 'Bob',
  lastName: 'Cat',
  availability: ['mon', 'tues'],
  isAvailable: true,
  email: 'bob@gmail.com',
  price: 20,
  city: 'New York',
  gallery: [''],
};

export const mockProfiles: Profile[] = [mockProfile];
