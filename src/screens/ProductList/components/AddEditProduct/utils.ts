import { Price } from 'interfaces/product';

export const priceComparator = (oldPrice: Price, newPrice: Price) => {
  const { cost: oldCost } = oldPrice;

  const { cost } = newPrice;

  const isDifferent = cost !== oldCost;

  return isDifferent;
};
