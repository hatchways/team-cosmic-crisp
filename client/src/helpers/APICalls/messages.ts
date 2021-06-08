import { FetchOptions } from '../../interface/FetchOptions';
import {
  CreateConversationAPIDataSuccess,
  GetConversationAPIDataSuccess,
  PostMessageAPIDataSuccess,
  GetMessagesAPIDataSuccess,
} from '../../interface/Messages';

export const createConversation = async (
  senderId: string,
  receiverId: string,
): Promise<CreateConversationAPIDataSuccess> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ senderId, receiverId }),
    credentials: 'include',
  };
  return await fetch(`/conversations`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export const getConversations = async (): Promise<GetConversationAPIDataSuccess> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  return await fetch(`/conversations`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export const sendMessage = async (conversationId: string, content: string): Promise<PostMessageAPIDataSuccess> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ conversationId, content }),
    credentials: 'include',
  };
  return await fetch(`/messages`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export const getMessages = async (conversationId: string): Promise<GetMessagesAPIDataSuccess> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  return await fetch(`/messages/${conversationId}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export const setMessageSeen = async (conversationId: string): Promise<GetMessagesAPIDataSuccess> => {
  const fetchOptions: FetchOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ conversationId }),
  };
  return await fetch(`/messages/${conversationId}`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};
