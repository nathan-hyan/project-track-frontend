import { CartProduct, PaymentType } from 'constants/cart';

export const getTotalPrice = (
  cartList: CartProduct[],
  paymentType: PaymentType,
) => {
  let totalPrice = 0;

  cartList.forEach(
    (itemOnCart) => {
      totalPrice
        += (itemOnCart.item.price[paymentType] || 0) * itemOnCart.quantity;
    },
  );

  return totalPrice;
};
