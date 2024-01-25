import { Link } from "react-router-dom";
import axios from "../../../../axios";
import React, { useEffect, useState } from "react";

export default function ViewCategory() {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get(`getCategory`).then((res) => {
      if (res.data.status === 200) {
        console.log(res.data.categories);
        setCategories(res.data.categories);
        setLoading(false);
      } else if (res.data.status === 400) {
        console.log("Warning", res.data.message, " ");
      } else if (res.data.status === 404) {
        console.log("Warning", res.data.message, "error");
      }
    });
  },[]);
  return (
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
              Nom
            </th>
            <th scope="col" className="px-6 py-3">
              Icon
            </th>
            <th scope="col" className="px-6 py-3">
              etat
            </th>
            <th scope="col" className="px-6 py-3">
              categorie mere
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
          ) : categories.length>0 ? (
            categories[0].map((category) => {
            
              return (
                <tr
                  key={category.id}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-4 py-3 w-[100px] font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    <img className="max-w-full  " src="" alt="" />
                  </th>

                  <td>{category.name}</td>

                  <td className="px-6 py-4">{category.order}</td>
                  <td className="px-6 py-4">{category.etat}</td>
                  <td className="px-6 py-4">{category.catégorie_mére}</td>
                  <td className="px-6 py-4">
                    <Link
                      to={"/admin/category/" + category.id}
                      className="font-medium text-white bg-blue-600  p-2 rounded hover:underline mr-2"
                    >
                      Edit
                    </Link>

                    <Link
                      to={"/admin/category/view/" + category.id}
                      className="font-medium text-white bg-blue-600  p-2 rounded hover:underline mr-2"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => deletecategory(category.id)}
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
              <td colSpan="4">No category available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
