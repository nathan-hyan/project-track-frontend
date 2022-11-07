import { PaymentType } from 'constants/cart';

export const OPTIONS = [
  {
    id: 0,
    value: PaymentType.List,
    label: 'Lista',
  },
  {
    id: 1,
    value: PaymentType.Cash,
    label: 'Contado / Débito',
  },
];
