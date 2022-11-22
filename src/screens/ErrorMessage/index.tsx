import { Container } from 'react-bootstrap';

function ErrorMessage() {
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="display-1">¡Oh no!</h1>
      <p className="lead">No parece que haya una página diseñada para esta ruta... ¡qué macana!</p>
    </Container>
  );
}
export default ErrorMessage;
