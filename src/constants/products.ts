import { Product } from 'interfaces/product';
import { SearchType } from 'screens/ProductList/components/AddEditProduct/constants';

export type SortTypes = 'name' | 'lastModified'
export interface ProductInitialStateType {
  searchQuery?: string;
  searchType?: SearchType;
  fullProductList?: Product[];
  products?: Product[];
  error?: string | null;
  product: Product | null;
  loading?: boolean;
  sort?: SortTypes;
}

export const productInitialState: ProductInitialStateType = {
  searchQuery: '',
  searchType: SearchType.PRODUCT_ID,
  fullProductList: [],
  products: [],
  product: null,
  loading: true,
  error: null,
  sort: 'name',
};

export const emptyProduct: Product = {
  name: '',
  internalId: 0,
  price: {
    cash: 0,
    cost: 0,
    list: 0,
    onlineStore: 0,
    lastModified: null,
  },
  stock: 0,
  category: '',
  image: '',
  barcode: '',
  storeBranch: '',
  storeId: '',
  brand: '',
  businessOwner: '',
  description: '',
  dimensions: {
    depth: 0,
    height: 0,
    width: 0,
  },
  providerProductCode: [],
  specifications: [],
  storePosition: '',
  variants: [],
  weight: 0,
};
