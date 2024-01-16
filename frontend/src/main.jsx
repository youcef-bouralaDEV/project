import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./style/style.css";
import { AppProvider } from "./context/Context.jsx";
import { ProductProvider } from "./context/ProductContext.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <ProductProvider>
        <App />
      </ProductProvider>
    </AppProvider>
  </React.StrictMode>
);
