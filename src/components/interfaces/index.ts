export interface IUser {
  name: string;
  phone: string;
  email: string;
  password: string;
  date: string;
  comment: string;
}

export interface IResponseData {
  name: string;
  phone: string;
  email: string;
  password: string;
  date: string;
  comment: string;
  id: number;
}

export enum TypeLoadingStatus {
  'IS_PENDING' = 'IS_PENDING',
  'IS_RESOLVE' = 'IS_RESOLVE',
  'IS_REJECTED' = 'IS_REJECTED',
}

