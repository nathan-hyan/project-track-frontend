import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { notify } from 'react-notify-toast';
import { useNavigate } from 'react-router-dom';
import CartList from 'components/CartList';
import { routes } from 'config/routes';
import {
  CartProductForBackend,
  DEFAULT_STORE_BRANCH,
  DEFAULT_USER_ID,
} from 'constants/cart';
import { MESSAGES, NotificationType } from 'constants/notify';
import { useCart } from 'context/cart/CartContext';
import { CartActions } from 'interfaces/cart';
import { Product } from 'interfaces/product';
import { createPurchase } from 'services/purchase';
import { getTotalPrice } from 'utils/priceUtils';
import { checkForStock } from 'utils/productUtils';
import ClientInfo from './components/ClientInfo';
import PaymentBlock from './components/PaymentBlock';
import PriceBreakdown from './components/PriceBreakdown';
import Footer from './components/Footer';
import { DEFAULT_CLIENT_INFO } from './constants';
import styles from './styles.module.scss';

function Checkout() {
  const { state: cartState, dispatch: cartDispatch } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleDeleteProduct = (product: Product) => {
    return cartDispatch({
      type: CartActions.REMOVE_FROM_CART,
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

  const onSubmit = () => {
    setIsLoading(true);
    let processedProducts: CartProductForBackend[] = [];

    if (cartState.products.length <= 0) {
      setIsLoading(false);
      notify.show(MESSAGES.error.cartCantBeEmpty, NotificationType.Error);
      navigate(routes[1].path);
      return;
    }
    cartState.products.forEach((product) =>
      processedProducts.push({
        item: product.item._id!,
        quantity: product.quantity,
      })
    );

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
        notify.show(
          MESSAGES.success.purchaseComplete,
          NotificationType.Success
        );
        navigate(routes[0].path);
      })
      .catch((err) => {
        notify.show(MESSAGES.error.purchaseFailed, NotificationType.Error);

        console.error(err);
        return;
      })
      .finally(() => {
        cartDispatch({
          type: CartActions.CLEAR_CART,
          payload: {},
        });
        setIsLoading(false);
      });
  };

  const onSave = () => {
    console.log('To be implemented'); // TODO: Implement
  };

  const onBudget = () => {
    console.log('To be implemented'); // TODO: Implement
  };

  return (
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
  );
}
export default Checkout;
