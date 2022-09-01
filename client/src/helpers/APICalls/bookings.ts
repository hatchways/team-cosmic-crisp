import { RequestAPIData } from '../../interface/Bookings';
import { FetchOptions } from '../../interface/FetchOptions';
import { baseURL } from '../api';

export const getRequests = async (): Promise<RequestAPIData> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  return await fetch(`${baseURL}/requests`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export const postRequest = async (sitter: string, start: Date, end: Date): Promise<RequestAPIData> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      sitter,
      start,
      end,
    }),
  };
  return await fetch(`${baseURL}/requests`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export const acceptRequest = async (request: string): Promise<RequestAPIData> => {
  const fetchOptions: FetchOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      request,
      accepted: true,
      declined: false,
    }),
  };
  return await fetch(`${baseURL}/requests/${request}/accept`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export const declineRequest = async (request: string): Promise<RequestAPIData> => {
  const fetchOptions: FetchOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      request,
      accepted: false,
      declined: true,
    }),
  };
  return await fetch(`${baseURL}/requests/${request}/accept`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};
