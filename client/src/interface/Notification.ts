export interface Notification {
  _id: string;
  user: string;
  types: string;
  read: boolean;
  description: string;
  thumbnail?: string;
  date: number;
}

export interface NotificationApiData {
  error?: { message: string };
  notifications?: Notification[];
}

export interface ReadNotificationApiData {
  error?: { message: string };
  message?: string;
}

// export interface SingleNotificationApiData {
//   error?: { message: string };
//   notification?: Notification;
// }
