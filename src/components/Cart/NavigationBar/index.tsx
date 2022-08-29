import { Navbar, Container } from 'react-bootstrap';
import styles from './styles.module.scss';
interface Props {
  toggleCart: () => void;
}

export default function NavigationBar({toggleCart}: Props) {
  return (
    <nav>
      <Navbar bg="primary" variant="dark" className="mb-3 rounded">
        <Container>
          <Navbar.Brand href="#home">Sistema de cobranza</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end gap-2">
            <Navbar.Text onClick={toggleCart} className={styles.cursorHand}>
              Abrir carrito
            </Navbar.Text>
            <Navbar.Text>|</Navbar.Text>
            <Navbar.Text>
              Usuario: <a href="#login">Jessica Ahmad</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </nav>
  );
}
