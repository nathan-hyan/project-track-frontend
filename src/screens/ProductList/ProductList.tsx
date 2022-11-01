import { useContext, useEffect, useState } from 'react';
import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import { notify } from 'react-notify-toast';
import classNames from 'classnames';
import { Product, ProductActions } from 'interfaces/product';
import { deleteProduct, getProducts } from 'services/products';
import ProductContext from 'context/products/ProductContext';
import ControlPanel from './components/ControlPanel';
import ButtonWithIcon from 'components/ButtonWithIcon';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import AddEditProduct from './components/AddEditProduct';
import { Variants } from 'constants/bootstrapVariants';
import { MESSAGES, NotificationType } from 'constants/notify';
import styles from './styles.module.scss';

function ProductList() {
  const { state, dispatch } = useContext(ProductContext);
  const [showModal, setShowModal] = useState(false);

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

  const handleEdit = (productToEdit: Product) => {
    dispatch({
      type: ProductActions.OPEN_EDIT,
      payload: { productToEdit },
    });
    handleModalClose();
  };

  const handleDelete = (id?: string) => {
    if (window.confirm(MESSAGES.question.delete) && id) {
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

  return (
    <Container>
      <AddEditProduct
        product={state.product}
        showModal={showModal}
        closeModal={handleModalClose}
      />
      <ControlPanel handleModalClose={handleModalClose} />
      <ListGroup className="mt-3">
        {state.products?.map((product: Product) => (
          <ListGroup.Item key={product._id}>
            <Row className={classNames('lead', styles.leadFont)}>
              <Col>{product.name}</Col>
            </Row>
            <Row>
              {/* <Col md={2}>{product.category}</Col> */}
              <Col>
                <p className="m-0">
                  <i>Id: </i>
                  <strong>{String(product.internalId).padStart(4, '0')}</strong>
                </p>
              </Col>
              <Col>
                <p className="m-0">
                  <i>Stock: </i>
                  <strong>{product.stock}</strong>
                </p>
              </Col>
              {/* <Col >&#0036;{product.cost}</Col> */}
              <Col>
                <p className="m-0">
                  <i>Cod. barra: </i>
                  <strong>{product.barcode}</strong>
                </p>
              </Col>
              <Col>
                <p className="m-0">
                  <i>Precio unit.: </i>
                  <strong>&#0036;{product.price.list}</strong>
                </p>
              </Col>
              <Col md={1} className="d-flex justify-content-center gap-2">
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
    </Container>
  );
}

export default ProductList;
