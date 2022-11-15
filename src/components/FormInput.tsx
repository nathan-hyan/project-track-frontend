import { ChangeEventHandler, forwardRef } from 'react';
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
  invalidText?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  type: InputType;
}

const FormInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      label,
      name,
      value,
      subtext,
      type,
      placeholder,
      onChange,
      invalidText,
      ...props
    },
    ref,
  ) => (
    <Form.Group className="mb-3" controlId={`${name}-field`}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        name={name}
        value={value}
        ref={ref}
        required
        {...props}
      />
      <Form.Control.Feedback type="invalid">
        {invalidText ?? 'Verifique el campo antes de continuar'}
      </Form.Control.Feedback>
      {subtext && <Form.Text className="text-muted">{subtext}</Form.Text>}
    </Form.Group>
  ),
);

export default FormInput;
