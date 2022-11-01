import { Route, BrowserRouter, Routes } from 'react-router-dom';
import NavigationBar from 'components/NavigationBar';
import { ProductProvider } from 'context/products/ProductContext';
import { login } from 'services/authorization';
import { useEffect } from 'react';
import Notifications from 'react-notify-toast';
import { CartProvider } from 'context/cart/CartContext';
import { routes } from 'config/routes';
import ErrorMessage from 'screens/ErrorMessage';

function App() {
  /*
  During the test phase of the app, a login
  would not be necessary, so hardcoding this
  isn't that dangerous... yet.
  

  TODO: Create routing
  TODO: Link all the different screens with react-router-dom
  */

  useEffect(() => {
    login(12345678, 'asd123123');
  }, []);

  return (
    <>
      <Notifications />
      <ProductProvider>
        <CartProvider>
          <BrowserRouter>
            <NavigationBar />
            <Routes>
              {routes.map((route) => (
                <Route
                  path={route.path}
                  element={route.element}
                  errorElement={<ErrorMessage />}
                />
              ))}
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </ProductProvider>
    </>
  );
}

export default App;
