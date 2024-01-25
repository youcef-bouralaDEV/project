import axios from "../../../../axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useProductContext } from "../../../../context/ProductContext";

export default function ProductHome() {
  const {
    products,
    handleChanges,
    handleFilterClick,
    filtredProducts,
    loading,
    searchName,
    searchByCode,
    searchByRef,
    searchByEtat,
    getProducts,
    selectedCategory,
    selectedMark,
    categories,
    marks,
    clearFilters
  } = useProductContext();
  // console.log(filtredProducts);
  const deleteProduct = (id) => {
    console.log(id);
    try {
      axios.delete("deleteProduct/" + id);
      getProducts();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="py-5">
      <div className="max-w-screen-md mx-auto p-4 border border-gray-300">
        <form>
          {/* First Line */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="col-span-1">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category:
              </label>
              <select
                id="category"
                name="category"
                value={selectedCategory}
                onChange={handleChanges}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              >
                {/* Options for Category */}
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-1">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name:
              </label>
              <input
                onChange={handleChanges}
                value={searchName}
                type="text"
                id="name"
                name="name"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
          </div>

          {/* Second Line */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="col-span-1">
              <label
                htmlFor="mark"
                className="block text-sm font-medium text-gray-700"
              >
                Mark:
              </label>
              <select
                value={selectedMark}
                onChange={handleChanges}
                id="mark"
                name="mark"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              >
                {/* Options for Mark */}
                <option value="">Select Mark</option>
                {marks.map((mark) => (
                  <option key={mark.id} value={mark.id}>
                    {mark.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-1">
              <label
                htmlFor="code"
                className="block text-sm font-medium text-gray-700"
              >
                Code:
              </label>
              <input
                value={searchByCode}
                onChange={handleChanges}
                type="text"
                id="code"
                name="code"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
          </div>

          {/* Third Line */}
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1">
              <label
                htmlFor="etat"
                className="block text-sm font-medium text-gray-700"
              >
                Etat:
              </label>
              <select
                value={searchByEtat}
                onChange={handleChanges}
                name="etat"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              >
                <option value="">Select Etat</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div className="col-span-1">
              <label
                htmlFor="ref"
                className="block text-sm font-medium text-gray-700"
              >
                Ref:
              </label>
              <input
                value={searchByRef}
                onChange={handleChanges}
                type="text"
                id="ref"
                name="ref"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-4 flex justify-between">
            <button
              onClick={handleFilterClick}
              type="button"
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              Filter Products
            </button>
            <button
              onClick={clearFilters}
              type="button"
              className="bg-red-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              clearFilters
            </button>
          </div>
        </form>
      </div>

      <div className="relative overflow-x-auto p-6 my-5 shadow-md   sm:rounded-lg ">
        <Link to={"create"}>
          <button className="rounded bg-green-700 p-2 mb-1">Add New</button>
        </Link>
        <table className="w-full text-sm text-left rtl:text-right  text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Image
              </th>
              <th scope="col" className="px-6 py-3">
                Désignation
              </th>
              <th scope="col" className="px-6 py-3">
                Mark
              </th>
              <th scope="col" className="px-6 py-3">
                Etat
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="text-xl w-full text-center font-bold">
                  ...loading
                </td>
              </tr>
            ) : filtredProducts.length > 0 ? (
              filtredProducts.map((product) => {
                return (
                  <tr
                    key={product.id}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-4 py-3 w-[100px] font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <img
                        className="max-w-full  "
                        src={product.images}
                        alt=""
                      />
                    </th>

                    <td>
                      <div>
                        {product.nom}
                        <div>{`category : ${product.category.name}`}</div>
                        <div>{`code : ${product.code}`}</div>
                        <div>{`ref :${product.ref}`}</div>
                      </div>
                    </td>

                    <td className="px-6 py-4">{product.mark.name}</td>
                    <td className="px-6 py-4">{product.etat}</td>
                    <td className="px-6 py-4">
                      <Link
                        to={"/admin/product/" + product.id}
                        className="font-medium text-white bg-blue-600  p-2 rounded hover:underline mr-2"
                      >
                        Edit
                      </Link>

                      <Link
                        to={"/admin/product/view/" + product.id}
                        className="font-medium text-white bg-blue-600  p-2 rounded hover:underline mr-2"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="font-medium text-white bg-red-600 p-2 rounded hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="4">No product available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
