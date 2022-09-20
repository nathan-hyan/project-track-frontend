import { Container } from 'react-bootstrap';
import NavigationBar from 'components/NavigationBar';
import { ProductProvider } from 'context/products/ProductContext';
// import ProductList from 'screens/ProductList/ProductList';
import { login } from 'services/authorization';
import { useEffect } from 'react';
import Notifications from 'react-notify-toast';
import SplitCart from 'screens/SplitCart';
import { CartProvider } from 'context/cart/CartContext';

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
        <Container fluid>
          <NavigationBar />
          <main>
            {/* <ProductList /> */}
            <SplitCart />
          </main>
        </Container>
        </CartProvider>
      </ProductProvider>
    </>
  );
}

export default App;
