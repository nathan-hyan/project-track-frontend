import classNames from 'classnames';
import { Container, ListGroup } from 'react-bootstrap';
import { Product } from 'interfaces/product';
import styles from './styles.module.scss';

interface Props {
  products?: Product[];
  handleAddToCart: (product: Product) => void;
}

function ProductList({ products, handleAddToCart }: Props) {
  const hasProduct = products && products?.length >= 1;

  return (
    <Container fluid className={styles.container}>
      {hasProduct ? (
        <>
          <ListGroup>
            {products?.map((product) => (
              <ListGroup.Item
                action
                key={product._id}
                onClick={() => handleAddToCart(product)}
              >
                <p
                  className={classNames('small', 'm-0', {
                    'text-muted': product.stock < 1,
                    'text-decoration-line-through': product.stock < 1,
                  })}
                >
                  {product.name}
                </p>
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
export default ProductList;
