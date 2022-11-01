import { Product } from 'interfaces/product';
import { Container, ListGroup } from 'react-bootstrap';
import styles from './styles.module.scss';

interface Props {
  products?: Product[];
  handleAddToCart: (product: Product) => void;
}

function ProductList({ products, handleAddToCart }: Props) {
  const HAS_PRODUCTS = products && products?.length >= 1;

  return (
    <Container fluid className={styles.container}>
      {HAS_PRODUCTS ? (
        <>
          <ListGroup>
            {products?.map((product) => (
              <ListGroup.Item
                action
                key={product._id}
                onClick={() => handleAddToCart(product)}
              >
                <p className="small m-0">{product.name}</p>
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
