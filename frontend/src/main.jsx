import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./style/style.css";
import { AppProvider } from "./context/Context.jsx";
import { ProductProvider } from "./context/ProductContext.jsx";
import { ProductQuantityProvider } from "./context/ProductQuantityContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(

    <AppProvider>
      <ProductProvider>
        <ProductQuantityProvider>
          <App />
        </ProductQuantityProvider>
      </ProductProvider>
    </AppProvider>
  
);
