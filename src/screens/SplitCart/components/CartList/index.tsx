import { CartProduct } from 'constants/cart';
import { Product } from 'interfaces/product';
import { Col, Container, ListGroup, Row } from 'react-bootstrap';
import styles from './styles.module.scss';

interface Props {
  products?: CartProduct[];
  handleDeleteProduct: (product: Product) => void;
}

function CartList({ products, handleDeleteProduct }: Props) {
  const HAS_PRODUCTS = products && products?.length >= 1;

  return (
    <Container fluid className={styles.container}>
      {HAS_PRODUCTS ? (
        <>
          <ListGroup>
            {products?.map((product) => (
              <ListGroup.Item action key={product.product._id} as={Row}>
                <Col>{product.product.name} - cant. {product.quantity}</Col>
                <Col>
                  ${product.product.price} - ${product.product.price * product.quantity}{' '}
                  <button
                    onClick={() => handleDeleteProduct(product.product)}
                    className={`text-danger ${styles.deleteButton}`}
                  >
                    Eliminar
                  </button>
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
