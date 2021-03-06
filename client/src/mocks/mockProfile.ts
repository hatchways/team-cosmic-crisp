import { Profile } from '../interface/Profile';
import { Filter } from '../interface/Profile';

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
  reviews: [
    {
      _id: '123a',
      createdAt: new Date(),
      rating: 5,
      creator: {
        firstName: 'Bob',
        lastName: 'Builder',
      },
    },
  ],
};

export const mockProfiles: Profile[] = [mockProfile];

export const mockFilter: Filter = {
  city: 'Vancouver',
  startDate: new Date(),
  endDate: new Date(),
};
