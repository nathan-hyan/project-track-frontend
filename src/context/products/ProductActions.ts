import { Product } from 'interfaces/product';
import { SearchType } from 'screens/ProductList/components/constants';

export const filterProducts = (
  productList: Product[],
  searchQuery: string,
  searchType: SearchType,
) => {
  const filteredProductList = productList.filter((product) => {
    if (searchType === SearchType.PRODUCT_ID) {
      return product.name.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return product.barcode.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return filteredProductList;
};
