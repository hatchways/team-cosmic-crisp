import { Review } from '../interface/Review';

const mockReview: Review = {
  _id: '1rev',
  rating: 5,
  creator: {
    firstName: 'Camper',
    lastName: 'Cat',
  },
  createdAt: new Date(),
};

export const mockReviews: Review[] = [mockReview];
