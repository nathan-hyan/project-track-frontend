import CartContext from 'context/cart/CartContext';
import { CartActions } from 'interfaces/cart';
import { useContext } from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import ListItem from './components/ListItem';
import styles from './styles.module.scss';

interface Props {
  onClose: () => void;
  isCartOpen: boolean;
}

function Cart({ onClose, isCartOpen }: Props) {
  const { state, dispatch } = useContext(CartContext);


  const handleDeleteCart = () => {
    onClose();
    return dispatch({type: CartActions.CLEAR_CART})
  }

  const handleDelete = (id: string) => {
    return dispatch({ type: CartActions.DELETE_PRODUCT, payload: { id } });
  };

  const handleModifyQuantity = (id: string, quantity: number) => {
    return dispatch({
      type: CartActions.MODIFY_QUANTITY,
      payload: { id, quantity },
    });
  };

  return isCartOpen ? (
    <>
      <div className={styles.backdrop} onClick={onClose}/>
      <aside className={styles.container}>
        <header className={styles.header}>Carrito de compras</header>
        <main className={styles.main}>
          <ListGroup>
            {state.products.map((product) => (
              <ListItem
                quantity={product.quantity}
                price={product.pricePerUnit}
                id={product.productId}
                label={product.productName}
                onDelete={handleDelete}
                onModifyQuantity={handleModifyQuantity}
              />
            ))}
          </ListGroup>
        </main>
        <footer className={styles.footer}>
          <div className={styles.buttonGroup}>
            <Button variant="primary">Realizar Compra</Button>
            <Button variant="danger" onClick={handleDeleteCart}>Eliminar Carro</Button>
          </div>
        </footer>
      </aside>
    </>
  ) : null;
}
export default Cart;
