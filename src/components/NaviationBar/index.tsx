import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';

export default function NavigationBar() {
  /*
  Auth

  TODO: Create Login button
  TODO: Make login button change on user logged in
  TODO: Create logout button
  TODO: Add admin toggle for certain navigation buttons

  ----

  Navigation

  TODO: Add cart link
  */

  return (
    <Navbar className="navbar navbar-dark bg-dark fixed-top" expand="lg">
      <Container>
        <Navbar.Brand>
          <Link to="/" className={styles.header}>
            StockOS
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link className="nav-link" to="/menu">Menú</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
