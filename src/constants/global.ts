export type Nullable<T> = null | T;

export interface CustomError {
  code: number;
  message: string;
}
