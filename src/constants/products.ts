import { Product } from 'interfaces/product';
import { SearchType } from 'screens/ProductList/components/constants';

export interface ProductInitialStateType {
  searchQuery?: string;
  searchType?: SearchType,
  fullProductList?: Product[];
  products?: Product[];
  product: Product | null;
  loading?: boolean;
}

export const productInitialState: ProductInitialStateType = {
  searchQuery: '',
  searchType: SearchType.PRODUCT_ID,
  fullProductList: [],
  products: [],
  product: null,
  loading: true,
};

export const emptyProduct: Product = {
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
};
