import { Product } from 'interfaces/product';

export interface ProductInitialStateType {
  searchQuery?: string;
  fullProductList?: Product[];
  products?: Product[];
  product?: Product;
  loading?: boolean;
}

export const productInitialState: ProductInitialStateType = {
  searchQuery: '',
  fullProductList: [],
  products: [],
  product: {
    _id: '',
    name: '',
    internalId: 0,
    price: 0,
    cost: 0,
    stock: 0,
    category: '',
    image: '',
    barcode: '',
    storeBranch: '',
    storeId: '',
  },
  loading: true,
};
