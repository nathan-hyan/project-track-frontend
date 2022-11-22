import { Form } from 'react-bootstrap';

interface Props {
    id: string;
    name: string;
    value: any;
    checked: boolean;
    label: string;
    inline?: boolean;
    onChange: (type: any) => void;
}

function CustomCheck({
  id, name, value, checked, label, inline, onChange,
}: Props) {
  return (
    <Form.Check type="radio" id={id} inline={inline}>
      <Form.Check.Input type="radio" checked={checked} name={name} onChange={() => onChange(value)} />
      <Form.Check.Label>{label}</Form.Check.Label>
    </Form.Check>
  );
}
export default CustomCheck;
