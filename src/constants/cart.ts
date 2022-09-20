import { Product } from 'interfaces/product';

export type CartProduct = { product: Product; quantity: number }

export interface CartInitialStateType {
  cart: CartProduct[];
}

export const cartInitialState: CartInitialStateType = {
  cart: [],
};
