import {
  createContext, Dispatch, ReactNode, useMemo, useReducer,
} from 'react';
import {
  productInitialState,
  ProductInitialStateType,
} from 'constants/products';

import ProductReducer, { ActionType } from './UsersReducer';

interface Props {
  children: ReactNode;
}

interface Store {
  state: ProductInitialStateType;
  dispatch: Dispatch<ActionType>;
}

const contextStore: Store = {
  state: { ...productInitialState },
  dispatch: () => {},
};

const ProductContext = createContext<Store>(contextStore);

export function ProductProvider({ children }: Props) {
  const [state, dispatch] = useReducer(ProductReducer, productInitialState);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
}

export default ProductContext;
