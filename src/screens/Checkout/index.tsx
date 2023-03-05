/* eslint-disable no-undef */
import { useRef, useState } from 'react';
import {
  Col, Container, Modal, Row,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { toast } from 'react-toastify';
import { faCheckCircle, faPrint, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { routes } from 'config/routes';
import { Variants } from 'constants/bootstrapVariants';
import {
  CartProductForBackend,
  DEFAULT_STORE_BRANCH,
  DEFAULT_USER_ID,
} from 'constants/cart';
import { MESSAGES } from 'constants/notify';
import { useCart } from 'context/cart/CartContext';
import { CartActions } from 'interfaces/cart';
import { Product } from 'interfaces/product';
import { createPurchase } from 'services/purchase';
import { getTotalPrice } from 'utils/priceUtils';
import { checkForStock } from 'utils/productUtils';

import ButtonWithIcon from 'components/ButtonWithIcon';
import CartList from 'components/CartList';

import ClientInfo from './components/ClientInfo';
import Footer from './components/Footer';
import PaymentBlock from './components/PaymentBlock';
import PriceBreakdown from './components/PriceBreakdown';
import TicketToPrint from './components/Ticket';
import { DEFAULT_CLIENT_INFO } from './constants';

import styles from './styles.module.scss';

function Checkout() {
  const { state: cartState, dispatch: cartDispatch } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const ticketToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => ticketToPrint.current,
  });
  const notifications = {
    cartCantBeEmpty: () => toast.warn(MESSAGES.error.cartCantBeEmpty),
    purchaseComplete: () => toast.success(MESSAGES.success.purchaseComplete),
    purchaseFailed: () => toast.error(MESSAGES.error.purchaseFailed),
    printCompleted: () => toast.success(MESSAGES.success.printCompleted),
    printFailed: () => toast.error(MESSAGES.error.printFailed),
  };

  const handleDeleteProduct = (product: Product) => cartDispatch({
    type: CartActions.REMOVE_FROM_CART,
    payload: {
      item: product,
    },
  });

  const handleModifyQuantity = (product: Product, quantity: number) => cartDispatch({
    type: CartActions.MODIFY_QUANTITY,
    payload: {
      item: product,
      quantity,
    },
  });

  const onSubmit = () => {
    setIsLoading(true);
    const processedProducts: CartProductForBackend[] = [];

    if (cartState.products.length <= 0) {
      setIsLoading(false);
      notifications.cartCantBeEmpty();
      navigate(routes[1].path);
      return;
    }
    cartState.products.forEach((product) => processedProducts.push({
      item: product.item._id!,
      quantity: product.quantity,
    }));

    createPurchase({
      products: processedProducts,
      amount: {
        subtotal: getTotalPrice(cartState.products, cartState.paymentType),
        positiveBalance: 0,
        negativeBalance: 0,
        delivery: 0,
        discount: 0,
      },
      paymentType: cartState.paymentType,
      storeId: DEFAULT_STORE_BRANCH,
      userId: DEFAULT_USER_ID,
    })
      .then(() => {
        notifications.purchaseComplete();
        setShowModal(true);
      })
      .catch(() => {
        notifications.purchaseFailed();
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleReturnToHome = () => {
    cartDispatch({
      type: CartActions.CLEAR_CART,
      payload: {},
    });
    navigate(routes[0].path);
  };

  const handlePrintTicket = async () => {
    handlePrint();
  };

  const onSave = () => {
    throw new Error('Not implemented');
  };

  const onBudget = () => {
    throw new Error('Not implemented');
  };

  return (
    <>
      <Modal show={showModal}>
        <Modal.Body className="text-center">
          <FontAwesomeIcon icon={faCheckCircle} size="5x" color="green" className="mb-4" />
          <p className="lead">¡La compra se realizó con exito!</p>
          <p className="lead">¿Desea imprimir el ticket para el cliente?</p>
          <TicketToPrint {...cartState} ref={ticketToPrint} />
        </Modal.Body>
        <Modal.Footer>
          <ButtonWithIcon
            label="Cerrar y volver a la pantalla principal"
            variant={Variants.Secondary}
            onClick={handleReturnToHome}
            icon={faTimesCircle}
          />
          <ButtonWithIcon
            label="Imprimir ticket"
            variant={Variants.Primary}
            onClick={handlePrintTicket}
            icon={faPrint}
          />
        </Modal.Footer>
      </Modal>
      <Container className={styles.container}>
        <Row>
          <Col>
            <CartList
              handleModifyQuantity={handleModifyQuantity}
              products={cartState.products}
              paymentType={cartState.paymentType}
              handleDeleteProduct={handleDeleteProduct}
              oneLiner
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
        <Footer
          isLoading={isLoading}
          hasStock={checkForStock(cartState.products)}
          onSave={onSave}
          onBudget={onBudget}
          onSubmit={onSubmit}
        />
      </Container>
    </>
  );
}
export default Checkout;
