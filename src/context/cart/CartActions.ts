import { CartProduct } from 'interfaces/cart';
import { Product } from 'interfaces/product';

export function modifyQuantityToProduct(
  products: CartProduct[],
  id: string,
  newValue: number
) {
  let selectedProduct = products.find((product) => product.productId === id);
  const INDEX_SELECTED_PRODUCT = products.indexOf(selectedProduct!);

  if (selectedProduct) {
    selectedProduct.quantity = newValue
    products[INDEX_SELECTED_PRODUCT] = selectedProduct;
    return products;
  }
  return products;
}

export function addProductToCart(product: Product, productList: CartProduct[]) {
  const EXISTING_PRODUCT = productList.find((currentProduct) => currentProduct.productId === product._id);

  if(EXISTING_PRODUCT){
    const INDEX_SELECTED_PRODUCT = productList.indexOf(EXISTING_PRODUCT);

    productList[INDEX_SELECTED_PRODUCT].quantity = productList[INDEX_SELECTED_PRODUCT].quantity + 1

    return [...productList];
  }

  const NEW_PRODUCT: CartProduct = {
    productId: product._id || "",
    productName: product.name,
    pricePerUnit: product.cost,
    quantity: 1,
    totalPrice: product.cost
  };

  return [...productList, NEW_PRODUCT]
}