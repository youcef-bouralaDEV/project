import { Navigate, useNavigate, useParams } from "react-router-dom";
import axios from "../../../axios";
import React, { useEffect, useState } from "react";

export default function UserForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [Update, setUpdate] = useState({
    id: null,
    name: "",
    prenom : "" ,
    username : "" ,
    lastname : "" ,
    email: "",
    password: "",
    addresse: "",
  });
  useEffect(() => {
    if (id) {
      console.log(id);
      try {
        axios.get("/users/" + id).then(({ data }) => {
          setUpdate(data.data);
        });
      } catch (error) {
        console.log(error.response.data);
      }
    }
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    if (Update.id) {
      try {
        axios.put("/users/" + Update.id, Update).then(({}) => {
          navigate("admin/client");
        });
      } catch (error) {
        console.log(error.response.data);
      }
    } else {
      try {
        axios.post("/users", Update).then(({ data }) => {
          setUpdate(data);
          navigate("/admin/client");
        });
      } catch (error) {
        console.log(error.response.data);
      }
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="max-w-sm mx-auto  mt-10 border-2  p-10"
    >
      <div className="mb-5">
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Name
        </label>
        <input
          type="name"
          value={Update.name}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
          onChange={(e) => setUpdate({ ...Update, name: e.target.value })}
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Prenom
        </label>
        <input
          type="name"
          value={Update.prenom}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
          onChange={(e) => setUpdate({ ...Update, prenom: e.target.value })}
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Lastname
        </label>
        <input
          type="name"
          value={Update.lastname}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
          onChange={(e) => setUpdate({ ...Update, lastname: e.target.value })}
        />
      </div> <div className="mb-5">
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Username
        </label>
        <input
          type="name"
          value={Update.username}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
          onChange={(e) => setUpdate({ ...Update, username: e.target.value })}
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          email
        </label>
        <input
          type="email"
          value={Update.email}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="name@flowbite.com"
          required
          onChange={(e) => setUpdate({ ...Update, email: e.target.value })}
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Address
        </label>
        <input
          type="name"
          value={Update.addresse}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
          onChange={(e) => setUpdate({ ...Update, addresse: e.target.value })}
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          password
        </label>
        <input
          type="password"
          value={Update.password}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
          onChange={(e) => setUpdate({ ...Update, password: e.target.value })}
        />
      </div>

      <button className="bg-green-500 text-white p-5 ">Update</button>
    </form>
  );
}
