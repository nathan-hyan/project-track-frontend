import { ChangeEvent } from 'react';
import { Card } from 'react-bootstrap';
import { SortTypes } from 'constants/products';

interface Props {
    sort: SortTypes;
    changeSort: (event: ChangeEvent<HTMLSelectElement>) => void;
}

function Sort({ sort, changeSort }: Props) {
  return (
    <Card className="mt-3 p-3 d-flex flex-row gap-3">
      <p className="m-0 p-0">Ordenar por:</p>
      <select name="sortingOrder" className="w-50" value={sort} onChange={changeSort}>
        <option value="name">Nombre alfabético</option>
        <option value="lastModified">Última modificación</option>
      </select>
    </Card>
  );
}
export default Sort;
