import { Review } from './Review';

export interface ReviewsApiDataSuccess {
  message: string;
  review: Review;
}

export interface ReviewsApiData {
  error?: { message: string };
  success?: ReviewsApiDataSuccess;
}
