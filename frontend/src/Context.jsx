import axios from "./axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AppProvider = ({ children }) => {
  const [role, setRole] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("Access"));
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [marks, setMarks] = useState([]);

  

  useEffect(() => {
    getUser();
    getCategories();
    getMarks();
  }, []);

  const getUser = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/GetClients");
      setUser(response.data);
      console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(user);
  const saveToken = (token) => {
    setToken(token);

    if (token) {
      localStorage.setItem("Access", token);
    } else {
      localStorage.removeItem("Access");
    }
  };

  const getCategories = async () => {
    try {
      const response = await axios.get("/getCategories");
      // console.log(response.data);
      setCategories(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const getMarks = async () => {
    try {
      const response = await axios.get("/getMarks");
      // console.log(response.data);
      setMarks(response.data);
    } catch (err) {
      console.log(err);
    }
  };
console.log(marks);
  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loading,
        role,
        categories,
        marks,
        setRole,
        getUser,
        saveToken,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useGlobelContext = () => useContext(AuthContext);
