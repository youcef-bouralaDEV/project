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
    <div className="p-2">
      <div>
        <label className="font-bold text-lg text-gray-700 hover:text-orange-400">
        CATÉGORIES
        </label>
        <div className="mt-3">
          {categories.map((category) => (
            <div className="pl-2 text-gray-800 hover:text-gray-500" key={category.id}>
              <input
                type="checkbox"
                id={`category-${category.id}`}
                name="category"
                value={category.id}
                checked={selectedCategory == category.id}
                onChange={handleChanges}
                className="mr-2"
              />
              <label htmlFor={`category-${category.id}`}>{category.name}</label>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-2">
        <label className="font-bold text-lg text-gray-700 hover:text-orange-400">
          MARK
        </label>
        <div className="mt-3">
          {marks.map((mark) => (
            <div className="pl-2 text-gray-800 hover:text-gray-500" key={mark.id}>
              <input
                type="checkbox"
                id={`mark-${mark.id}`}
                name="mark"
                value={mark.id}
                checked={selectedMark == mark.id}
                onChange={handleChanges}
                className="mr-2"
              />
              <label htmlFor={`mark-${mark.id}`}>{mark.name}</label>
            </div>
          ))}
        </div>
      </div>
      <div className="my-5 ">
  <label className="font-bold text-lg text-gray-700 hover:text-orange-400">
    Prix:
  </label>
  <div className="mt-3 flex flex-col pr-8">
    <div className="flex-1 ">
      <label htmlFor="minPrice" className="block text-sm font-medium text-gray-500">
        Min Price: {minPrice} 
        <span className="text-xs font-bold text-orange-500 ml-1">DZD</span>
      </label>
      <input
        type="range"
        id="minPrice"
        name="minPrice"
        value={minPrice}
        onChange={handleChanges}
        min={0}
        max={2000}
        className="block w-full mt-1 bg-gray-300  border-transparent rounded-md shadow-sm appearance-none focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-orange-500"
      />
    </div>
    <div className="flex-1 ">
      <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-500">
        Max Price: {maxPrice}
        <span className="text-xs font-bold text-orange-500 ml-1">DZD</span>

      </label>
      <input
        type="range"
        id="maxPrice"
        name="maxPrice"
        value={maxPrice}
        onChange={handleChanges}
        min={2000}
        max={10000}
        step={100}
        className="block w-full mt-1 bg-gray-300 dark:bg-gray-800 border-transparent rounded-md shadow-sm appearance-none focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-orange-500"
      />
    </div>
  </div>
</div>


      <button className=" bg-orange-600 px-16 text-white m-auto ml-5 mt-20 py-1.5 rounded hover:text-white" onClick={clearFilters}>clearFilters</button>
    </div>
  );
};

export default ClientFiltration;
