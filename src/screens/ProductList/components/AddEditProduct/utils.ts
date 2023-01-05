import { Price } from 'interfaces/product';

export const priceComparator = (oldPrice: Price, newPrice: Price) => {
  const {
    cash: oldCash, cost: oldCost, list: oldList, onlineStore: oldOnlineStore,
  } = oldPrice;

  const {
    cash, cost, list, onlineStore,
  } = newPrice;

  const isDifferent = oldCash !== cash
        || cost !== oldCost
        || list !== oldList
      || onlineStore !== oldOnlineStore;

  return isDifferent;
};
