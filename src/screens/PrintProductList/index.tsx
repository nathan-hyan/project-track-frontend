import { useContext, useEffect, useRef } from 'react';
import { Container, Table } from 'react-bootstrap';
import { useReactToPrint } from 'react-to-print';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { Variants } from 'constants/bootstrapVariants';
import { MESSAGES } from 'constants/notify';
import ProductContext from 'context/products/ProductContext';
import { ProductActions } from 'interfaces/product';
import { getProducts } from 'services/products';

import ButtonWithIcon from 'components/ButtonWithIcon';
import LoadingSpinner from 'components/LoadingSpinner';

function PrintProductList() {
  const {
    state: {
      products, loading, sort, searchQuery,
    }, dispatch,
  } = useContext(ProductContext);
  const tableRef = useRef(null);

  useEffect(() => {
    if (products?.length !== 0 || !!searchQuery) {
      return;
    } dispatch({
      type: ProductActions.SET_LOADING,
    });

    getProducts(sort || '').then(({ data: { response: productData } }) => dispatch({
      type: ProductActions.GET_ALL,
      payload: { productData },
    })).catch(() => {
      dispatch({
        type: ProductActions.SET_ERROR,
        payload: { error: MESSAGES.error.productsCantBeFetched },
      });
    });
  }, [dispatch, sort]);

  const handlePrint = useReactToPrint({
    content: () => tableRef.current,
  });

  if (loading) {
    return (
      <Container className="center-in-screen">
        <LoadingSpinner />
      </Container>
    );
  }

  return (
    <Container className="mt-5 pt-3">
      <div className="p-3 border rounded mb-3">
        <ButtonWithIcon label="Imprimir" icon={faPrint} variant={Variants.Primary} onClick={handlePrint} />
      </div>

      <Table bordered size="sm" ref={tableRef}>
        <thead>
          <tr>
            <th>Cód. Interno</th>
            <th>Nombre de producto</th>
            <th>Precio de lista</th>
            <th>Precio de contado</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <tr>
              <td>{product.internalId}</td>
              <td>{product.name}</td>
              <td align="right">
                $
                {product.price.list.toFixed(2)}
              </td>
              <td align="right">
                $
                {product.price.cash.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
export default PrintProductList;
