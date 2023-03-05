import { forwardRef } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { CartProduct, PaymentType } from 'constants/cart';
import { getTotalPrice } from 'utils/priceUtils';

import styles from './styles.module.scss';

interface Props {
  products: CartProduct[];
  paymentType: PaymentType
}

const TicketToPrint = forwardRef<HTMLDivElement | null, Props>(({ products, paymentType }, ref) => (
  <Container className={styles.container} ref={ref}>
    <h1 className="text-center">* mr. Tienda *</h1>
    <br />
    <br />
    <p className="text-center">Dirección: Av. Manuel Belgrano 2846, San Miguel de Tucumán</p>
    <p className="text-center">Cel: (381)316-9319</p>
    <hr />
    <Row>
      <Col><p className="text-start">Cliente:</p></Col>
      <Col><p className="text-end">No especificado</p></Col>
    </Row>
    <Row>
      <Col><p className="text-start">Nº de Cliente:</p></Col>
      <Col><p className="text-end">0000000000</p></Col>
    </Row>
    <Row>
      <Col><p className="text-start">Pedido Nº:</p></Col>
      <Col><p className="text-end">0000000000</p></Col>
    </Row>
    <hr />
    <p className="text-center"><strong>** Ticket no válido como factura **</strong></p>
    <hr />
    {products.map(({ item, quantity }) => (
      <>
        <Row>
          <Col><p className="text-start">{item.name}</p></Col>
          <Col>
            <p className="text-end">
              $
              {(Number(item.price[paymentType]) * quantity).toFixed(2).trim()}
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="text-start">
              Cantidad:
              {' '}
              {quantity}
            </p>

          </Col>
          <Col>
            <p className="text-end">
              Precio unit.:
              {' '}
              $
              {item.price[paymentType].toFixed(2).trim()}
            </p>

          </Col>
        </Row>
        <br />
      </>
    ))}
    <hr />
    <Row>
      <Col><p className="text-start"><strong>Total:</strong></p></Col>
      <Col>
        <p className="text-end">
          <strong>
            $
            {String(getTotalPrice(products, paymentType).toFixed(2))}
          </strong>
        </p>

      </Col>
    </Row>
    <hr />
    <Row>
      <Col><p className="text-start">Medio de pago:</p></Col>
      <Col><p className="text-end">Efectivo</p></Col>
    </Row>
    <br />
    <p className="text-center"><strong>** Gracias por su compra **</strong></p>
    <br />
  </Container>
));

export default TicketToPrint;
