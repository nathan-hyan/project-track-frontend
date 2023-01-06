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
  small?: boolean;
  required?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  type: InputType;
  disabled?: boolean;
}

const FormInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      small,
      label,
      name,
      value,
      subtext,
      type,
      placeholder,
      onChange,
      invalidText,
      required,
      disabled,
      ...props
    },
    ref,
  ) => (
    <Form.Group className="mb-3" controlId={`${name}-field`}>
      <Form.Label className="m-0 p-0">
        <small>
          {label}
        </small>
      </Form.Label>
      <Form.Control
        size={small ? 'sm' : undefined}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        name={name}
        disabled={disabled}
        value={value}
        ref={ref}
        required={required}
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
