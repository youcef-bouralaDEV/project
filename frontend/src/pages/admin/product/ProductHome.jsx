import { data } from "autoprefixer";
import axios from "../../../axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ProductHome() {
  const [loading, setLaoading] = useState(false);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      let response = await axios.get("/getProducts");
      console.log(response.data);
      setProducts(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="relative overflow-x-auto p-6 my-5 shadow-md  bg-blue-100 sm:rounded-lg ">
    <Link to={"create"}>
      <button className="rounded bg-green-700 p-2 mb-1">Add New</button>
    </Link>
    <table className="w-full text-sm text-left rtl:text-right  text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
        <th scope="col" className="px-6 py-3">
            Image
          </th> <th scope="col" className="px-6 py-3">
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
        ) : (
          products && (
            products.map((product) => {
              const { nom: name , category_id: category } = product;
              return (
                <tr
                  key={product.id}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                    <div className="text-gray-400 text-sm font-[500]">{name}</div>
                    <div>{`category : ${category}`}</div>
                    <div >{`code : ${product.code}`}</div>
                    <div>{`ref :${product.ref}`}</div>
                  </th>
                  <td className="px-6 py-4">{product.type_id}</td>
                  <td className="px-6 py-4">{product.etat}</td>
                  <td className="px-6 py-4">
                    <Link
                      //   to={"/admin/client/" + u.id}
                      className="font-medium text-white bg-blue-600  p-2 rounded hover:underline mr-2"
                    >
                      Edit
                    </Link>
                    <Link
                      //   to={"/admin/client/" + u.id}
                      className="font-medium text-white bg-blue-600  p-2 rounded hover:underline mr-2"
                    >
                      View
                    </Link>
                    <button className="font-medium text-white bg-red-600 p-2 rounded hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          )
        )}
  
        <tr>
          <td colSpan="4">No users available</td>
        </tr>
      </tbody>
    </table>
  </div>
  
  );
}
