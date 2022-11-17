import { Button, Spinner } from 'react-bootstrap';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Variants } from 'constants/bootstrapVariants';
import { ButtonTypes } from 'constants/global';

interface Props {
  label?: string;
  icon: IconProp;
  onClick?: () => void;
  variant?: Variants;
  className?: string;
  type?: ButtonTypes;
  disabled?: boolean;
  disabledWithSpinner?: boolean;
  small?: boolean;
}

function ButtonWithIcon({
  disabled,
  disabledWithSpinner,
  label,
  icon,
  onClick,
  variant,
  className,
  small,
  type = ButtonTypes.Button,
}: Props) {
  return (
    <Button
      disabled={disabled || disabledWithSpinner}
      variant={variant}
      onClick={onClick}
      className={className}
      type={type}
      size={small ? 'sm' : undefined}
    >
      {disabledWithSpinner ? (
        <Spinner data-testid="spinner" animation="border" size="sm" />
      ) : (
        <FontAwesomeIcon icon={icon} data-testid="icon" />
      )}
      {' '}
      {label ?? ''}
    </Button>
  );
}

export default ButtonWithIcon;
