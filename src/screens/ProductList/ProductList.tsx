/* eslint-disable no-restricted-globals */
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Col, ListGroup, Row } from 'react-bootstrap';
import { notify } from 'react-notify-toast';
import { MESSAGES, NotificationType } from 'constants/notify';
import { faCartPlus, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Variants } from 'constants/bootstrapVariants';
import CustomPagination from 'components/CustomPagination';
import { Product, ProductActions } from 'interfaces/product';
import { deleteProduct, getProducts } from 'services/products';
import ProductContext from 'context/products/ProductContext';
import ButtonWithIcon from 'components/ButtonWithIcon';
import ControlPanel from './components/ControlPanel';
import AddEditProduct from './components/AddEditProduct';
import { CartActions } from 'interfaces/cart';
import CartContext from 'context/cart/CartContext';

function ProductList() {
  const { state, dispatch } = useContext(ProductContext);
  const { state: cartState, dispatch: cartDispatch } = useContext(CartContext);
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(({ data: { response: productData } }) => {
      return dispatch({
        type: ProductActions.GET_ALL,
        payload: { productData },
      });
    });
  }, [dispatch]);

  const handleModalClose = () => {
    setShowModal((prevState) => !prevState);
  };

  const handleAddProductToCart = (product: Product) => {
    console.count('clicked on handleAddProductToCart');
    return cartDispatch({
      type: CartActions.ADD_PRODUCT,
      payload: { productToAdd: product },
    });
  }

  const handleEdit = (productToEdit: Product) => {
    dispatch({
      type: ProductActions.OPEN_EDIT,
      payload: { productToEdit },
    });
    handleModalClose();
  };

  const handleDelete = (id?: string) => {
    if (confirm(MESSAGES.question.delete) && id) {
      deleteProduct(id)
        .then(() => {
          notify.show(
            MESSAGES.success.productDeleted,
            NotificationType.success
          );
          getProducts().then(({ data: { response: productData } }) => {
            return dispatch({
              type: ProductActions.GET_ALL,
              payload: { productData },
            });
          });
        })
        .catch(() =>
          notify.show(MESSAGES.error.productNotDeleted, NotificationType.error)
        );
    }
  };

  const onChangePage = (newPage: Product[]) => {
    setPage(newPage);
  };

  return (
    <>
      <AddEditProduct
        product={state.product}
        showModal={showModal}
        closeModal={handleModalClose}
      />
      <ControlPanel handleModalClose={handleModalClose} />
      <ListGroup className="mt-3 ">
        <ListGroup.Item active>
          <Row>
            <Col>Items</Col>
            {/* <Col md={2}>Categoría</Col> */}
            <Col md={1}>Id</Col>
            <Col md={1}>Stock</Col>
            {/* <Col md={1}>Costo</Col> */}
            <Col md={2}>Codigo de barras</Col>
            <Col md={1}>Precio</Col>
            <Col md={1} className="d-flex justify-content-center">
              Acciones
            </Col>
          </Row>
        </ListGroup.Item>
        {page.map((product: Product) => (
          <ListGroup.Item key={product._id}>
            <Row>
              <Col>{product.name}</Col>
              {/* <Col md={2}>{product.category}</Col> */}
              <Col md={1}>{String(product.internalId).padStart(4, '0')}</Col>
              <Col md={1}>{product.stock}</Col>
              {/* <Col md={1}>&#0036;{product.cost}</Col> */}
              <Col md={2}>{product.barcode}</Col>
              <Col md={1}>&#0036;{product.price}</Col>
              <Col md={1} className="d-flex justify-content-center gap-2">
                <ButtonWithIcon
                  onClick={() => handleAddProductToCart(product)}
                  icon={faCartPlus}
                  label={''}
                  variant={Variants.Success}
                  small
                />
                <ButtonWithIcon
                  onClick={() => handleEdit(product)}
                  icon={faPen}
                  label={''}
                  small
                />
                <ButtonWithIcon
                  onClick={() => handleDelete(product._id)}
                  icon={faTrash}
                  label={''}
                  variant={Variants.Danger}
                  small
                />
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <CustomPagination
        items={state.products || []}
        onChangePage={onChangePage}
      />
    </>
  );
}

export default ProductList;
