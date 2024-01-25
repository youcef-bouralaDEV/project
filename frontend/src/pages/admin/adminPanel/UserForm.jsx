import {useNavigate, useParams } from "react-router-dom";
import axios from "../../../axios";
import React, { useEffect, useState } from "react";


export default function UserForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [Update, setUpdate] = useState({
    id: null,
    name: "",
    username: "",
    lastname: "",
    email: "",
    password: "",
    adresse: "",
    raison_social: "",
    groupe: "",
    commune: "",
    wilaya: "",
  });
  console.log(id);
  useEffect(() => {
    if (id) {
      try {
        axios.get(`GetClient/${id}`).then(({ data }) => {
          setUpdate(data);
          console.log(data);
        });
      } catch (error) {
        console.log(error.response.data);
      }
    }
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (Update.id) {
      try {
        let response = await axios.put(`updateClient/${Update.id}`, Update);
        setUpdate(response.data)
        navigate("/admin/client");
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        axios.post("/CreateClient", Update).then(({ data }) => {
          setUpdate(data);
          navigate("/admin/client");
        });
      } catch (error) {
        console.log(error.response.data);
      }
     
    }
  };

// console.log(user);
  return (
    <form
      onSubmit={onSubmit}
      className="max-w-sm mx-auto  mt-10 border-2  p-10"
    >
      {Update.id ? <p>user :{Update.name}</p> : <p>New user</p>}
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
          Lastname
        </label>
        <input
          type="name"
          value={Update.lastname}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
          onChange={(e) => setUpdate({ ...Update, lastname: e.target.value })}
        />
      </div>
      <div className="mb-5">
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
          Email
        </label>
        <input
          type="email"
          value={Update.email}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
          onChange={(e) => setUpdate({ ...Update, email: e.target.value })}
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="text"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          raison_social
        </label>
        <input
          type="text"
          value={Update.raison_social}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) =>
            setUpdate({ ...Update, raison_social: e.target.value })
          }
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Adresse
        </label>
        <input
          type="name"
          value={Update.adresse}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => setUpdate({ ...Update, adresse: e.target.value })}
          required
        />
      </div>

      <div className="mb-5">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          commune
        </label>
        <input
          type="text"
          value={Update.commune}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="comune"
          onChange={(e) => setUpdate({ ...Update, commune: e.target.value })}
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="groupe"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Groupe
        </label>
        <input
          type="text"
          value={Update.groupe}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => setUpdate({ ...Update, groupe: e.target.value })}
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="groupe"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Willaya
        </label>
        <input
          type="text"
          value={Update.wilaya}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={(e) => setUpdate({ ...Update, wilaya: e.target.value })}
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
