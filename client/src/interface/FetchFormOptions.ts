export interface FetchFormOptions {
  method: string;
  headers?: {
    'Content-Type': string;
  };
  body: FormData;
  credentials?: RequestCredentials;
}
