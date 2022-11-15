import { Reducer } from 'react';
import { CartInitialStateType, PaymentType } from 'constants/cart';
import { CartActions } from 'interfaces/cart';

import { Product } from '../../interfaces/product';

import {
  addProductToCart,
  modifyQuantityOnProduct,
  removeProductFromCart,
} from './cartActions';

interface Payload {
  item?: Product;
  quantity?: number;
  paymentType?: PaymentType;
}
export type ActionType = { type: CartActions; payload: Payload };

const productReducer: Reducer<CartInitialStateType, ActionType> = (
  state,
  action,
) => {
  switch (action.type) {
    case CartActions.ADD_TO_CART:
      return {
        ...state,
        products: addProductToCart(state.products, action.payload.item!),
      };

    case CartActions.REMOVE_FROM_CART:
      return {
        ...state,
        products: removeProductFromCart(state.products, action.payload.item!),
      };

    case CartActions.MODIFY_QUANTITY:
      return {
        ...state,
        products: modifyQuantityOnProduct(
          state.products,
          action.payload.item!,
          action.payload.quantity,
        ),
      };

    case CartActions.CLEAR_CART:
      return {
        ...state,
        products: [],
      };

    case CartActions.CHANGE_PAYMENT_TYPE:
      return {
        ...state,
        paymentType: action.payload.paymentType!,
      };

    default:
      return state;
  }
};

export default productReducer;
