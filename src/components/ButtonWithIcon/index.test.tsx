import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { fireEvent, render, screen } from '@testing-library/react';
import { Variants } from 'constants/bootstrapVariants';

import ButtonWithIcon from '.';

const test = 'Test';
const onClick = jest.fn();

describe('<ButtonWithIcon />', () => {
  it('renders ok on display', () => {
    render(<ButtonWithIcon icon={faTrashAlt} label={test} />);
    const button = screen.getByText(test);

    expect(button).toBeInTheDocument();
  });

  it('changes to small variant when prop is true', () => {
    render(<ButtonWithIcon icon={faTrashAlt} label={test} small />);
    const button = screen.getByText(test);

    expect(button).toHaveClass('btn-sm');
  });

  it('uses the correct class with the bootstrap variant', () => {
    render(
      <>
        <ButtonWithIcon icon={faTrashAlt} label={test} variant={Variants.Danger} />
        <ButtonWithIcon icon={faTrashAlt} label="outlined" variant={Variants.OutlinedSecondary} />
      </>,
    );
    const buttonDanger = screen.getByText(test);
    const buttonOutlinedSecondary = screen.getByText('outlined');

    expect(buttonDanger).toHaveClass('btn-danger');
    expect(buttonOutlinedSecondary).toHaveClass('btn-outline-secondary');
  });

  it('calls function onClick', () => {
    render(<ButtonWithIcon icon={faTrashAlt} label={test} onClick={onClick} />);
    const button = screen.getByText(test);

    fireEvent.click(button);

    expect(onClick).toHaveBeenCalled();
  });

  it('disables when prop is true', () => {
    render(<ButtonWithIcon icon={faTrashAlt} label={test} disabled />);
    const button = screen.getByText(test);

    expect(button).toBeDisabled();
  });

  it('disables when prop is true and displays spinner', () => {
    render(<ButtonWithIcon icon={faTrashAlt} label={test} disabledWithSpinner />);
    const button = screen.getByText(test);
    const spinner = screen.getByTestId('spinner');

    expect(button).toBeDisabled();
    expect(spinner).toBeInTheDocument();
  });
});
