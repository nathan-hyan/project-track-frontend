import { render } from '@testing-library/react';
import { PaymentType } from 'constants/cart';
import { emptyProduct } from 'constants/products';

import '@testing-library/jest-dom';

import CartList from './index';

const mockFunction = jest.fn();

// TODO: Finish this, im starting with something more simple

describe('<CartList />', () => {
  it('Displays on screen', () => {
    render(<CartList
      products={[{
        item: { _id: '1', ...emptyProduct },
        quantity: 1,
      }]}
      paymentType={PaymentType.List}
      handleDeleteProduct={mockFunction}
      handleModifyQuantity={mockFunction}
      oneLiner={false}
    />);
  });
});
