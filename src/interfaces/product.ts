export interface Product {
  _id: string;
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
  'CREATE',
  'EDIT',
  'DELETE',
  'GET_ALL',
  'GET_SINGLE',
  'FILTER',
  'CLEAR_FILTER',
  'FILTER_WRITE',
}

export type Action = { type: ProductActions; payload?: any };
