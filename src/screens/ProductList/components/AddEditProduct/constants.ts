import { InputType } from 'components/FormInput';

export type ProductInputName =
  | '_id'
  | 'name'
  | 'internalId'
  | 'stock'
  | 'category'
  | 'image'
  | 'barcode'
  | 'storeBranch'
  | 'storeId';

export type PriceInputName = 'cost' | 'list' | 'onlineStore' | 'cash';

export type LocalFormInputName =
  | 'brand'
  | 'businessOwner'
  | 'weight'
  | 'storeBranch'
  | 'storePosition';

export type DimensionsInputName = 'width' | 'height' | 'depth';

export type DescriptionInputName = 'title' | 'description';

export type VariantsInputName = 'color' | 'barcode' | 'stock';

interface Form<T> {
  id: number;
  label: string;
  name: T;
  type: InputType;
}

export const PRODUCT_FORM: Form<ProductInputName>[] = [
  {
    id: 0,
    label: 'Nombre del producto',
    name: 'name',
    type: InputType.Text,
  },
  {
    id: 1,
    label: 'Stock',
    name: 'stock',
    type: InputType.Number,
  },
  {
    id: 2,
    label: 'Código de barras',
    name: 'barcode',
    type: InputType.Text,
  },
];

export const PRICE_FORM: Form<PriceInputName>[] = [
  {
    id: 1,
    label: 'Precio de costo',
    name: 'cost',
    type: InputType.Number,
  },
  {
    id: 2,
    label: 'Precio de lista',
    name: 'list',
    type: InputType.Number,
  },
  {
    id: 3,
    label: 'Precio online',
    name: 'onlineStore',
    type: InputType.Number,
  },
  {
    id: 4,
    label: 'Precio de contado',
    name: 'cash',
    type: InputType.Number,
  },
];

export const LOCAL_INFO_FORM: Form<LocalFormInputName>[] = [
  {
    id: 1,
    label: 'Marca',
    name: 'brand',
    type: InputType.Text,
  },
  {
    id: 2,
    label: 'Dueño de negocio',
    name: 'businessOwner',
    type: InputType.Text,
  },
  {
    id: 4,
    label: 'Sucursal',
    name: 'storeBranch',
    type: InputType.Text,
  },
  {
    id: 5,
    label: 'Ubicación dentro de sucursal',
    name: 'storePosition',
    type: InputType.Text,
  },
  {
    id: 6,
    label: 'Peso (kg)',
    name: 'weight',
    type: InputType.Number,
  },
];

export const DIMENSIONS_FORM: Form<DimensionsInputName>[] = [
  {
    id: 1,
    label: 'Altura',
    name: 'height',
    type: InputType.Number,
  },
  {
    id: 2,
    label: 'Ancho',
    name: 'width',
    type: InputType.Number,
  },
  {
    id: 3,
    label: 'Largo',
    name: 'depth',
    type: InputType.Number,
  },
];

export const SPECIFICATIONS_FORM: Form<DescriptionInputName>[] = [
  {
    id: 1,
    label: 'Titulo',
    name: 'title',
    type: InputType.Text,
  },
  {
    id: 2,
    label: 'Descripcion',
    name: 'description',
    type: InputType.Text,
  },
];

export const VARIANTS_FORM: Form<VariantsInputName>[] = [
  {
    id: 1,
    label: 'Color',
    name: 'color',
    type: InputType.Text,
  },
  {
    id: 2,
    label: 'Barcode',
    name: 'barcode',
    type: InputType.Text,
  },
  {
    id: 3,
    label: 'Stock',
    name: 'stock',
    type: InputType.Number,
  },
];

export const SPECIFICATIONS_FORM_EMPTY = {
  title: '',
  description: '',
};

export const VARIANTS_FORM_EMPTY = {
  color: '',
  barCode: '',
  stock: 0,
};

export const PROVIDER_PRODUCT_CODE_FORM_EMPTY = {
  id: 0,
  name: '',
};

export enum SearchType {
  'BAR_CODE',
  'PRODUCT_ID',
}
