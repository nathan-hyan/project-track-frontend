import { Col, Row } from 'react-bootstrap';
import { Client } from 'screens/Checkout/constants';

interface Props {
  client: Client;
}

function ClientInfo({ client }: Props) {
  return (
    <>
      <Row className="border">
        <Col className="py-2">
          <p className="p-0 m-0">
            {client.name}{' '}
            <small className="text-muted">{client.enterprise}</small>
          </p>
        </Col>
      </Row>
      <Row className="border border-top-0">
        <Col className="d-flex justify-content-center flex-column align-items-center py-3">
          <p className="m-0 p-0">Saldo a favor</p>
          <h1 className="m-0 p-0">{client.credit.positiveBalance}</h1>
        </Col>
        <Col className="border-start border-end d-flex justify-content-center flex-column align-items-center py-3">
          <p className="m-0 p-0">Saldo deudor</p>
          <h1 className="m-0 p-0">{client.credit.negativeBalance}</h1>
        </Col>
        <Col className="d-flex justify-content-center flex-column align-items-center py-3">
          <p className="m-0 p-0">mr. Crédito Disponible</p>
          <h1 className="m-0 p-0">{client.credit.mrCredit}</h1>
        </Col>
      </Row>
    </>
  );
}
export default ClientInfo;
