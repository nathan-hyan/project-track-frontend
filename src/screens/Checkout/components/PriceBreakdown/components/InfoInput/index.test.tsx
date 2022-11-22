import { fireEvent, render, screen } from '@testing-library/react';

import InfoInput from '.';

const text = 'test';
const onChange = jest.fn();

describe('<InfoInput />', () => {
  it('renders correctly', () => {
    render(<InfoInput label={text} />);
    const input = screen.getByLabelText(text);
    expect(input).toBeInTheDocument();
  });

  it('displays value correctly', () => {
    render(<InfoInput label={text} value={3} onChange={onChange} />);
    const input = screen.getByLabelText(text);

    expect(input).toHaveValue(3);
  });

  it('calls for onChange when changed', () => {
    render(<InfoInput label={text} onChange={onChange} />);
    const input = screen.getByLabelText(text);

    fireEvent.change(input, { target: { value: 4 } });

    expect(onChange).toHaveBeenCalled();
  });

  it('disables when prop is true', () => {
    render(<InfoInput label={text} disabled />);
    const input = screen.getByLabelText(text);

    expect(input).toBeDisabled();
  });
});
