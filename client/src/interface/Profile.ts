export interface Profile {
  _id: string;
  isDogSitter: boolean;
  isAvailable: boolean;
  firstName: string;
  lastName: string;
  availability: string[];
  price: number;
  city: string;
  gallery: [string];
  profilePhoto?: string;
  coverPhoto?: string;
  description?: string;
  phoneNumber?: Number;
  address?: String;
}
