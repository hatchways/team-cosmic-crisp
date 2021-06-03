import { NotificationApiData } from '../../interface/Notification';
import { FetchOptions } from '../../interface/FetchOptions';

export const getUnreadNotifications = async (): Promise<NotificationApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/notification/unread`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export const setReadNotifications = async (): Promise<NotificationApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    credentials: 'include',
  };
  try {
    await fetch(`/notification/unread`, fetchOptions);
  } catch (error) {
    console.log('error trying to update notification', error);
  }
  return getUnreadNotifications();
};
