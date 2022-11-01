import { CartProduct } from 'constants/cart';
import { Product } from 'interfaces/product';

export function removeProductFromCart(
  cart: CartProduct[],
  productToDelete: Product
) {
  const filteredCart = cart.filter(
    (product) => product.product._id !== productToDelete._id
  );
  return filteredCart;
}

export function addProductToCart(cart: CartProduct[], productToAdd: Product) {
  const currentProductExist = cart.find(
    (product) => product.product._id === productToAdd._id
  );

  if (currentProductExist) {
    return cart;
  } else {
    return [...cart, { product: productToAdd, quantity: 1 }];
  }
}

export function modifyQuantityOnProduct(
  cart: CartProduct[],
  productToModify: Product,
  quantity?: number
) {
  if (!quantity) {
    return cart;
  }

  const product = cart.find(
    (product) => product.product._id === productToModify._id
  );

  if (product) {
    const INDEX = cart.indexOf(product);
    product.quantity = quantity
    cart[INDEX] = product;
    return cart;
  } else {
    return cart;
  }
}
