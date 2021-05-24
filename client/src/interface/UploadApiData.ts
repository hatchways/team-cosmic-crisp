export interface UploadApiDataSuccess {
  message: string;
  urlArray: string[];
}

export interface UploadApiData {
  error?: { message: string };
  success?: UploadApiDataSuccess;
}
