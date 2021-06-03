export interface Review {
  _id: string;
  rating: number;
  message?: string;
  creator: {
    firstName: string;
    lastName: string;
    profilePhoto?: string;
  };
  createdAt: Date;
}

export interface ReviewForm {
  rating: number | null;
  message?: string;
}
