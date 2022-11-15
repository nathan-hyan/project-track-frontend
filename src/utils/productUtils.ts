import { CartProduct } from 'constants/cart';

export const checkForStock = (products: CartProduct[]) => {
  let stock = true;

  products.forEach((product) => {
    if (product.item.stock >= product.quantity) {
      return;
    } else {
      stock = false;
    }
  });

  return stock;
};
