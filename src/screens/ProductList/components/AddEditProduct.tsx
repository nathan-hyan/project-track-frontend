import { useContext, useEffect } from 'react';
import { Form, Modal } from 'react-bootstrap';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { faSave, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { Variants } from 'constants/bootstrapVariants';
import { ButtonTypes } from 'constants/global';
import { MESSAGES } from 'constants/notify';
import { emptyProduct } from 'constants/products';
import ProductContext from 'context/products/ProductContext';
import { Product, ProductActions } from 'interfaces/product';
import { createProduct, editProduct, getProducts } from 'services/products';

import ButtonWithIcon from 'components/ButtonWithIcon';
import FormInput from 'components/FormInput';

import { PRICE_FORM, PriceInputName, PRODUCT_FORM } from './constants';

interface Props {
  showModal: boolean;
  closeModal: () => void;
  product: Product | null;
}

function AddEditProduct({ showModal, closeModal, product }: Props) {
  const {
    dispatch,
    state: { loading },
  } = useContext(ProductContext);

  const {
    handleSubmit, control, reset, setValue,
  } = useForm<Product>();

  const notifications = {
    submitConfirmed: () => toast.success(product
      ? MESSAGES.success.productModified
      : MESSAGES.success.productCreated),
    cantBeFetched: () => toast.error(MESSAGES.error.productsCantBeFetched),
    isntModified: () => toast.error(product
      ? MESSAGES.error.productNotModified
      : MESSAGES.error.productNotCreated),
  };

  useEffect(() => {
    PRODUCT_FORM.map((input) => setValue(
      input.name,
      product ? product[input.name] : emptyProduct[input.name],
    ));

    PRICE_FORM.map((input) => setValue(
      `price.${input.name as PriceInputName}`,
      product ? product.price[input.name] : emptyProduct.price[input.name],
    ));

    setValue('category', product ? product.category : emptyProduct.category);
  }, [product, setValue]);

  const handleModalClose = () => {
    reset(emptyProduct);
    dispatch({
      type: ProductActions.CLOSE_EDIT,
    });
    closeModal();
  };

  const onSubmit: SubmitHandler<Product> = async (data) => {
    handleModalClose();
    dispatch({ type: ProductActions.SET_LOADING });

    try {
      if (product) {
        await editProduct({ ...data, _id: product._id });
      } else {
        await createProduct(data);
      }

      notifications.submitConfirmed();

      getProducts()
        .then(({ data: { response: productData } }) => {
          dispatch({ type: ProductActions.CLEAR_LOADING });
          dispatch({
            type: ProductActions.GET_ALL,
            payload: { productData },
          });
        })
        .catch(() => {
          notifications.cantBeFetched();
          dispatch({ type: ProductActions.CLEAR_LOADING });
        });
    } catch (err) {
      notifications.isntModified();
      dispatch({ type: ProductActions.CLEAR_LOADING });
    }
  };

  return (
    <Modal show={showModal} onHide={handleModalClose}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {product ? 'Editar producto' : 'Crear producto'}
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
          <hr />
          <h3>Precios</h3>
          <hr />
          {PRICE_FORM.map((item) => (
            <Controller
              key={item.id}
              name={`price.${item.name}`}
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <FormInput {...field} label={item.label} type={item.type} />
              )}
            />
          ))}
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
