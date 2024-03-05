import React, { createContext, useContext, useState, useEffect } from "react";


const ProductQuantityContext = createContext();

export const ProductQuantityProvider = ({ children }) => {
  const [productQuantity, setProductQuantity] = useState(1);
 

  useEffect(() => {
  
    const savedQuantities = localStorage.getItem("productQuantity");
    if (savedQuantities) {
      setProductQuantity(JSON.parse(savedQuantities));
    }
  }, []);

  const updateProductQuantity = (productId, quantity) => {
    // Update the quantity for the specific product
    const updatedQuantities = { ...productQuantity, [productId]: quantity };
    // Save the updated quantities to localStorage
    localStorage.setItem("productQuantity", JSON.stringify(updatedQuantities));
    setProductQuantity(updatedQuantities);
  };

 


  return (
    <ProductQuantityContext.Provider
      value={{ productQuantity, updateProductQuantity  }}
    >
      {children}
    </ProductQuantityContext.Provider>
  );
};

export const useProductQuantity = () => {
  return useContext(ProductQuantityContext);
};


 