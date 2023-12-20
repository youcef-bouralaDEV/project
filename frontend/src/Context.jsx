import axios from "./axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AppProvider = ({ children }) => {
  const [role, setRole] = useState("");
  const [token, setToken] = useState(localStorage.getItem("Access"));
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  
  
  useEffect(() => {
    getUser();
  }, []);

  const getUser = async() => {
    setLoading(true)
    try {
      const response = await axios.get("/GetClients")
        setUser(response.data);
        setLoading(false);
      
    } catch (error) {
      console.log(error);
    }
  };
console.log(user);
  const saveToken = (token) => {
    setToken(token);
    console.log(token);
    if (token) {
      localStorage.setItem("Access", token);
    } else {
      localStorage.removeItem("Access");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        role,
        token,
        user,
        loading,
        setRole,
        saveToken,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useGlobelContext = () => useContext(AuthContext);
