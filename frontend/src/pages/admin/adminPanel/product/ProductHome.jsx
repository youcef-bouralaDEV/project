import axios from "../../../../axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useProductContext } from "../../../../context/ProductContext";
import Header from "../components/Header";
import Table from "../components/Table";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import Loading from "../../../../components/Loading";

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
    clearFilters,
  } = useProductContext();

  const columns = [
    {
      field: "name",
      headerName: "Désignation",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="flex justify-center items-center  gap-x-8 ">
            <div>
              <img
                className="w-10 h-10 rounded-full bg-cover"
                src={params.row.image || "/src/assets/skills-01.jpg"}
                alt=""
              />
            </div>
            <div className="flex flex-col p-0 mb-">
              <p>{params.row.name}</p>
              <p className="text-sm font-bold">{`Code: ${
                params.row.code || "-"
              }`}</p>
              <p className="text-sm font-bold">{`Ref: ${
                params.row.ref || "-"
              }`}</p>
            </div>
          </div>
        );
      },
    },
    {
      field: "mark",
      headerName: "Marque",
      width: 160,
      renderCell: (params) => (
        <div>{params.row.mark ? params.row.mark.name : ""}</div>
      ),
    },
    { field: "quantity", headerName: "Quantité", width: 130 },
    {
      field: "etat",
      headerName: "État",
      width: 90,
      renderCell: (params) => (
        <div
          style={{
            backgroundColor:
              params.row.etat === "Active" ? "#8bc34a" : "#FF5252",
            color: "#FFF", // White text color
            padding: "3px 5px",
            borderRadius: "4px",
            width: "58px",
          }}
        >
          {params.row.etat}
        </div>
      ),
    },
  ];
  
  const actionColumn = {
    field: "action",
    headerName: "Action",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="flex gap-3 ">
          <Link to={"/admin/product/" + params.row.id}>
            <FaRegEdit color="green" size={"1.2rem"} />
          </Link>
          <button onClick={() => deleteProduct(params.row.id)}>
            <MdDelete color="red" size={"1.2rem"} />
          </button>
        </div>
      );
    },
  };

 
 
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
    <div>
      {loading ? (
        <Loading loading={loading} />
      ) : (
        <>
          <div className="px-5 w-full">
            <div className="max-w-[85%]  mx-auto h-full">
              <Header category="Page" title="Product" />
              <div className="py-5">
                <div className="mx-auto p-4 border border-gray-300 rounded">
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
                          <option value="" className="text-red-500 italic">
                            Select Category
                          </option>
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

                <div className="relative overflow-x-auto p-6 my-5 shadow-lg   sm:rounded-lg ">
                  <div className="w-full text-center md:text-right mb-1 md:mb-5">
                    <Link
                      to={"create"}
                      className="inline-flex items-center justify-center gap-2 rounded border border-orange-500 mt-1 text-sm py-1.5 text-center font-normal text-white bg-orange-500 hover:bg-opacity-90 px-3 sm:px-6 md:px-6 lg:px-8 xl:px-6 hover:shadow-[0_3px_15px_rgba(0,0,0,0.25)]"
                    >
                      <FiPlus className="bg-white rounded-full text-orange-500" />
                      Nouveau Produit
                    </Link>
                  </div>
                  <Table
                    loading={products ? products.length : 0}
                    rows={filtredProducts}
                    columns={columns}
                    actionColumn={actionColumn}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
