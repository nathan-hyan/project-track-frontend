export interface CartProduct {
    productId: string;
    productName: string;
    quantity: number;
    pricePerUnit: number;
    totalPrice: number;
}

export enum CartActions {
  'ADD_PRODUCT',
  'DELETE_PRODUCT',
  'MODIFY_QUANTITY',
  'CLEAR_CART'
}
