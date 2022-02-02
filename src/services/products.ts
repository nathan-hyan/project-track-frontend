import api from '../config/api';
import { Product } from '../interfaces/product';

const BASE_URL = '/products';

interface ProductsResponse {
  success: boolean;
  response: Product[];
}

interface SingleProductsResponse {
  success: boolean;
  response: Product;
}

export const getProducts = () => api.get<ProductsResponse>(`${BASE_URL}/get`);

export const getSingleProduct = (id: string) =>
  api.get<SingleProductsResponse>(`${BASE_URL}/get/${id}`);
