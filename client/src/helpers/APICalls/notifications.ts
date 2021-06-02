import { Notification } from '../../interface/Notification';
import { FetchOptions } from '../../interface/FetchOptions';

export const getUnreadNotifications = async (): Promise<Notification[]> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/notifiction/unread`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};
