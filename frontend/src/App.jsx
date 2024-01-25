import React from "react";
import router from "./Router";
import { RouterProvider } from "react-router-dom";
import './style/app.css'
const App = () => {
  return <RouterProvider router={router} />;


  
};

export default App;
