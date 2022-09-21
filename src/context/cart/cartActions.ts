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
    const INDEX = cart.indexOf(currentProductExist);
    ++currentProductExist.quantity;
    cart[INDEX] = {
      product: currentProductExist.product,
      quantity: currentProductExist.quantity,
    };
    return cart;
  } else {
    return [...cart, { product: productToAdd, quantity: 1 }];
  }
}

export function subtractFromItemInCart(
  cart: CartProduct[],
  productToSubtract: Product
) {
  const product = cart.find(
    (product) => product.product._id === productToSubtract._id
  );

  if (product) {
    const INDEX = cart.indexOf(product);
    cart[INDEX] = {
      product: cart[INDEX].product,
      quantity: cart[INDEX].quantity - 1,
    };

    return cart;
  } else {
    return cart;
  }
}
