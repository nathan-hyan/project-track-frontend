import { Col, ListGroup, Row } from 'react-bootstrap';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import { Variants } from 'constants/bootstrapVariants';
import { Product } from 'interfaces/product';
import { formatTime } from 'utils/timeFormat';

import ButtonWithIcon from 'components/ButtonWithIcon';

import styles from './styles.module.scss';

interface Props {
  product: Product;
  handleEdit: (product: Product) => void;
  handleDelete: (productId?: string) => void;
}

function ProductItem({ product, handleEdit, handleDelete }: Props) {
  const hasNoProducts = product.stock < 1;

  return (
    <ListGroup.Item key={product._id}>
      <Row className={classNames('lead', styles.leadFont)}>
        <Col
          className={classNames({
            'text-muted': hasNoProducts,
            'text-decoration-line-through': hasNoProducts,
          })}
        >
          {product.name}
        </Col>
      </Row>
      <Row>
        <Col md={1}>
          <p className={classNames('m-0', { 'text-muted': hasNoProducts })}>
            <i>Id: </i>
            <strong>{String(product.internalId).padStart(4, '0')}</strong>
          </p>
        </Col>
        <Col md={2}>
          <p className={classNames('m-0', { 'text-danger': hasNoProducts })}>
            <i>Stock: </i>
            <strong>{product.stock}</strong>
          </p>
        </Col>

        <Col>
          <p className={classNames('m-0', { 'text-muted': hasNoProducts })}>
            <i>Costo: </i>
            <strong>
              &#0036;
              {product.price.cost}
            </strong>
          </p>
        </Col>
        <Col>
          <p className={classNames('m-0', { 'text-muted': hasNoProducts })}>
            <i>Cont.: </i>
            <strong>
              &#0036;
              {product.price.cash}
            </strong>
          </p>
        </Col>
        <Col>
          <p className={classNames('m-0', { 'text-muted': hasNoProducts })}>
            <i>Lista: </i>
            <strong>
              &#0036;
              {product.price.list}
            </strong>
          </p>
        </Col>
        <Col>
          <p className={classNames('m-0', { 'text-muted': hasNoProducts })}>
            <i>Web: </i>
            <strong>
              &#0036;
              {product.price.onlineStore}
            </strong>
          </p>
        </Col>
        <Col md={1} className="d-flex justify-content-center gap-2">
          <ButtonWithIcon
            onClick={() => handleEdit(product)}
            icon={faPen}
            small
          />
          <ButtonWithIcon
            onClick={() => handleDelete(product._id)}
            icon={faTrash}
            label=""
            variant={Variants.Danger}
            small
          />
        </Col>
      </Row>
      <Row>
        <Col md={3}>
          <p className={classNames('m-0', { 'text-muted': hasNoProducts })}>
            <i>Cod. barra: </i>
            <strong>{product.barcode}</strong>
          </p>
        </Col>
        {product.price.lastModified && (
        <Col>
          <p className={classNames('m-0', { 'text-muted': hasNoProducts })}>
            <i>Ult. Mod. Precio Costo: </i>
            <strong>{formatTime(product.price.lastModified, 'short')}</strong>
          </p>
        </Col>
        )}
      </Row>
      <Row />
    </ListGroup.Item>
  );
}
export default ProductItem;
