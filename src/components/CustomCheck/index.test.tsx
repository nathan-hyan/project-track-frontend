import { fireEvent, render, screen } from '@testing-library/react';

import CustomCheck from '.';

const onChange = jest.fn();

const props = {
  id: '1', name: 'test', value: 'thing', checked: false, label: 'Test', inline: false, onChange,
};

describe('<CustomCheck />', () => {
  it('renders ok', () => {
    render(<CustomCheck {...props} />);
    const check = screen.getByRole('radio');
    const label = screen.getByText(props.label);

    expect(check).toBeInTheDocument();
    expect(label).toBeInTheDocument();
  });

  it('calls onChange when clicked', () => {
    render(<CustomCheck {...props} />);
    const check = screen.getByRole('radio');

    fireEvent.click(check);

    expect(onChange).toHaveBeenCalled();
  });

  it('Checkes on value passed', () => {
    render(<CustomCheck {...props} checked />);
    const check = screen.getByRole('radio');

    expect(check).toBeChecked();
  });
});
