import { createContext, Dispatch, useReducer } from 'react';
import {
  cartInitialState,
  CartInitialStateType,
} from 'constants/cart';
import CartReducer, { ActionType } from './CartReducer';

interface Props {
  children: React.ReactNode;
}

interface Store {
  state: CartInitialStateType;
  dispatch: Dispatch<ActionType>;
}

const contextStore: Store = {
  state: { ...cartInitialState },
  dispatch: () => {},
};

const CartContext = createContext<Store>(contextStore);

export function CartProvider({ children }: Props) {
  const [state, dispatch] = useReducer(CartReducer, cartInitialState);
  
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
