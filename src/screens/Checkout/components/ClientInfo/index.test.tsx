import { render, screen } from '@testing-library/react';

import ClientInfo from '.';

const mockClient = {
  id: 1,
  name: 'McCartney',
  enterprise: 'The Beatles',
  credit: {
    positiveBalance: 1,
    negativeBalance: 1,
    mrCredit: 1,
  },
};

describe('<ClientInfo />', () => {
  it('renders correctly', () => {
    render(<ClientInfo client={mockClient} />);
    const text = screen.getAllByText(/saldo/i);
    const mrCredit = screen.getByText(/crédito/i);
    expect(text).toHaveLength(2);
    expect(mrCredit).toBeInTheDocument();
  });

  it('displays info correctly', () => {
    const mockCredit = { positiveBalance: 12, negativeBalance: 14, mrCredit: 19 };

    render(<ClientInfo client={{ ...mockClient, credit: mockCredit }} />);

    const positiveBalance = screen.getByText(mockCredit.positiveBalance);
    const negativeBalance = screen.getByText(mockCredit.negativeBalance);
    const mrCreditBalance = screen.getByText(mockCredit.mrCredit);

    expect(positiveBalance).toBeInTheDocument();
    expect(negativeBalance).toBeInTheDocument();
    expect(mrCreditBalance).toBeInTheDocument();
  });

  it('displays name and company correctly', () => {
    render(<ClientInfo client={mockClient} />);

    const name = screen.getByText(mockClient.name);
    const enterprise = screen.getByText(mockClient.enterprise);

    expect(name).toBeInTheDocument();
    expect(enterprise).toBeInTheDocument();
  });
});
