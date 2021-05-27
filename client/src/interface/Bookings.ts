import { User } from './User';

export interface Request {
  _id: string;
  user?: User;
  sitter?: User;
  start: Date;
  end: Date;
  accepted: boolean;
  declined: boolean;
  paid: boolean;
}
