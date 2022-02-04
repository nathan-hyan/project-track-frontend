import { faSave, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import ButtonWithIcon, { ButtonTypes } from 'components/ButtonWithIcon';
import FormInput from 'components/FormInput';
import { Variants } from 'constants/bootstrapVariants';
import { MESSAGES, NotificationType } from 'constants/notify';
import { emptyProduct } from 'constants/products';
import ProductContext from 'context/products/ProductContext';
import { Product, ProductActions } from 'interfaces/product';
import { useContext } from 'react';
import { Form, Modal } from 'react-bootstrap';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { notify } from 'react-notify-toast';
import { createProduct, getProducts } from 'services/products';
import { PRODUCT_FORM } from './constants';

interface Props {
  showModal: boolean;
  handleModalClose: () => void;
  product: Product | null;
}

function AddEditProduct({ showModal, handleModalClose, product }: Props) {
  const {
    dispatch,
    state: { loading },
  } = useContext(ProductContext);
  const { handleSubmit, control, reset } = useForm<Product>();

  const onSubmit: SubmitHandler<Product> = (data) => {
    dispatch({ type: ProductActions.SET_LOADING });
    createProduct(data)
      .then(() => {
        reset(emptyProduct);
        handleModalClose();
        notify.show(MESSAGES.success.productCreated, NotificationType.success);
        getProducts()
          .then(({ data: { response: productData } }) => {
            dispatch({ type: ProductActions.CLEAR_LOADING });
            dispatch({
              type: ProductActions.GET_ALL,
              payload: { productData },
            });
          })
          .catch(() => {
            notify.show(
              MESSAGES.error.productsCantBeFetched,
              NotificationType.error
            );
            dispatch({ type: ProductActions.CLEAR_LOADING });
          });
      })
      .catch(() => {
        notify.show(MESSAGES.error.productNotCreated, NotificationType.error);
        dispatch({ type: ProductActions.CLEAR_LOADING });
      });
  };

  return (
    <Modal show={showModal} onHide={handleModalClose}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {!!product ? 'Editar producto' : 'Crear producto'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {PRODUCT_FORM.map((item) => (
            <Controller
              key={item.id}
              name={item.name}
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <FormInput {...field} label={item.label} type={item.type} />
              )}
            />
          ))}
          <Controller
            name="category"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Categoría</Form.Label>
                <Form.Select {...field}>
                  <option value="">Seleccione un valor</option>
                  <option value="libreria">Librería</option>
                  <option value="imprenta">Imprenta</option>
                  <option value="servicios">Servicios</option>
                  <option value="regaleria">Regalería</option>
                  <option value="biju-cosmetica">Bijú / Cosmética</option>
                  <option value="electronica">Electrónica</option>
                  <option value="cotillon">Cotillón</option>
                </Form.Select>
              </Form.Group>
            )}
          />
        </Modal.Body>
        <Modal.Footer>
          <ButtonWithIcon
            label="Guardar"
            icon={faSave}
            type={ButtonTypes.Submit}
            disabledWithSpinner={loading}
          />
          <ButtonWithIcon
            variant={Variants.Secondary}
            label="Cerrar"
            icon={faTimesCircle}
            onClick={handleModalClose}
            disabledWithSpinner={loading}
          />
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default AddEditProduct;
