import Checkout from 'screens/Checkout';
import ErrorMessage from 'screens/ErrorMessage';
import ProductList from 'screens/ProductList/ProductList';
import SplitCart from 'screens/SplitCart';

export const routes = [
  {
    path: '/',
    name: 'Lista de productos',
    element: <ProductList />,
    errorElement: <ErrorMessage />,
  },
  {
    path: '/cart',
    name: 'Carrito',
    element: <SplitCart />,
    errorElement: <ErrorMessage />,
  },
  {
    path: '/checkout',
    name: 'Verificar compra',
    hideFromNavbar: true,
    element: <Checkout />,
    errorElement: <ErrorMessage />,
  },
];
