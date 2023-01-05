import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { routes } from 'config/routes';

function ErrorMessage() {
  const navigate = useNavigate();

  const redirectToHome = () => {
    navigate(routes[0].path);
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="display-1">¡Oh no!</h1>
      <p className="lead">No parece que haya una página diseñada para esta ruta... ¡qué macana!</p>
      <Button className="mt-5" onClick={redirectToHome}>Volver a la página principal</Button>
    </Container>
  );
}
export default ErrorMessage;
