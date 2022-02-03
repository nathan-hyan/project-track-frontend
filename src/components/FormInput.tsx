import { Form } from 'react-bootstrap';

export enum InputType {
  Text = 'text',
  Email = 'email',
  Number = 'number',
}

interface Props {
  label: string;
  name: string;
  value?: string | number;
  subtext?: string;
  placeholder?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  type: InputType;
}

function FormInput({
  label,
  name,
  value,
  subtext,
  type,
  placeholder,
  onChange,
  ...props
}: Props) {
  return (
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        {...props}
      />
      {subtext && <Form.Text className="text-muted">{subtext}</Form.Text>}
    </Form.Group>
  );
}

export default FormInput;
