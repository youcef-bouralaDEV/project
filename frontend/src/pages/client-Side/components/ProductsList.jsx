import React, { useState } from "react";
import { useProductContext } from "../../../context/ProductContext";
import ProductCard from "./ProductCard";

export default function ProductsList() {

  const { products, loading ,filtredProducts } = useProductContext();

  // products.map(p=>console.log(p.images))
  return (
    <div className="flex flex-wrap gap-2 justify-centre mx-3 py-3">
      {loading ? (
        <div>
          <div className="text-xl w-full text-center font-bold">...loading</div>
        </div>
      ) : filtredProducts && filtredProducts.length > 0 ? (
        filtredProducts.map((product) => (
          
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        <div>
          <div colSpan="4">No products available</div>
        </div>
      )}
    </div>
  );
}
