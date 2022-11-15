import { useState } from 'react';
import { PaymentType } from 'constants/cart';

import { INPUTS } from '../../constants';

import InfoInput from './components/InfoInput';

interface Props {
  subtotal: number;
  paymentType?: PaymentType;
  positiveBalance?: number;
  negativeBalance?: number;
}

function PriceBreakdown({
  paymentType = PaymentType.List,
  subtotal = 0,
  positiveBalance = 0,
  negativeBalance = 0,
}: Props) {
  const [delivery, setDelivery] = useState(0);
  const [discount, setDiscount] = useState(0);

  const calculateTotalAmount = () => {
    const totalDiscounts = positiveBalance + discount;
    const addedAmount = subtotal + negativeBalance + delivery;

    return addedAmount - totalDiscounts;
  };

  return (
    <>
      <InfoInput
        label={`${INPUTS.subtotal} (Precio ${paymentType})`}
        value={subtotal}
        disabled
      />
      <InfoInput
        label={INPUTS.positiveBalance}
        value={positiveBalance}
        disabled
      />
      <InfoInput
        label={INPUTS.negativeBalance}
        value={negativeBalance}
        disabled
      />
      <InfoInput
        label={INPUTS.delivery}
        value={delivery}
        onChange={(e) => setDelivery(Number(e.target.value))}
      />
      <InfoInput
        label={INPUTS.discount}
        value={discount}
        onChange={(e) => setDiscount(Number(e.target.value))}
      />
      <hr />
      <InfoInput
        label={INPUTS.totalAmount}
        value={calculateTotalAmount()}
        disabled
      />
    </>
  );
}
export default PriceBreakdown;
