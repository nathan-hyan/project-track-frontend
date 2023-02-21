import { PaymentType } from 'constants/cart';
import { testCartProductArrayMultiQuantity, testCartProductArraySingleQuantity } from 'constants/testMocks';

import { getTotalPrice } from './priceUtils';

describe('Price Utils', () => {
  it('Works as expected', () => {
    const result = getTotalPrice(testCartProductArraySingleQuantity, PaymentType.List);
    const expectedResult = testCartProductArraySingleQuantity[0].item.price[PaymentType.List]
        + testCartProductArraySingleQuantity[1].item.price[PaymentType.List]
        + testCartProductArraySingleQuantity[2].item.price[PaymentType.List]
        + testCartProductArraySingleQuantity[3].item.price[PaymentType.List];

    expect(result).toBe(expectedResult);
  });

  it('Works as expected with more than 1 product', () => {
    const result = getTotalPrice(testCartProductArrayMultiQuantity, PaymentType.List);
    const expectedResult = (testCartProductArrayMultiQuantity[0].item.price[PaymentType.List]
          * testCartProductArrayMultiQuantity[0].quantity)
            + (testCartProductArrayMultiQuantity[1].item.price[PaymentType.List]
            * testCartProductArrayMultiQuantity[1].quantity)
            + (testCartProductArrayMultiQuantity[2].item.price[PaymentType.List]
            * testCartProductArrayMultiQuantity[2].quantity)
            + (testCartProductArrayMultiQuantity[3].item.price[PaymentType.List]
            * testCartProductArrayMultiQuantity[3].quantity);

    expect(result).toBe(expectedResult);
  });
});
