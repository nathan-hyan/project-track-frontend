import { faCartShopping, faListSquares, faPrint } from '@fortawesome/free-solid-svg-icons';
import Checkout from 'screens/Checkout';
import ErrorMessage from 'screens/ErrorMessage';
import Menu from 'screens/Menu';
import PrintProductList from 'screens/PrintProductList';
import ProductList from 'screens/ProductList/';
import SplitCart from 'screens/SplitCart';

export const routes = [
  {
    path: '/',
    name: 'Lista de productos',
    icon: faListSquares,
    element: <ProductList />,
    errorElement: <ErrorMessage />,
  },
  {
    path: '/cart',
    name: 'Carrito',
    icon: faCartShopping,
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
  {
    path: '/printProductList',
    name: 'Imprimir listado de productos',
    icon: faPrint,
    hideFromNavbar: false,
    element: <PrintProductList />,
    errorElement: <ErrorMessage />,
  },
  {
    path: '/menu',
    name: 'Mostrar menú',
    hideFromNavbar: false,
    element: <Menu />,
    errorElement: <ErrorMessage />,
  },
  {
    path: '/*',
    name: 'Página no encontrada',
    hideFromNavbar: true,
    element: <ErrorMessage />,
  },
];
