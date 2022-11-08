import { CartProductForBackend, Payment, Purchase } from 'constants/cart';
import api from '../config/api';

const BASE_URL = '/sells';

export interface CreatePurchaseResponse {
  success: boolean;
  data: Data;
}

export interface Data {
  amount: Payment;
  _id: string;
  products: CartProductForBackend[];
  storeId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export const createPurchase = (purchase: Purchase) =>
  api.post<Purchase, CreatePurchaseResponse>(`${BASE_URL}/create`, purchase);
