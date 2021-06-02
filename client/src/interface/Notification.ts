export interface Notification {
  _id: string;
  user: string;
  types: string;
  read: boolean;
  title?: string;
  description: string;
  thumbnail?: string;
  date: number;
}

export interface NotificationApiData {
  error?: { message: string };
  notifications?: Notification[];
}
