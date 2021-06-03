import { Review } from './Review';

export interface ReviewsApiDataSuccess {
  message: string;
  reviews?: Review[];
  review?: Review;
}

export interface ReviewsApiData {
  error?: { message: string };
  success?: ReviewsApiDataSuccess;
}
