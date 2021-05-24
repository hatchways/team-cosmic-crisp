import { UploadApiData } from '../../interface/UploadApiData';
import { FetchFormOptions } from '../../interface/FetchFormOptions';

export async function uploadPhoto(formData: FormData): Promise<UploadApiData> {
  const fetchOptions: FetchFormOptions = {
    method: 'POST',
    body: formData,
  };
  return await fetch(`http://localhost:3001/api/upload`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}
