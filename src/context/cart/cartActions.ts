import { CartProduct } from 'constants/cart';
import { Product } from 'interfaces/product';

export function removeProductFromCart(
  cart: CartProduct[],
  productToDelete: Product,
): CartProduct[] {
  const filteredCart = cart.filter(
    (product) => product.item._id !== productToDelete._id,
  );
  return filteredCart;
}

export function addProductToCart(
  cart: CartProduct[],
  productToAdd: Product,
): CartProduct[] {
  const currentProductExist = cart.find(
    (product) => product.item._id === productToAdd._id,
  );

  if (currentProductExist) {
    return cart;
  }
  const cartProduct: CartProduct = { item: productToAdd, quantity: 1 };
  return [...cart, cartProduct];
}

export function modifyQuantityOnProduct(
  cart: CartProduct[],
  productToModify: Product,
  quantity?: number,
): CartProduct[] {
  const newCart = cart;

  if (!quantity) {
    return newCart;
  }

  const product = newCart.find(
    (currentProduct) => currentProduct.item._id === productToModify._id,
  );

  if (product) {
    const INDEX = newCart.indexOf(product);
    product.quantity = quantity;
    newCart[INDEX] = product;
    return newCart;
  }
  return newCart;
}
