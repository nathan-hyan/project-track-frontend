import { Button, Col, Row } from 'react-bootstrap';
import { Variants } from 'constants/bootstrapVariants';

interface Props {
  isLoading: boolean;
  hasStock: boolean;
  onSubmit: () => void;
  onBudget: () => void;
  onSave: () => void;
}

function Footer({
  isLoading, onSubmit, onBudget, onSave, hasStock,
}: Props) {
  return (
    <footer className="bg-dark text-white fixed-bottom p-3">
      <Row>
        <Col className="d-flex justify-content-end gap-3">
          <Button disabled variant={Variants.OutlinedDanger} onClick={onSave}>
            Guardar
          </Button>
          <Button
            disabled
            variant={Variants.OutlinedPrimary}
            onClick={onBudget}
          >
            Presupuesto
          </Button>
          <Button
            disabled={isLoading || !hasStock}
            variant={Variants.Primary}
            onClick={onSubmit}
          >
            Cobrar
          </Button>
        </Col>
      </Row>
    </footer>
  );
}
export default Footer;
