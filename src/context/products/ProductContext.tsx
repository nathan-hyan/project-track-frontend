import { createContext, Dispatch, useReducer } from 'react';
import {
  productInitialState,
  ProductInitialStateType,
} from 'constants/products';
import ProductReducer from './ProductReducer';

interface Props {
  children: React.ReactNode;
}

interface Store {
  state: ProductInitialStateType;
  dispatch: Dispatch<any>;
}

const contextStore: Store = {
  state: { ...productInitialState },
  dispatch: () => {},
};

const ProductContext = createContext<Store>(contextStore);

export function ProductProvider({ children }: Props) {
  const [state, dispatch] = useReducer(ProductReducer, productInitialState);

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
}

export default ProductContext;
