import CartList from 'components/CartList';
import { PaymentType } from 'constants/cart';
import { useCart } from 'context/cart/CartContext';
import { CartActions } from 'interfaces/cart';
import { Product } from 'interfaces/product';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { getTotalPrice } from 'utils/priceUtils';
import ClientInfo from './components/ClientInfo';
import PaymentBlock from './components/PaymentBlock';
import PriceBreakdown from './components/PriceBreakdown';
import { DEFAULT_CLIENT_INFO } from './constants';
import styles from './styles.module.scss';

function Checkout() {
  const { state: cartState, dispatch: cartDispatch } = useCart();

  const handleDeleteProduct = (product: Product) => {
    return cartDispatch({
      type: CartActions.REMOVE_FROM_CART,
      payload: {
        item: product,
      },
    });
  };

  const handleSubtractFromProduct = (product: Product) => {
    return cartDispatch({
      type: CartActions.SUBTRACT_ONE_FROM_ITEM,
      payload: {
        item: product,
      },
    });
  };

  const handleModifyQuantity = (product: Product, quantity: number) => {
    return cartDispatch({
      type: CartActions.MODIFY_QUANTITY,
      payload: {
        item: product,
        quantity,
      },
    });
  };

  return (
    <Container className={`${styles.container}`}>
      <Row>
        <Col>
          <CartList
            handleModifyQuantity={handleModifyQuantity}
            products={cartState.products}
            paymentType={cartState.paymentType}
            handleDeleteProduct={handleDeleteProduct}
            handleSubtractFromProduct={handleSubtractFromProduct}
          />
        </Col>
        <Col>
          <PriceBreakdown
            subtotal={getTotalPrice(cartState.products, cartState.paymentType)}
            paymentType={cartState.paymentType}
          />
        </Col>
      </Row>
      <hr className="my-5" />
      <Row>
        <Col>
          <ClientInfo client={DEFAULT_CLIENT_INFO[0]} />
        </Col>
        <Col>
          <PaymentBlock />
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
