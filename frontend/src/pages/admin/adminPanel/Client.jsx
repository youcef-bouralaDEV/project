import axios from "../../../axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGlobelContext } from "../../../Context";

export default function Client() {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    setLoading(true);
    try {
      axios.get("/users").then(({ data }) => {
        let userRole = (data.data[0].roles).toString() ;
        if(userRole === 'user'){

          setUser(data.data);
        }
        console.log((data.data[1].roles).toString());
        setLoading(false);
      });
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const deleteUser = (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }
    try {
      axios.delete(`/users/ ${id}`);
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
              <td colSpan="4">Loading...</td>
            </tr>
          ) : user && user.length > 0 ? (
            user.map(({ user_id: id, name, email }, index) => (
              <tr
                key={index}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {id}
                </th>
                <td className="px-6 py-4"> {name}</td>
                <td className="px-6 py-4"> {email}</td>
                <td className="px-6 py-4">
                  <Link
                    to={"/admin/client/" + id}
                    className="font-medium text-white bg-blue-600  p-2 rounded hover:underline mr-2"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => deleteUser(id)}
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
