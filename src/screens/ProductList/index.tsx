import {
  ChangeEvent, useContext, useEffect, useState,
} from 'react';
import {
  Container, ListGroup,
} from 'react-bootstrap';
import { MESSAGES } from 'constants/notify';
import { SortTypes } from 'constants/products';
import ProductContext from 'context/products/ProductContext';
import { Product, ProductActions } from 'interfaces/product';
import ErrorMessage from 'screens/ErrorMessage';
import { deleteProduct, getProducts } from 'services/products';

import ControlPanel from 'components/ControlPanel';
import LoadingSpinner from 'components/LoadingSpinner';

import AddEditProduct from './components/AddEditProduct';
import ProductItem from './components/ProductItem';
import Sort from './components/Sort';
import { notifications } from './constants';

function ProductList() {
  const {
    state: {
      products, product, loading, sort, searchQuery,
    }, dispatch,
  } = useContext(ProductContext);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (products?.length !== 0 || !!searchQuery) {
      return;
    }
    dispatch({
      type: ProductActions.SET_LOADING,
    });

    getProducts(sort || '').then(({ data: { response: productData } }) => dispatch({
      type: ProductActions.GET_ALL,
      payload: { productData },
    })).catch(() => {
      dispatch({
        type: ProductActions.SET_ERROR,
        payload: { error: MESSAGES.error.productsCantBeFetched },
      });
    });
  }, [dispatch, sort]);

  const changeSort = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    dispatch({
      type: ProductActions.CHANGE_SORT,
      payload: { sort: value as SortTypes },
    });
  };

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
          getProducts(sort || '').then(({ data: { response: productData } }) => dispatch({
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

  return (
    <Container>
      <AddEditProduct
        product={product}
        showModal={showModal}
        closeModal={handleModalClose}
      />
      <ControlPanel handleModalClose={handleModalClose} />
      {!products || products?.length <= 0 ? <ErrorMessage message="¡No hay productos!" hideButton />
        : (
          <>
            <Sort sort={sort || 'name'} changeSort={changeSort} />
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
          </>
        )}
    </Container>
  );
}

export default ProductList;
