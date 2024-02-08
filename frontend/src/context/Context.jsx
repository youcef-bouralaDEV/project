import axios from "../axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

export const AppProvider = ({ children }) => {
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor, setCurrentColor] = useState("#fe6d33");
  const [currentMode, setCurrentMode] = useState("Light");
  const [themeSettings, setThemeSettings] = useState(false);
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialState);

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("Access"));
  const [clients, setClients] = useState(null);
  const [loading, setLoading] = useState(false);



  //Adjust theme and color functions
  // **************************************
  const setMode = (e) => {
    setCurrentMode(e.target.value);
    localStorage.setItem("themeMode", e.target.value);
  };

  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem("colorMode", color);
  };

  const handleClick = (clicked) =>
    setIsClicked({ ...initialState, [clicked]: true });
    // **************************************
    //Adjust theme and color functions
    
    useEffect(() => {
      GetUser();
      getClients();
    }, []);

  const GetUser = async () => {
    try {
      const response = await axios.get("/GetUser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data);
      // console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(user?.role);

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
        getClients,
        saveToken,
        setToken,
        currentColor,
        currentMode,
        activeMenu,
        screenSize,
        setScreenSize,
        handleClick,
        isClicked,
        initialState,
        setIsClicked,
        setActiveMenu,
        setCurrentColor,
        setCurrentMode,
        setMode,
        setColor,
        themeSettings,
        setThemeSettings,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useGlobelContext = () => useContext(AuthContext);
