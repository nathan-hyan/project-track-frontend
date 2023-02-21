import { render } from '@testing-library/react';
import { PaymentType } from 'constants/cart';
import { testCartProductArraySingleQuantity } from 'constants/testMocks';

import { ticketToPrint } from '.';

describe('<Ticket />', () => {
  it('renders correctly', () => {
    expect(
      render(ticketToPrint(testCartProductArraySingleQuantity, PaymentType.Cash)).asFragment(),
    ).toMatchSnapshot();
  });
});
