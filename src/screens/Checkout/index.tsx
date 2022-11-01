import { useCart } from 'context/cart/CartContext';
import { Button, Col, Container, Row } from 'react-bootstrap';
import styles from './styles.module.scss';

function Checkout() {
  const { state: cartState, dispatch: cartDispatch } = useCart();

  return (
    <Container className={styles.container}>
      <Row>
        <Col>
          {cartState.cart.map((item) => (
            <p>{item.product.name}</p>
          ))}
        </Col>
        <Col>
          <Row>
            <Col>Subtotal</Col>
            <Col>
              <input />
            </Col>
          </Row>
          <Row>
            <Col>Saldo a favor</Col>
            <Col>
              <input />
            </Col>
          </Row>
          <Row>
            <Col>Saldo deudor</Col>
            <Col>
              <input />
            </Col>
          </Row>
          <Row>
            <Col>Envio</Col>
            <Col>
              <input />
            </Col>
          </Row>
          <Row>
            <Col>Descuento</Col>
            <Col>
              <input />
            </Col>
          </Row>
          <Row>
            <Col>Monto a pagar</Col>
            <Col>
              <input />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col>
          <fieldset>
            <legend>Método de pago</legend>
            <Row>
              <Col>
                <input type="checkbox" name="payment_method" value="cash" />
                Efectivo
                <br />
                <input type="checkbox" name="payment_method" value="debit" />
                Débito
                <br />
                <input type="checkbox" name="payment_method" value="credit" />
                Crédito
                <br />
              </Col>
              <Col>
                <input type="checkbox" name="payment_method" value="transfer" />
                Transferencia
                <br />
                <input
                  type="checkbox"
                  name="payment_method"
                  value="mercadopago"
                />
                QR MercadoPago
                <br />
                <input type="checkbox" name="payment_method" value="mrcredit" />
                MR Crédito
                <br />
              </Col>
            </Row>
          </fieldset>
        </Col>
      </Row>
      <footer className="bg-dark text-white fixed-bottom p-3">
        <Row>
          <Col className="d-flex justify-content-end gap-3">
            <Button variant={`outline-danger`}>Guardar</Button>
            <Button variant={`outline-primary`}>Presupuesto</Button>
            <Button variant={`primary`}>Cobrar</Button>
          </Col>
        </Row>
      </footer>
    </Container>
  );
}
export default Checkout;
