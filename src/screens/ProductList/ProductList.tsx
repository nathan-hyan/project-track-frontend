import { useContext, useEffect } from 'react';
import { Col, ListGroup, Row } from 'react-bootstrap';
import { Product, ProductActions } from 'interfaces/product';
import { getProducts } from 'services/products';
import ProductContext from 'context/products/ProductContext';
import ControlPanel from './components/ControlPanel';

function ProductList() {
  const { state, dispatch } = useContext(ProductContext);

  useEffect(() => {
    getProducts().then(({ data: { response: productData } }) => {
      return dispatch({
        type: ProductActions.GET_ALL,
        payload: { productData },
      });
    });
  }, [dispatch]);

  return (
    <>
      <ControlPanel />
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
          </Row>
        </ListGroup.Item>
        {state.products?.map((product: Product) => (
          <ListGroup.Item key={product._id}>
            <Row>
              <Col>{product.name}</Col>
              {/* <Col md={2}>{product.category}</Col> */}
              <Col md={1}>{product.internalId}</Col>
              <Col md={1}>{product.stock}</Col>
              {/* <Col md={1}>&#0036;{product.cost}</Col> */}
              <Col md={2}>{product.barcode}</Col>
              <Col md={1}>&#0036;{product.price}</Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
}

export default ProductList;
