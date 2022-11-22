import { fireEvent, render, screen } from '@testing-library/react';
import { PaymentType } from 'constants/cart';
import { INPUTS } from 'screens/Checkout/constants';

import PriceBreakdown from '.';

describe('<PriceBreakdown />', () => {
  it('renders correctly even without props', () => {
    render(<PriceBreakdown />);

    const inputs = screen.getAllByDisplayValue(0);
    expect(inputs).toHaveLength(Object.values(INPUTS).length);
  });

  it('renders correctly', () => {
    render(<PriceBreakdown
      subtotal={0}
      negativeBalance={0}
      paymentType={PaymentType.Cash}
      positiveBalance={0}
    />);

    const delivery = screen.getByLabelText(INPUTS.delivery);
    const discount = screen.getByLabelText(INPUTS.discount);

    fireEvent.change(delivery, { target: { value: 3 } });
    fireEvent.change(discount, { target: { value: 4 } });

    expect(delivery).toHaveValue(3);
    expect(discount).toHaveValue(4);
  });

  it('displays total value correctly', () => {
    render(<PriceBreakdown
      subtotal={1}
      negativeBalance={1}
      paymentType={PaymentType.Cash}
      positiveBalance={1}
    />);

    const delivery = screen.getByLabelText(INPUTS.delivery);
    const discount = screen.getByLabelText(INPUTS.discount);
    const totalAmount = screen.getByLabelText(INPUTS.totalAmount);

    fireEvent.change(delivery, { target: { value: 1 } });
    fireEvent.change(discount, { target: { value: 1 } });

    expect(totalAmount).toHaveValue(1);
  });

  it('displays the payment type correctly', () => {
    render(<PriceBreakdown
      subtotal={1}
      negativeBalance={1}
      paymentType={PaymentType.Cash}
      positiveBalance={1}
    />);

    const delivery = screen.getByLabelText(`${INPUTS.subtotal} (Precio ${PaymentType.Cash})`);

    expect(delivery).toBeInTheDocument();
  });
});
