import { Navbar, Container } from 'react-bootstrap';

export default function NavigationBar() {
  return (
    <nav>
      <Navbar bg="primary" variant="dark" className="mb-3 rounded">
        <Container>
          <Navbar.Brand href="#home">Sistema de cobranza</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Usuario: <a href="#login">Jessica Ahmad</a>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </nav>
  );
}
