import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AppProvider = ({ children }) => {
  const [role, setRole] = useState("");
  const [token, setToken] = useState(localStorage.getItem("Access"));

  console.log("role", role);
  console.log("token", token);
  
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
