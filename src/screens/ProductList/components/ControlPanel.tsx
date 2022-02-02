import { faBrush, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import React, { useContext } from 'react';
import { Accordion, Col, Form, Row } from 'react-bootstrap';
import ButtonWithIcon, { ButtonTypes } from 'components/ButtonWithIcon';
import FormInput, { InputType } from 'components/FormInput';
import { Variants } from 'constants/bootstrapVariants';
import { ProductActions } from 'interfaces/product';
import ProductContext from 'context/products/ProductContext';

function ControlPanel() {
  const { state, dispatch } = useContext(ProductContext);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch({
      type: ProductActions.FILTER,
    });
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch({
      type: ProductActions.FILTER_WRITE,
      payload: { searchQuery: e.target.value },
    });
  };

  const handleClearFilter = () => {
    dispatch({
      type: ProductActions.CLEAR_FILTER,
    });
  };

  return (
    <div>
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Panel de control</Accordion.Header>
          <Accordion.Body>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col>
                  <FormInput
                    label="Buscar producto"
                    name="searchProduct"
                    onChange={handleChange}
                    type={InputType.Text}
                    value={state.searchQuery || ''}
                  />
                </Col>
              </Row>
              <Row>
                <Col className="d-flex gap-3">
                  <ButtonWithIcon
                    icon={faSearch}
                    label="Buscar"
                    type={ButtonTypes.Submit}
                  />
                  <ButtonWithIcon
                    icon={faBrush}
                    label="Limpiar búsqueda"
                    variant={Variants.Secondary}
                    onClick={handleClearFilter}
                  />
                </Col>
                <Col className="d-flex justify-content-end">
                  <ButtonWithIcon
                    label="Agregar producto"
                    icon={faPlus}
                    variant={Variants.Success}
                  />
                </Col>
              </Row>
            </Form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default ControlPanel;
