export interface FetchOptions {
  method: string;
  headers?: {
    'Content-Type': string;
  };
  body?: string;
  credentials: RequestCredentials;
}

export interface FetchFormOptions {
  method: string;
  headers?: {
    'Content-Type': string;
  };
  body: FormData;
  credentials?: RequestCredentials;
}

export interface FetchPhotoOptions {
  method: string;
  headers?: {
    'Content-Type': string;
  };
  body?: string;
  credentials?: RequestCredentials;
}
