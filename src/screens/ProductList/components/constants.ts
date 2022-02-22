import { InputType } from 'components/FormInput';

export type ProductInputName =
  | '_id'
  | 'name'
  | 'internalId'
  | 'price'
  | 'cost'
  | 'stock'
  | 'category'
  | 'image'
  | 'barcode'
  | 'storeBranch'
  | 'storeId';

interface ProductForm {
  id: number;
  label: string;
  name: ProductInputName;
  type: InputType;
}

export const PRODUCT_FORM: ProductForm[] = [
  {
    id: 0,
    label: 'Nombre del producto',
    name: 'name',
    type: InputType.Text,
  },
  {
    id: 1,
    label: 'Precio',
    name: 'price',
    type: InputType.Number,
  },
  {
    id: 2,
    label: 'Costo',
    name: 'cost',
    type: InputType.Number,
  },
  {
    id: 3,
    label: 'Stock',
    name: 'stock',
    type: InputType.Number,
  },
  {
    id: 4,
    label: 'Código de barras',
    name: 'barcode',
    type: InputType.Text,
  },
];
