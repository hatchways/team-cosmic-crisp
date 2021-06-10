import { Notification } from '../interface/Notification';

export const mockNotification: Notification[] = [
  {
    _id: '1aefaefaefjifaj;eof',
    user: '2324234223423',
    types: 'system',
    read: false,
    description: 'You have successfully made a payment',
    date: Date.now(),
  },
  {
    _id: '1aefaefaefjifasefefj;eof',
    user: '23242342234223423',
    types: 'message',
    read: false,
    description: 'You have received a new message from User Walter White',
    date: Date.now(),
  },
];
