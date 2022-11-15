import { useContext, useEffect } from 'react';
import { Button, Form, Col, Container, Row } from 'react-bootstrap';
import { notify } from 'react-notify-toast';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import ProductContext from 'context/products/ProductContext';
import { useCart } from 'context/cart/CartContext';
import { routes } from 'config/routes';
import LoadingSpinner from 'components/LoadingSpinner';
import ControlPanel from 'components/ControlPanel';
import { PaymentType } from 'constants/cart';
import { MESSAGES, NotificationType } from 'constants/notify';
import { Variants } from 'constants/bootstrapVariants';
import { getProducts } from 'services/products';
import { Product, ProductActions } from 'interfaces/product';
import { CartActions } from 'interfaces/cart';
import { getTotalPrice } from 'utils/priceUtils';
import ProductList from './components/ProductList';
import CartList from '../../components/CartList';
import { OPTIONS } from './constants';

function SplitCart() {
  const { state, dispatch } = useContext(ProductContext);
  const { state: cartState, dispatch: cartDispatch } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (state.products?.length !== 0 || !!state.searchQuery) {
      return;
    }

    getProducts()
      .then(({ data: { response: productData } }) => {
        return dispatch({
          type: ProductActions.GET_ALL,
          payload: { productData },
        });
      })
      .catch(() => {
        notify.show(
          MESSAGES.error.productsCantBeFetched,
          NotificationType.Error
        );
        dispatch({
          type: ProductActions.CLEAR_LOADING,
        });
      });
  }, [dispatch, state.products, state.searchQuery]);

  const handleAddToCart = (product: Product) => {
    return cartDispatch({
      type: CartActions.ADD_TO_CART,
      payload: {
        item: product,
      },
    });
  };

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

  const handleChangePaymentType = (paymentType: PaymentType) => {
    return cartDispatch({
      type: CartActions.CHANGE_PAYMENT_TYPE,
      payload: {
        paymentType,
      },
    });
  };

  const handleClearCart = () => {
    cartDispatch({
      type: CartActions.CLEAR_CART,
      payload: {},
    });
  };

  const goToCheckout = () => {
    navigate(routes[2].path);
  };

  const hasProducts = cartState.products.length > 0;

  return (
    <Container fluid>
      <ControlPanel noAddButton />
      <Row className="mt-3">
        <Col md={6} className="border-primary border-end">
          <CartList
            handleModifyQuantity={handleModifyQuantity}
            products={cartState.products}
            paymentType={cartState.paymentType}
            handleDeleteProduct={handleDeleteProduct}
          />
        </Col>
        <Col md={6} className="border-primary border-start">
          {!state.loading ? (
            <ProductList
              products={state.products}
              handleAddToCart={handleAddToCart}
            />
          ) : (
            <LoadingSpinner />
          )}
        </Col>
      </Row>
      <footer className="bg-dark text-white fixed-bottom p-3">
        <Row>
          <Col>
            <Form.Select
              required
              value={cartState.paymentType}
              onChange={(e) =>
                handleChangePaymentType(e.target.value as PaymentType)
              }
            >
              <option>Open this select menu</option>
              {OPTIONS.map((currentOption) => (
                <option value={currentOption.value} key={currentOption.id}>
                  {currentOption.label}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col>
            <p
              className={classNames('lead', 'd-inline', {
                'text-muted': !hasProducts,
              })}
            >
              Precio total: $
              {getTotalPrice(cartState.products, cartState.paymentType)}
            </p>
          </Col>
          <Col className="d-flex justify-content-end gap-3">
            <Button
              disabled={!hasProducts}
              variant={hasProducts ? Variants.Danger : Variants.OutlinedDanger}
              onClick={handleClearCart}
            >
              Limpiar carrito
            </Button>
            <Button
              disabled={!hasProducts}
              variant={
                hasProducts ? Variants.Primary : Variants.OutlinedPrimary
              }
              onClick={goToCheckout}
            >
              {hasProducts
                ? 'Finalizar compra'
                : 'Agregue productos al carrito'}
            </Button>
          </Col>
        </Row>
      </footer>
    </Container>
  );
}

export default SplitCart;
