import { CartProduct } from 'interfaces/cart';

export interface CartInitialStateType {
  products: CartProduct[]
}

export const cartInitialState: CartInitialStateType = {
  products: [],
};

export const emptyCart: CartProduct = {
  productId: "",
  productName: "",
  pricePerUnit: 0,
  quantity: 0,
  totalPrice: 0
};
