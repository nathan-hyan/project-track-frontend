import {
  createContext, Dispatch, ReactNode, useContext, useMemo, useReducer,
} from 'react';
import {
  cartInitialState,
  CartInitialStateType,
} from 'constants/cart';

import CartReducer, { ActionType } from './CartReducer';

interface Props {
  children: ReactNode;
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

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);

  if (!ctx) {
    throw new Error('Out of context');
  }
  return ctx;
};

export default CartContext;
