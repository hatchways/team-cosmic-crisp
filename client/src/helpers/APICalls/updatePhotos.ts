import { UploadApiData, DeletePhotoApiData } from '../../interface/PhotoApiData';
import { FetchPhotoOptions, FetchFormOptions } from '../../interface/FetchOptions';
import { baseURL } from '../api';

export async function uploadPhoto(formData: FormData): Promise<UploadApiData> {
  const fetchOptions: FetchFormOptions = {
    method: 'POST',
    body: formData,
  };
  return await fetch(`${baseURL}/api/photo`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}

export async function deletePhotos(urls: string[]): Promise<DeletePhotoApiData> {
  const fetchOptions: FetchPhotoOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ urls: urls }),
  };
  return await fetch(`${baseURL}/api/photo`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}
