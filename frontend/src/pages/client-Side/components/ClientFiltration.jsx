// ClientFiltration.js
import React, { useEffect } from "react";
import { useProductContext } from "../../../context/ProductContext";

const ClientFiltration = () => {
  const {
    categories,
    marks,
    handleChanges,
    handleFilterClick,
    selectedCategory,
    selectedMark,
    minPrice,
    maxPrice,
    clearFilters,
  } = useProductContext();

  useEffect(() => {
    handleFilterClick();
  }, [selectedCategory, selectedMark, minPrice, maxPrice]);

  return (
    <>
    <div>
      <h2>Client Filtration</h2>
      <div>
        <label>Categories:</label>
        {categories.map((category) => (
          <div key={category.id}>
            <input
              type="checkbox"
              id={`category-${category.id}`}
              name="category"
              value={category.id}
              checked={selectedCategory == category.id}
              onChange={handleChanges}
            />
            <label htmlFor={`category-${category.id}`}>{category.name}</label>
          </div>
        ))}
      </div>
      <div>
        <label>Marks:</label>
        {marks.map((mark) => (
          <div key={mark.id}>
            <input
              type="checkbox"
              id={`mark-${mark.id}`}
              name="mark"
              value={mark.id}
              checked={selectedMark == mark.id}
              onChange={handleChanges}
            />
            <label htmlFor={`mark-${mark.id}`}>{mark.name}</label>
          </div>
        ))}
      </div>
      <div>
        <label htmlFor="minPrice">Min Price:</label>
        <input
          type="range"
          id="minPrice"
          name="minPrice"
          value={minPrice}
          onChange={handleChanges}
        />
      </div>
      <div>
        <label htmlFor="maxPrice">Max Price:</label>
        <input
          type="range"
          id="maxPrice"
          name="maxPrice"
          value={maxPrice}
          onChange={handleChanges}
          max={2000}
        />
      </div>
    </div>
    <button onClick={clearFilters}>clearFilters</button>
    </>
  );
};

export default ClientFiltration;
