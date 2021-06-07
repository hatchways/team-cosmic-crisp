export interface Profile {
  _id: string;
  isDogSitter: boolean;
  isAvailable: boolean;
  firstName: string;
  lastName: string;
  availability: string[];
  email?: string;
  price: number;
  city: string;
  gallery: [string];
  profilePhoto?: string;
  coverPhoto?: string;
  description?: string;
  phoneNumber?: string;
  address?: string;
  rating?: number;
}

export interface OwnerFormProfile {
  isDogSitter?: boolean;
  firstName?: string;
  lastName?: string;
  email?: string;
  city?: string;
  price?: number;
  phoneNumber?: string;
  address?: string;
  description?: string;
  profilePhoto?: string;
  availability?: string[];
  isAvailable?: boolean;
}
