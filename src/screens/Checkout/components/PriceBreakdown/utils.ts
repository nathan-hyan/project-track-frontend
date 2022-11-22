export const calculateTotalAmount = (
  positiveBalance = 0,
  discount = 0,
  subtotal = 0,
  negativeBalance = 0,
  delivery = 0,
) => {
  const totalDiscounts = positiveBalance + discount;
  const addedAmount = subtotal + negativeBalance + delivery;

  return addedAmount - totalDiscounts;
};
