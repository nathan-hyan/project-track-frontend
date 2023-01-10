import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { routes } from 'config/routes';

interface Props {
  message?: string | null;
  hideButton?: boolean
}

function ErrorMessage({ message = 'No parece que haya una página diseñada para esta ruta... ¡qué macana!', hideButton }: Props) {
  const navigate = useNavigate();

  const redirectToHome = () => {
    navigate(routes[0].path);
  };

  return (
    <Container className="d-flex flex-column justify-content-center align-items-center v-100">
      <h1 className="display-1">¡Oh no!</h1>
      <p className="lead">{message}</p>
      {!hideButton && <Button className="mt-5" onClick={redirectToHome}>Volver a la página principal</Button>}
    </Container>
  );
}
export default ErrorMessage;
