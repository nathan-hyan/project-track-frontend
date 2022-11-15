import { CartProduct } from 'constants/cart';
import { Product } from 'interfaces/product';

export function removeProductFromCart(
  cart: CartProduct[],
  productToDelete: Product
): CartProduct[] {
  const filteredCart = cart.filter(
    (product) => product.item._id !== productToDelete._id
  );
  return filteredCart;
}

export function addProductToCart(
  cart: CartProduct[],
  productToAdd: Product
): CartProduct[] {
  const currentProductExist = cart.find(
    (product) => product.item._id === productToAdd._id
  );

  if (currentProductExist) {
    return cart;
  } else {
    const cartProduct: CartProduct = { item: productToAdd, quantity: 1 };
    return [...cart, cartProduct];
  }
}

export function modifyQuantityOnProduct(
  cart: CartProduct[],
  productToModify: Product,
  quantity?: number
): CartProduct[] {
  if (!quantity) {
    return cart;
  }

  const product = cart.find(
    (product) => product.item._id === productToModify._id
  );

  if (product) {
    const INDEX = cart.indexOf(product);
    product.quantity = quantity;
    cart[INDEX] = product;
    return cart;
  } else {
    return cart;
  }
}
