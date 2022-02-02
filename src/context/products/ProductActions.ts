import { Product } from 'interfaces/product';

export const filterProducts = (productList: Product[], searchQuery: string) => {
  const filteredProductList = productList.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return filteredProductList;
};
