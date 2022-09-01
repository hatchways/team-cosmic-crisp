import { ReviewsApiData } from '../../interface/ReviewApiData';
import { FetchOptions } from '../../interface/FetchOptions';
import { ReviewForm } from '../../interface/Review';
import { baseURL } from '../api';

export const createReview = async (id: string, review: ReviewForm): Promise<ReviewsApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(review),
    credentials: 'include',
  };
  return await fetch(`${baseURL}/reviews/${id}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};
