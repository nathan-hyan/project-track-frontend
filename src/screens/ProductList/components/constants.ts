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

export enum SearchType {
  'BAR_CODE',
  'PRODUCT_ID',
}
