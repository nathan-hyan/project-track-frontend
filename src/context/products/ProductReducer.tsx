import { ProductInitialStateType } from 'constants/products';
import { Reducer } from 'react';
import { Product, ProductActions } from '../../interfaces/product';
import { filterProducts } from './ProductActions';

interface Payload {
  productData?: Product[];
  searchQuery?: string;
}
type ActionType = { type: ProductActions; payload?: Payload };

const productReducer: Reducer<ProductInitialStateType, ActionType> = (
  state,
  action
) => {
  switch (action.type) {
    case ProductActions.GET_ALL:
      return {
        ...state,
        fullProductList: action.payload!.productData,
        products: action.payload!.productData,
        loading: false,
      };

    case ProductActions.FILTER:
      return {
        ...state,
        products: filterProducts(state.fullProductList!, state.searchQuery!),
      };

    case ProductActions.FILTER_WRITE:
      return { ...state, searchQuery: action.payload?.searchQuery! };

    case ProductActions.CLEAR_FILTER:
      return {
        ...state,
        products: state.fullProductList,
        searchQuery: '',
      };

    default:
      return state;
  }
};

export default productReducer;
