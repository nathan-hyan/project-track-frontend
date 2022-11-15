import { Row, Col, Form, InputGroup } from 'react-bootstrap';

interface Props {
  label: string;
  value?: string | number | string[];
  disabled?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

function InfoInput({ label, value, disabled, onChange }: Props) {
  return (
    <Row>
      <Col>
        <Form.Label htmlFor={label}>{label}</Form.Label>
      </Col>
      <Col>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
          <Form.Control
            type="number"
            id={label}
            value={value}
            className="text-end"
            disabled={disabled}
            onChange={onChange}
          />
        </InputGroup>
      </Col>
    </Row>
  );
}
export default InfoInput;
