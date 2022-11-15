import { useContext, useEffect, useState } from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import { notify } from 'react-notify-toast';
import { MESSAGES, NotificationType } from 'constants/notify';
import ProductContext from 'context/products/ProductContext';
import { Product, ProductActions } from 'interfaces/product';
import { deleteProduct, getProducts } from 'services/products';

import ControlPanel from 'components/ControlPanel';

import AddEditProduct from './components/AddEditProduct';
import ProductItem from './components/ProductItem';

function ProductList() {
  const { state, dispatch } = useContext(ProductContext);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getProducts().then(({ data: { response: productData } }) => dispatch({
      type: ProductActions.GET_ALL,
      payload: { productData },
    }));
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
            NotificationType.Success,
          );
          getProducts().then(({ data: { response: productData } }) => dispatch({
            type: ProductActions.GET_ALL,
            payload: { productData },
          }));
        })
        .catch(() => notify.show(MESSAGES.error.productNotDeleted, NotificationType.Error));
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
          <ProductItem
            key={product._id}
            product={product}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))}
      </ListGroup>
    </Container>
  );
}

export default ProductList;
