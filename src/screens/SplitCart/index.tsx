import { useContext, useEffect } from 'react';
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
import { useNavigate } from 'react-router-dom';
import { routes } from 'config/routes';

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

  const handleModifyQuantity = (product: Product, quantity: number) => {
    return cartDispatch({
      type: CartActions.MODIFY_QUANTITY, 
      payload: {
        item: product,
        quantity
      }
    })
  }

  const getTotalPrice = () => {
    let totalPrice = 0;

    cartState.cart.forEach(
      (itemOnCart) =>
        (totalPrice += itemOnCart.product.price * itemOnCart.quantity)
    );

    return totalPrice;
  };

  const goToCheckout = () => {
    navigate(routes[2].path)
  }

  const hasProducts = cartState.cart.length > 0;

  return (
    <Container fluid>
      <ControlPanel noAddButton />
      <Row className="mt-3">
        <Col md={6} className="border-primary border-end">
          <CartList
          handleModifyQuantity={handleModifyQuantity}
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
            <p className={`lead d-inline ${!hasProducts && 'text-muted'}`}>
              Precio total: ${getTotalPrice()}
            </p>
          </Col>
          <Col className="d-flex justify-content-end">
            <Button
              disabled={!hasProducts}
              variant={`${!hasProducts ? 'outline-' : ''}primary`}
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
