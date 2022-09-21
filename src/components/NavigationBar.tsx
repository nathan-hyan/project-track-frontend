import { routes } from 'config/routes';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
    <Navbar className="navbar navbar-dark bg-dark mb-3" expand="lg">
      <Container>
        <Navbar.Brand>StockOS</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {routes.map(route => <Link className='nav-link' to={route.path}>{route.name}</Link>)}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
