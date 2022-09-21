import { Container } from 'react-bootstrap';
import {useRouteError} from 'react-router-dom';

interface Error {
    statusText?: string;
    message?: string
}

function ErrorMessage() {

    const error = useRouteError() as Error;
    console.error(error)

  return (
    <Container className='d-flex flex-column justify-content-center align-items-center vh-100'>
        <h1 className='display-1'>¡Oh no!</h1>
        <p className='lead'>No parece que haya una página diseñada para esta ruta... ¡qué macana!</p>

        <p><i className='text-muted'>{error.statusText || error.message}</i></p>
    </Container>
  )
}
export default ErrorMessage