import { useContext, useEffect, useState } from 'react';
import { Container, ListGroup } from 'react-bootstrap';
import { MESSAGES } from 'constants/notify';
import ProductContext from 'context/products/ProductContext';
import { Product, ProductActions } from 'interfaces/product';
import ErrorMessage from 'screens/ErrorMessage';
import { deleteProduct, getProducts } from 'services/products';

import ControlPanel from 'components/ControlPanel';
import LoadingSpinner from 'components/LoadingSpinner';

import AddEditProduct from './components/AddEditProduct';
import ProductItem from './components/ProductItem';
import { notifications } from './constants';

function ProductList() {
  const {
    state: {
      products, product, loading, error,
    }, dispatch,
  } = useContext(ProductContext);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch({
      type: ProductActions.SET_LOADING,
    });

    getProducts().then(({ data: { response: productData } }) => dispatch({
      type: ProductActions.GET_ALL,
      payload: { productData },
    })).catch(() => {
      dispatch({
        type: ProductActions.SET_ERROR,
        payload: { error: MESSAGES.error.productsCantBeFetched },
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
          notifications.productDeleted();
          getProducts().then(({ data: { response: productData } }) => dispatch({
            type: ProductActions.GET_ALL,
            payload: { productData },
          }));
        })
        .catch(() => notifications.productNotDeleted());
    }
  };

  if (loading) {
    return (
      <Container className="center-in-screen">
        <LoadingSpinner />
      </Container>
    );
  }

  if (!products || products?.length <= 0) {
    return (
      <ErrorMessage message={error} hideButton />
    );
  }

  return (
    <Container>
      <AddEditProduct
        product={product}
        showModal={showModal}
        closeModal={handleModalClose}
      />
      <ControlPanel handleModalClose={handleModalClose} />
      <ListGroup className="mt-3">
        {products?.map((currentProduct: Product) => (
          <ProductItem
            key={currentProduct._id}
            product={currentProduct}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))}
      </ListGroup>
    </Container>
  );
}

export default ProductList;