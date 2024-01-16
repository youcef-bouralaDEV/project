import axios from "../axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("Access"));
  const [clients, setClients] = useState(null);
  const [loading, setLoading] = useState(false);
  

 
  useEffect(() => {
    getClients();
    GetUser();
  }, []);
  const getClients = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/GetClients");

      setClients(response.data);

      // console.log(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const GetUser = async () => {
    try {
      let response = await axios.get("/GetUser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(user?.role);

  const saveToken = (token) => {
    setToken(token);

    if (token) {
      localStorage.setItem("Access", token);
    } else {
      localStorage.removeItem("Access");
    }
  };

  // console.log(marks);
  return (
    <AuthContext.Provider
      value={{
        token,
        clients,
        loading,
        user,
        setRole,
        getClients,
        saveToken,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useGlobelContext = () => useContext(AuthContext);
