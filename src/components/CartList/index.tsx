import { Button, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { CartProduct, PaymentType } from 'constants/cart';
import { Product } from 'interfaces/product';
import styles from './styles.module.scss';

interface Props {
  products?: CartProduct[];
  paymentType?: PaymentType;
  handleDeleteProduct: (product: Product) => void;
  handleSubtractFromProduct: (product: Product) => void;
  handleModifyQuantity: (product: Product, quantity: number) => void;
}

function CartList({
  products,
  paymentType = PaymentType.List,
  handleDeleteProduct,
  handleSubtractFromProduct,
  handleModifyQuantity,
}: Props) {
  const HAS_PRODUCTS = products && products?.length >= 1;

  const handleOnChange = (e: any, product: Product) => {
    const { value } = e.target;

    handleModifyQuantity(product, Number(value));
  };

  return (
    <Container fluid className={styles.container}>
      {HAS_PRODUCTS ? (
        <>
          <ListGroup className="w-100">
            {products?.map((product) => (
              <ListGroup.Item key={product.item._id} as={Row} className="w-100">
                <Col>
                  <p className="d-inline">{product.item.name}</p> {'('}
                  <input
                    className={`text-muted ${styles.input}`}
                    value={product.quantity}
                    onChange={(e) => handleOnChange(e, product.item)}
                  />{' '}
                  / {product.item.stock}
                  {')'}
                </Col>
                <Col className={styles.separation}>
                  <p>
                    <small className="text-muted">Precio unit.: </small>$
                    {product.item.price[paymentType] || 0} /{' '}
                    <small className="text-muted">Precio total: </small>$
                    {(product.item.price[paymentType] || 0) * product.quantity}
                  </p>
                  <div className="d-flex gap-2">
                    <Button
                      variant="outline-danger"
                      onClick={() => handleDeleteProduct(product.item)}
                      size="sm"
                    >
                      Eliminar
                    </Button>
                    {product.quantity > 1 && (
                      <Button
                        size="sm"
                        onClick={() => handleSubtractFromProduct(product.item)}
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
