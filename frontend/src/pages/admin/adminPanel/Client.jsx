import axios from "../../../axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGlobelContext } from "../../../Context";

export default function Client() {
  const { getUser,user, loading } = useGlobelContext();

  useEffect(() => {
    getUser();
  }, []);

console.log(user);
  const deleteUser = (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }
    try {
      axios.delete(`deleteClient/${id}`);
    } catch (err) {
      console.log(err);
    }
    getUser();
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
              Id
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              email
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td className="text-xl w-full text-center font-bold">...loading</td>
            </tr>
          ) : user && user.length > 0 ? (
            user.map((u) => (
              <tr
                key={u.id}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {u.id}
                </th>
                <td className="px-6 py-4"> {u.name}</td>
                <td className="px-6 py-4"> {u.email}</td>
                <td className="px-6 py-4">
                  <Link
                    to={"/admin/client/" + u.id}
                    className="font-medium text-white bg-blue-600  p-2 rounded hover:underline mr-2"
                  >
                    Edit
                  </Link>
                  <Link
                    to={"/admin/client/" + u.id}
                    className="font-medium text-white bg-blue-600  p-2 rounded hover:underline mr-2"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => deleteUser(u.id)}
                    className="font-medium text-white bg-red-600 p-2 rounded hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No users available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
