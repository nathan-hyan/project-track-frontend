import React, { ChangeEventHandler, useContext, useState } from 'react';
import {
  Accordion, Col, Form, Row,
} from 'react-bootstrap';
import { faBrush, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Variants } from 'constants/bootstrapVariants';
import { ButtonTypes } from 'constants/global';
import ProductContext from 'context/products/ProductContext';
import { ProductActions } from 'interfaces/product';
import { SearchType } from 'screens/ProductList/components/AddEditProduct/constants';

import ButtonWithIcon from 'components/ButtonWithIcon';
import CustomCheck from 'components/CustomCheck';
import FormInput, { InputType } from 'components/FormInput';

interface Props {
  handleModalClose?: () => void;
  noAddButton?: boolean;
}

function ControlPanel({ handleModalClose, noAddButton }: Props) {
  const [formIsValid, setFormIsValid] = useState(false);
  const { state, dispatch } = useContext(ProductContext);

  if (!noAddButton && !handleModalClose) {
    throw new Error("Can't have an Add button without modal closing handling");
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const FORM = e.currentTarget;
    e.preventDefault();
    setFormIsValid(true);

    if (FORM.checkValidity()) {
      dispatch({
        type: ProductActions.FILTER,
      });
    }
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormIsValid(false);
    dispatch({
      type: ProductActions.FILTER_WRITE,
      payload: { searchQuery: e.target.value },
    });
  };

  const handleSearchTypeChange = (type: SearchType) => {
    dispatch({
      type: ProductActions.FILTER_CHANGE_TYPE,
      payload: { searchType: type },
    });
  };

  const handleClearFilter = () => {
    setFormIsValid(false);
    dispatch({
      type: ProductActions.CLEAR_FILTER,
    });
  };

  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Panel de control</Accordion.Header>
        <Accordion.Body>
          <Form noValidate validated={formIsValid} onSubmit={handleSubmit}>
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
              <Col className="d-flex align-items-center justify-content-center">
                <CustomCheck
                  inline
                  label="Código de barras"
                  id="searchType"
                  name={String(SearchType.BAR_CODE)}
                  onChange={handleSearchTypeChange}
                  value={SearchType.BAR_CODE}
                  checked={state.searchType === SearchType.BAR_CODE}
                />
                <CustomCheck
                  inline
                  label="Nombre de producto"
                  id="searchType"
                  name={String(SearchType.PRODUCT_ID)}
                  value={SearchType.PRODUCT_ID}
                  onChange={handleSearchTypeChange}
                  checked={state.searchType === SearchType.PRODUCT_ID}
                />
              </Col>
              <Col className="d-flex justify-content-end">
                {!noAddButton && (
                <ButtonWithIcon
                  label="Agregar producto"
                  icon={faPlus}
                  variant={Variants.Success}
                  onClick={handleModalClose}
                />
                )}
              </Col>
            </Row>
          </Form>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default ControlPanel;
