export interface Profile {
  _id: string;
  isDogSitter: boolean;
  firstName: string;
  lastName: string;
  availability: [
    {
      start: Date;
      end: Date;
    },
  ];
  email?: string;
  price: number;
  city: string;
  gallery: [string];
  profilePhoto?: string;
  coverPhoto?: string;
  description?: string;
  phoneNumber?: string;
  address?: string;
}

export interface OwnerFormProfile {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
  description?: string;
}
