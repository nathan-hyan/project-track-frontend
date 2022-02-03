import { Container } from 'react-bootstrap';
import NavigationBar from 'components/NavigationBar';
import { ProductProvider } from 'context/products/ProductContext';
import ProductList from 'screens/ProductList/ProductList';
import { login } from 'services/authorization';
import { useEffect } from 'react';
import Notifications from 'react-notify-toast';

function App() {
  useEffect(() => {
    login(12345678, 'asd123123');
  }, []);

  return (
    <>
      <Notifications />
      <ProductProvider>
        <Container fluid>
          <NavigationBar />
          <main>
            <ProductList />
          </main>
        </Container>
      </ProductProvider>
    </>
  );
}

export default App;
