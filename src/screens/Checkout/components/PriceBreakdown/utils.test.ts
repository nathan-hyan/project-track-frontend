import { calculateTotalAmount } from './utils';

describe('PriceBreakdown Utils', () => {
  it('wont break on initialization without props', () => {
    const amount = calculateTotalAmount();

    expect(amount).toBe(0);
  });

  it('add up cost', () => {
    const amount = calculateTotalAmount(0, 0, 1, 1, 1);

    expect(amount).toBe(3);
  });

  it('add up discounts', () => {
    const amount = calculateTotalAmount(1, 1, 0, 0, 0);

    expect(amount).toBe(-2);
  });

  it('calculates everything', () => {
    const amount = calculateTotalAmount(2, 2, 2, 2, 2);

    expect(amount).toBe(2);
  });
});
