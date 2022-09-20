import { Navbar, Container } from 'react-bootstrap';

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
    <nav>
      <Navbar bg="primary" variant="dark" className="mb-3 rounded">
        <Container>
          <Navbar.Brand href="#home">Sistema de cobranza</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </nav>
  );
}
