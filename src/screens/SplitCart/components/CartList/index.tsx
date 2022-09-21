import { CartProduct } from 'constants/cart';
import { Product } from 'interfaces/product';
import { Button, Col, Container, ListGroup, Row } from 'react-bootstrap';
import styles from './styles.module.scss';

interface Props {
  products?: CartProduct[];
  handleDeleteProduct: (product: Product) => void;
  handleSubtractFromProduct: (product: Product) => void;
}

function CartList({
  products,
  handleDeleteProduct,
  handleSubtractFromProduct,
}: Props) {
  const HAS_PRODUCTS = products && products?.length >= 1;

  return (
    <Container fluid className={styles.container}>
      {HAS_PRODUCTS ? (
        <>
          <ListGroup>
            {products?.map((product) => (
              <ListGroup.Item key={product.product._id} as={Row}>
                <Col>
                  <p className="d-inline lead">{product.product.name}</p>{' '}
                  <i className="text-muted">({product.quantity})</i>
                </Col>
                <Col className={styles.separation}>
                  <p>
                    <small className="text-muted">Precio unit.: </small>$
                    {product.product.price} /{' '}
                    <small className="text-muted">Precio total: </small>$
                    {product.product.price * product.quantity}
                  </p>
                  <div className="d-flex gap-2">
                    <Button
                      variant="outline-danger"
                      onClick={() => handleDeleteProduct(product.product)}
                      size="sm"
                    >
                      Eliminar
                    </Button>
                    {product.quantity > 1 && (
                      <Button
                        size="sm"
                        onClick={() =>
                          handleSubtractFromProduct(product.product)
                        }
                        variant="outline-secondary"
                      >
                        Sacar una unidad
                      </Button>
                    )}
                  </div>
                </Col>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </>
      ) : (
        <h1>¡No hay productos!</h1>
      )}
    </Container>
  );
}
export default CartList;
