import { faBrush, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import React, { ChangeEventHandler, useContext, useState } from 'react';
import { Accordion, Col, Form, Row } from 'react-bootstrap';
import ButtonWithIcon, { ButtonTypes } from 'components/ButtonWithIcon';
import FormInput, { InputType } from 'components/FormInput';
import { Variants } from 'constants/bootstrapVariants';
import { ProductActions } from 'interfaces/product';
import ProductContext from 'context/products/ProductContext';
import { SearchType } from './constants';
import CustomCheck from 'components/CustomCheck';

interface Props {
  handleModalClose: () => void;
}

function ControlPanel({ handleModalClose }: Props) {
  const { state, dispatch } = useContext(ProductContext);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch({
      type: ProductActions.FILTER,
    });
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch({
      type: ProductActions.FILTER_WRITE,
      payload: { searchQuery: e.target.value },
    });
  };

  const handleSearchTypeChange = (type: SearchType) => {
    dispatch({
      type: ProductActions.FILTER_CHANGE_TYPE,
      payload: { searchType: type }
    })
  }

  const handleClearFilter = () => {
    dispatch({
      type: ProductActions.CLEAR_FILTER,
    });
  };

  return (
    <>
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
                <Col className='d-flex align-items-center justify-content-center'>
                  <CustomCheck 
                    inline
                    label='Código de barras' 
                    id='searchType' 
                    name={String(SearchType.BAR_CODE)} 
                    onChange={handleSearchTypeChange}
                    value={SearchType.BAR_CODE}
                    checked={state.searchType === SearchType.BAR_CODE}  
                    />
                  <CustomCheck 
                    inline
                    label='Nombre de producto' 
                    id='searchType'
                    name={String(SearchType.PRODUCT_ID)} 
                    value={SearchType.PRODUCT_ID}
                    onChange={handleSearchTypeChange}
                    checked={state.searchType === SearchType.PRODUCT_ID}  
                  />
                </Col>
                <Col className="d-flex justify-content-end">
                  <ButtonWithIcon
                    label="Agregar producto"
                    icon={faPlus}
                    variant={Variants.Success}
                    onClick={handleModalClose}
                  />
                </Col>
              </Row>
            </Form>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </>
  );
}

export default ControlPanel;
