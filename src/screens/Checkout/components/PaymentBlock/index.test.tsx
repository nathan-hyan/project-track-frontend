import { render, screen } from '@testing-library/react';
import { PAYMENT_TYPES } from 'screens/Checkout/constants';

import PaymentBlock from '.';

describe('<PaymentBlock />', () => {
  it('renders correctly', () => {
    render(<PaymentBlock />);
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes).toHaveLength(PAYMENT_TYPES.length);
  });
});
