import { useContext, useEffect, useMemo } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { notify } from 'react-notify-toast';
import ProductContext from 'context/products/ProductContext';
import { useCart } from 'context/cart/CartContext';
import { getProducts } from 'services/products';
import ControlPanel from 'screens/ProductList/components/ControlPanel';
import LoadingSpinner from 'components/LoadingSpinner';
import { Product, ProductActions } from 'interfaces/product';
import { CartActions } from 'interfaces/cart';
import ProductList from './components/ProductList';
import CartList from './components/CartList';

/**
 * TODO: Display spinner on loading
 * TODO: Display products on the list
 * TODO: Make product list pretty
 * Done: Connect products API
 * Done: Handle error catch for data fetching
 */

function SplitCart() {
  const { state, dispatch } = useContext(ProductContext);
  const { state: cartState, dispatch: cartDispatch } = useCart();

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
          'Ocurrió un error trayendo los productos. Por favor, reintente.',
          'error'
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

  const handleSubtractFromProduct = (product: Product) => {
    return cartDispatch({
      type: CartActions.SUBTRACT_ONE_FROM_ITEM,
      payload: {
        item: product,
      },
    });
  };

  const getTotalPrice = () => {
    let totalPrice = 0;

    cartState.cart.forEach(
      (itemOnCart) =>
        (totalPrice += itemOnCart.product.price * itemOnCart.quantity)
    );

    return totalPrice;
  };

  return (
    <Container fluid>
      <ControlPanel noAddButton />
      <Row className="mt-3">
        <Col md={6} className="border-primary border-end">
          <CartList
            products={cartState.cart}
            handleDeleteProduct={handleDeleteProduct}
            handleSubtractFromProduct={handleSubtractFromProduct}
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
            <p className="lead d-inline">Precio total: ${getTotalPrice()}</p>
          </Col>
          <Col className="d-flex justify-content-end">
            <Button disabled={cartState.cart.length <= 0} variant="primary">
              Finalizar compra
            </Button>
          </Col>
        </Row>
      </footer>
    </Container>
  );
}
export default SplitCart;
