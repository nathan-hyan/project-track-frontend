import { Product } from 'interfaces/product';

export const DEFAULT_STORE_BRANCH = '6053adb8a6b58a6e35dd4655';
export const DEFAULT_USER_ID = '61f9952d5fb548440aeec01a';
export interface CartProduct {
  item: Product;
  quantity: number;
}

export interface CartProductForBackend {
  item: string;
  quantity: number;
}

export enum PaymentType {
  List = 'list',
  Cash = 'cash',
}

export interface Payment {
  subtotal: number;
  positiveBalance: number;
  negativeBalance: number;
  delivery: number;
  discount: number;
}

export interface CartInitialStateType {
  products: CartProduct[];
  paymentType: PaymentType;
}

export const cartInitialState: CartInitialStateType = {
  products: [],
  paymentType: PaymentType.List,
};

export interface Purchase {
  products: CartProductForBackend[];
  amount: Payment;
  storeId: string;
  userId: string;
  paymentType: PaymentType;
}
