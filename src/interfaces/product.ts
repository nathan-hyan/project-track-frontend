interface Variants {
  color: string;
  barCode: string;
  stock: number;
}

export interface Price {
  list: number;
  onlineStore: number;
  cash: number;
  cost: number;
  lastModified: Date | null;
}

interface Dimensions {
  height: number;
  width: number;
  depth: number;
}

export interface Product {
  _id?: string;
  name: string;
  stock: number;
  barcode: string;
  category: string;
  providerProductCode: {
    id: number;
    name: string;
  }[];
  brand: string;
  businessOwner: string;
  dimensions: Dimensions;
  weight: number;
  storeBranch: string;
  storeId: string;
  storePosition: string;
  description: string;
  specifications: {
    title: string;
    description: string;
  }[];
  variants: Variants[];
  price: Price;
  internalId: number;
  image: string;
}

export enum ProductActions {
  'SET_LOADING',
  'CLEAR_LOADING',
  'GET_ALL',
  'FILTER',
  'CLEAR_FILTER',
  'FILTER_WRITE',
  'FILTER_CHANGE_TYPE',
  'OPEN_EDIT',
  'CLOSE_EDIT',
}

export type Action = { type: ProductActions; payload?: any };
