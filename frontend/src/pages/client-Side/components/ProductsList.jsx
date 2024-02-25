import React, { useState } from "react";
import { useProductContext } from "../../../context/ProductContext";
import ProductCard from "./ProductCard";

export default function ProductsList() {
  const { loading, filtredProducts } = useProductContext();

  // products.map(p=>console.log(p.images))
  return (
    <div className="flex justify-center flex-wrap gap-2  mx-1 py-3 md:px-0">
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
