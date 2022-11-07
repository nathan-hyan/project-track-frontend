export interface Client {
  id: number;
  name: string;
  enterprise: string;
  credit: {
    positiveBalance: number;
    negativeBalance: number;
    mrCredit: number;
  };
}

export const INPUTS = {
  subtotal: 'Subtotal',
  positiveBalance: 'Saldo a favor',
  negativeBalance: 'Saldo deudor',
  delivery: 'Envío',
  discount: 'Descuento',
  totalAmount: 'Monto a pagar',
};

export const PAYMENT_TYPES = [
  {
    id: 0,
    type: 'cash',
    label: 'Efectivo',
  },
  {
    id: 1,
    type: 'debit',
    label: 'Débito',
  },
  {
    id: 2,
    type: 'credit',
    label: 'Crédito',
  },
  {
    id: 3,
    type: 'transfer',
    label: 'Transferencia',
  },
  {
    id: 4,
    type: 'mercadopago',
    label: 'Mercado Pago',
  },
  {
    id: 5,
    type: 'mrCredit',
    label: 'Mundo Regalo Crédito',
  },
];

export const DEFAULT_CLIENT_INFO: Client[] = [
  {
    id: 0,
    name: 'Juan Carlos Gonzalez',
    enterprise: 'Mundo Regalo',
    credit: {
      positiveBalance: 0,
      negativeBalance: 0,
      mrCredit: 0,
    },
  },
];
