import { Container } from 'react-bootstrap';
import NavigationBar from 'components/NavigationBar';
import { ProductProvider } from 'context/products/ProductContext';
import ProductList from 'screens/ProductList/ProductList';

function App() {
  return (
    <ProductProvider>
      <Container fluid>
        <NavigationBar />
        <main>
          <ProductList />
        </main>
      </Container>
    </ProductProvider>
  );
}

export default App;
