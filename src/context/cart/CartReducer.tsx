import { Reducer } from 'react';
import { CartProduct } from 'interfaces/cart';
import { CartActions } from 'interfaces/cart';
import { CartInitialStateType } from 'constants/cart';
import { addProductToCart, modifyQuantityToProduct } from './CartActions';
import { Product } from 'interfaces/product';
import { emptyProduct } from 'constants/products';

interface Payload {
  id?: string;
  product?: CartProduct;
  productToAdd?: Product;
  quantity?: number
}
export type ActionType = { type: CartActions; payload?: Payload };

const cartReducer: Reducer<CartInitialStateType, ActionType> = (
  state,
  action
) => {
  switch (action.type) {
    case CartActions.ADD_PRODUCT:
    console.count('called dispatch!')  
    return {
        ...state,
        products: addProductToCart(action.payload?.productToAdd || emptyProduct, state.products),
      };

    case CartActions.DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          (product) => product.productId !== action.payload?.id
        ),
      };

    case CartActions.MODIFY_QUANTITY:
      return {
        ...state,
        products: modifyQuantityToProduct(state.products, action.payload?.id || '', action.payload?.quantity || 1)
      }

      case CartActions.CLEAR_CART:
        return {products: []}

    default:
      return state;
  }
};

export default cartReducer;
