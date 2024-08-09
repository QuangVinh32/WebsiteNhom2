import { ReactNode, createContext, useContext, useState } from "react";

const ProductContext = createContext<any>({} as any);

const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [searchText, setSearchText] = useState("");

  const handleSearchTextChange = (event: any) => {
    setSearchText(event.target.value);
  };

  return (
    <ProductContext.Provider value={{ searchText, handleSearchTextChange }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const productContext = useContext(ProductContext);
  return productContext;
};

export default ProductProvider;
