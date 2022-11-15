export type Nullable<T> = null | T;

export interface CustomError {
  code: number;
  message: string;
}

export enum ButtonTypes {
  Button = 'button',
  Submit = 'submit',
  Reset = 'reset',
}
