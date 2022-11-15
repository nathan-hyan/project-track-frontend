import { Col, Form, Row } from 'react-bootstrap';
import { PaymentType } from 'constants/cart';
import { PAYMENT_TYPES } from 'screens/Checkout/constants';

function PaymentBlock() {
  return (
    <Col>
      <h1>Método de pago</h1>
      <Row>
        <Col>
          {PAYMENT_TYPES.map((payment) => (
            <Form.Check
              inline
              type="checkbox"
              id={payment.type}
              label={payment.label}
              key={payment.id}
              checked={payment.type === PaymentType.Cash}
              disabled
            />
          ))}
        </Col>
      </Row>
    </Col>
  );
}
export default PaymentBlock;
