export interface UploadApiDataSuccess {
  message: string;
  urlArray: string[];
}

export interface UploadApiData {
  error?: { message: string };
  success?: UploadApiDataSuccess;
}

interface DeletedData {
  Key: string;
}
interface DeleteObj {
  Deleted: DeletedData[];
}

export interface DeletePhotoApiDataSuccess {
  message: string;
  Data: DeleteObj;
}

export interface DeletePhotoApiData {
  error?: { message: string };
  success?: UploadApiDataSuccess;
}
