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

interface ProductCreateResponse {
  success: boolean;
  message: string;
}

export const getProducts = (sort: string) => api.get<ProductsResponse>(`${BASE_URL}/get?sort=${sort}`);

export const getSingleProduct = (id: string) => api.get<SingleProductsResponse>(`${BASE_URL}/get/${id}`);

export const createProduct = (product: Product) => api.post<Product, ProductCreateResponse>(`${BASE_URL}/create`, {
  ...product,
  image: '',
  storeId: '6053adb8a6b58a6e35dd4655',
  storeBranch: 'Av Belgrano 2848',
});

export const editProduct = (product: Product) => api.put<Product, ProductCreateResponse>(`${BASE_URL}/edit/${product._id}`, {
  ...product,
  image: '',
  storeId: '6053adb8a6b58a6e35dd4655',
  storeBranch: 'Av Belgrano 2848',
});

export const deleteProduct = (id: string) => api.delete(`${BASE_URL}/delete/${id}`);
