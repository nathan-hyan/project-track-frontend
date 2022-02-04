export interface Product {
  _id?: string;
  name: string;
  internalId: number;
  price: number;
  cost: number;
  stock: number;
  category: string;
  image: string;
  barcode: string;
  storeBranch: string;
  storeId: string;
}

export enum ProductActions {
  'SET_LOADING',
  'CLEAR_LOADING',
  'GET_ALL',
  'FILTER',
  'CLEAR_FILTER',
  'FILTER_WRITE',
  'OPEN_EDIT',
  'CLOSE_EDIT',
}

export type Action = { type: ProductActions; payload?: any };
