import { useEffect, useState } from 'react';
import Notifications from 'react-notify-toast';
import { Container } from 'react-bootstrap';
import NavigationBar from 'components/Cart/NavigationBar';
import { CartProvider } from 'context/cart/CartContext';
import { ProductProvider } from 'context/products/ProductContext';
import ProductList from 'screens/ProductList/ProductList';
import { login } from 'services/authorization';
import Cart from 'components/Cart';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(true)

  useEffect(() => {
    login(12345678, 'asd123123');
  }, []);

  const handleToggleCart = () => {
    setIsCartOpen(prevState => !prevState);
  }

  return (
    <>
      <Notifications /> 
      <CartProvider>
        <ProductProvider>
          <Container fluid>
            <NavigationBar toggleCart={handleToggleCart}/>
             <Cart onClose={handleToggleCart} isCartOpen={isCartOpen}/>
            <main>
              <ProductList />
            </main>
          </Container>
        </ProductProvider>
      </CartProvider>
    </>
  );
}

export default App;
