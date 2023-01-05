import {
  useContext, useEffect,
} from 'react';
import {
  Col, Form, Modal, Row,
} from 'react-bootstrap';
import {
  Controller, SubmitHandler, useFieldArray, useForm,
} from 'react-hook-form';
import { toast } from 'react-toastify';
import {
  faPlus, faSave, faTimesCircle, faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { Variants } from 'constants/bootstrapVariants';
import { ButtonTypes } from 'constants/global';
import { MESSAGES } from 'constants/notify';
import { emptyProduct } from 'constants/products';
import ProductContext from 'context/products/ProductContext';
import { Product, ProductActions } from 'interfaces/product';
import { createProduct, editProduct, getProducts } from 'services/products';
import { formatTime } from 'utils/timeFormat';

import ButtonWithIcon from 'components/ButtonWithIcon';
import FormInput, { InputType } from 'components/FormInput';

import {
  DIMENSIONS_FORM,
  LOCAL_INFO_FORM,
  PRICE_FORM,
  PriceInputName,
  PRODUCT_FORM,
  PROVIDER_PRODUCT_CODE_FORM_EMPTY,
  SPECIFICATIONS_FORM_EMPTY,
  VARIANTS_FORM_EMPTY,
} from './constants';
import { priceComparator } from './utils';

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

  const {
    fields: specificationFields,
    remove: specificationRemove,
    append: specificationAppend,
  } = useFieldArray({ control, name: 'specifications' });

  const {
    fields: variantsFields,
    remove: variantsRemove,
    append: variantsAppend,
  } = useFieldArray({ control, name: 'variants' });

  const {
    fields: providerProductCodeFields,
    remove: providerProductCodeRemove,
    append: providerProductCodeAppend,
  } = useFieldArray({ control, name: 'providerProductCode' });

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

    LOCAL_INFO_FORM.map((input) => setValue(
      input.name,
      product
        ? product[input.name]
        : emptyProduct[input.name],
    ));

    DIMENSIONS_FORM.map((input) => setValue(
      `dimensions.${input.name}`,
      product
        ? product.dimensions[input.name]
        : emptyProduct.dimensions[input.name],
    ));

    setValue('specifications', product ? product.specifications : emptyProduct.specifications);
    setValue('variants', product ? product.variants : emptyProduct.variants);
    setValue('category', product ? product.category : emptyProduct.category);
    setValue('description', product ? product.description : emptyProduct.description);
    setValue('providerProductCode', product ? product.providerProductCode : emptyProduct.providerProductCode);
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
        await editProduct({
          ...data,
          _id: product._id,
          price: {
            ...data.price,
            lastModified: priceComparator(product.price, data.price)
              ? new Date()
              : product.price.lastModified,
          },
        });
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
    <Modal show={showModal} onHide={handleModalClose} size="lg">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Header closeButton>
          <Modal.Title className="d-flex flex-row justify-content-between align-items-center w-100">
            <div>{product ? 'Editar producto' : 'Crear producto'}</div>
            {product?.price.lastModified && (
            <div>
              <h6 className="text-secondary m-0 p-0 text-small">{`Última mod. del precio: ${formatTime(product?.price.lastModified)}`}</h6>
            </div>
            )}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <h3>Información</h3>
              <hr />
              {PRODUCT_FORM.map((item) => (
                <Controller
                  key={item.id}
                  name={item.name}
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormInput {...field} label={item.label} type={item.type} small />
                  )}
                />
              ))}
              <Controller
                name="category"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="m-0 p-0"><small>Categoría</small></Form.Label>
                    <Form.Select {...field} size="sm">
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
            </Col>
            <Col>
              <h3>Precios</h3>
              <hr />
              {PRICE_FORM.map((item) => (
                <Controller
                  key={item.id}
                  name={`price.${item.name}`}
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormInput {...field} label={item.label} type={item.type} small />
                  )}
                />
              ))}
            </Col>
          </Row>
          <Row>
            <Col>
              <h3>Info. Local</h3>
              <hr />
              <h6>Código de producto del proveedor:</h6>
              {providerProductCodeFields.map((items, index) => (
                <Row key={items.id} className="d-flex align-items-end ">
                  <Col>
                    <Controller
                      name={`providerProductCode.${index}.id`}
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <FormInput {...field} label="Id del producto" type={InputType.Number} small />
                      )}
                    />

                  </Col>
                  <Col>
                    <Controller
                      name={`providerProductCode.${index}.name`}
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <FormInput {...field} label="Nombre del proveedor" type={InputType.Text} small />
                      )}
                    />
                  </Col>
                  <Col md={2}>
                    <ButtonWithIcon
                      className="mb-3"
                      icon={faTrash}
                      small
                      variant={Variants.Danger}
                      onClick={() => { providerProductCodeRemove(index); }}
                    />
                  </Col>
                </Row>
              ))}
              <ButtonWithIcon icon={faPlus} label="Agregar" variant={Variants.Info} onClick={() => providerProductCodeAppend(PROVIDER_PRODUCT_CODE_FORM_EMPTY)} small />
              <hr />
              {LOCAL_INFO_FORM.map((item) => (
                <Controller
                  key={item.id}
                  name={item.name}
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormInput {...field} label={item.label} type={item.type} small />
                  )}
                />
              ))}
              <hr />
              <h6>Dimensiones</h6>
              <hr />
              {DIMENSIONS_FORM.map((item) => (
                <Controller
                  key={item.id}
                  name={`dimensions.${item.name}`}
                  control={control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormInput {...field} label={item.label} type={item.type} small />
                  )}
                />
              ))}

            </Col>
            <Col>
              <h3>Descripciones</h3>
              <hr />
              <Controller
                name="description"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <FormInput {...field} label="Descripcion" type={InputType.Text} small />
                )}
              />
              <hr />
              <h6>Especificaciones</h6>
              <hr />
              {specificationFields.map((items, index) => (
                <Row key={items.id} className="d-flex align-items-end ">
                  <Col>
                    <Controller
                      name={`specifications.${index}.title`}
                      control={control}
                      render={({ field }) => (
                        <FormInput {...field} label="Título" type={InputType.Text} small />
                      )}
                    />

                  </Col>
                  <Col>
                    <Controller
                      name={`specifications.${index}.description`}
                      control={control}
                      render={({ field }) => (
                        <FormInput {...field} label="Descripcion" type={InputType.Text} small />
                      )}
                    />
                  </Col>
                  <Col md={2}>
                    <ButtonWithIcon
                      className="mb-3"
                      icon={faTrash}
                      small
                      variant={Variants.Danger}
                      onClick={() => { specificationRemove(index); }}
                    />
                  </Col>
                </Row>
              ))}
              <ButtonWithIcon icon={faPlus} label="Agregar" variant={Variants.Info} onClick={() => specificationAppend(SPECIFICATIONS_FORM_EMPTY)} small />
              <hr />
              <h6>Variantes</h6>
              <hr />
              {variantsFields.map((items, index) => (
                <Row key={items.id} className="d-flex align-items-end">
                  <Col>
                    <Controller
                      name={`variants.${index}.barCode`}
                      control={control}
                      render={({ field }) => (
                        <FormInput {...field} label="Cod. Barra" type={InputType.Text} small />
                      )}
                    />

                  </Col>
                  <Col>
                    <Controller
                      name={`variants.${index}.color`}
                      control={control}
                      render={({ field }) => (
                        <FormInput {...field} label="Color" type={InputType.Text} small />
                      )}
                    />

                  </Col>
                  <Col>
                    <Controller
                      name={`variants.${index}.stock`}
                      control={control}
                      render={({ field }) => (
                        <FormInput {...field} label="Stock" type={InputType.Number} small />
                      )}
                    />

                  </Col>
                  <Col md={2}>
                    <ButtonWithIcon
                      icon={faTrash}
                      variant={Variants.Danger}
                      onClick={() => { variantsRemove(index); }}
                      className="mb-3"
                      small
                    />
                  </Col>

                </Row>
              ))}
              <ButtonWithIcon icon={faPlus} label="Agregar" variant={Variants.Info} onClick={() => variantsAppend(VARIANTS_FORM_EMPTY)} small />

            </Col>
          </Row>
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
