import { ListGroup } from 'react-bootstrap';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './styles.module.scss';
import React from 'react';

interface Props {
  id: string;
  quantity: number;
  price: number;
  label: string;
  onDelete: (id: string) => void;
  onModifyQuantity: (id: string, quantity: number) => void;
}

function ListItem({
  id,
  label,
  price,
  quantity,
  onDelete,
  onModifyQuantity,
}: Props) {
  return (
    <ListGroup.Item className={styles.container}>
      <div className={styles.leftContainer}>{label}</div>
      <div className={styles.rightContainer}>
        <div className={styles.quantityContainer}>
          <p>
            qty:{' '}
            <input
              type="number"
              value={quantity}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                onModifyQuantity(id, Number(e.target.value));
              }}
              className={styles.input}
            />
          </p>
        </div>
        <div>
          <small>
            ${price} / ${price * quantity}
          </small>
        </div>
        <FontAwesomeIcon
          className={styles.trashIcon}
          icon={faTrash}
          onClick={() => onDelete(id)}
        />
      </div>
    </ListGroup.Item>
  );
}
export default ListItem;
