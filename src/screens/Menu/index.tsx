import { Container, Row } from 'react-bootstrap';
import { routes } from 'config/routes';

import CustomCard from './components/CustomCard';

function Menu() {
  return (
    <Container className="center-in-screen">
      <Row xs={2} md={3} className="g-4">
        {routes.map((route) => !route.hideFromNavbar && route.icon && (
          <CustomCard key={route.path} icon={route.icon} name={route.name} path={route.path} />
        ))}
      </Row>
    </Container>
  );
}
export default Menu;
