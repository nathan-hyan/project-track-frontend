import { Button, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CartProduct, PaymentType } from 'constants/cart';
import { Variants } from 'constants/bootstrapVariants';
import { Product } from 'interfaces/product';
import styles from './styles.module.scss';

interface Props {
  products?: CartProduct[];
  paymentType?: PaymentType;
  handleDeleteProduct: (product: Product) => void;
  handleModifyQuantity: (product: Product, quantity: number) => void;
  oneLiner?: boolean;
}

function CartList({
  products,
  paymentType = PaymentType.List,
  handleDeleteProduct,
  handleModifyQuantity,
  oneLiner,
}: Props) {
  const hasProducts = products && products?.length >= 1;

  const handleOnChange = (e: any, product: Product) => {
    const { value } = e.target;

    handleModifyQuantity(product, Number(value));
  };

  return (
    <Container fluid className={styles.container}>
      {hasProducts ? (
        <>
          <ListGroup className="w-100">
            {products?.map((product) => (
              <ListGroup.Item key={product.item._id} as={Row} className="w-100">
                <Col>
                  <span className="d-flex justify-content-between">
                    <p className="text-truncate w-50 m-0 p-0">
                      {product.item.name}
                    </p>
                    {!oneLiner ? (
                      <div className="d-flex gap-3">
                        <p className="m-0 p-0">
                          {'('}
                          <input
                            className={`text-muted ${styles.input}`}
                            value={product.quantity}
                            onChange={(e) => handleOnChange(e, product.item)}
                            type="number"
                            max={product.item.stock}
                            min={1}
                          />{' '}
                          / {product.item.stock}
                          {')'}
                        </p>
                        <Button
                          variant={Variants.Danger}
                          onClick={() => handleDeleteProduct(product.item)}
                          size="sm"
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                      </div>
                    ) : (
                      <p className="m-0 p-0">
                        <small className="text-muted">Precio total: </small>$
                        {(product.item.price[paymentType] || 0) *
                          product.quantity}{' '}
                        / <small className="text-muted">Cant.: </small>
                        {product.quantity}
                      </p>
                    )}
                  </span>
                </Col>
                {!oneLiner && (
                  <Col className={styles.separation}>
                    <p className="m-0 p-0">
                      <small className="text-muted">Precio unit.: </small>$
                      {product.item.price[paymentType] || 0} /{' '}
                      <small className="text-muted">Precio total: </small>$
                      {(product.item.price[paymentType] || 0) *
                        product.quantity}{' '}
                      {product.item.stock < 1 && (
                        <small className="text-danger fst-italic">
                          SIN STOCK
                        </small>
                      )}
                    </p>
                  </Col>
                )}
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
