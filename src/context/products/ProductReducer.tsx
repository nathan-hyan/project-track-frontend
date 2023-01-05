import { Reducer } from 'react';
import { ProductInitialStateType } from 'constants/products';
import { SearchType } from 'screens/ProductList/components/AddEditProduct/constants';

import { Product, ProductActions } from '../../interfaces/product';

import { filterProducts } from './ProductActions';

interface Payload {
  productData?: Product[];
  productToEdit?: Product;
  searchQuery?: string;
  searchType?: SearchType;
  error?: string;
}
export type ActionType = { type: ProductActions; payload?: Payload };

const productReducer: Reducer<ProductInitialStateType, ActionType> = (
  state,
  action,
) => {
  switch (action.type) {
    case ProductActions.SET_LOADING:
      return {
        ...state,
        loading: true,
      };

    case ProductActions.CLEAR_LOADING:
      return {
        ...state,
        loading: false,
      };

    case ProductActions.SET_ERROR:
      return {
        ...state,
        products: [],
        product: null,
        loading: false,
        error: action.payload!.error,
      };

    case ProductActions.GET_ALL:
      return {
        ...state,
        fullProductList: action.payload!.productData,
        products: action.payload!.productData,
        loading: false,
        error: null,
      };

    case ProductActions.FILTER:
      return {
        ...state,
        products: filterProducts(state.fullProductList!, state.searchQuery!, state.searchType!),
      };

    case ProductActions.FILTER_WRITE:
      return { ...state, searchQuery: action.payload?.searchQuery! };

    case ProductActions.FILTER_CHANGE_TYPE:
      return { ...state, searchType: action.payload?.searchType! };

    case ProductActions.CLEAR_FILTER:
      return {
        ...state,
        products: state.fullProductList,
        searchQuery: '',
        searchType: SearchType.PRODUCT_ID,
      };
    case ProductActions.OPEN_EDIT:
      return {
        ...state,
        product: action.payload?.productToEdit!,
      };

    case ProductActions.CLOSE_EDIT:
      return {
        ...state,
        product: null,
      };

    default:
      return state;
  }
};

export default productReducer;
