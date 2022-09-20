import { CartInitialStateType } from 'constants/cart';
import { CartActions } from 'interfaces/cart';
import { Reducer } from 'react';
import { Product } from '../../interfaces/product';
import { addProductToCart, removeProductFromCart } from './cartActions';

interface Payload {
    item: Product;
}
export type ActionType = { type: CartActions; payload: Payload };

const productReducer: Reducer<CartInitialStateType, ActionType> = (
  state,
  action
) => {
  switch (action.type) {
    case CartActions.ADD_TO_CART:
      return {...state, cart: addProductToCart(state.cart, action.payload.item)}

    case CartActions.REMOVE_FROM_CART:
      return {
        ...state,
        cart: removeProductFromCart(state.cart, action.payload.item)
      }

    default:
      return state;
  }
};

export default productReducer;
