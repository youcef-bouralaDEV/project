import { createBrowserRouter, Navigate } from "react-router-dom";
import GuestLayout from "./components/GuestLayout.jsx";
import NotFound from "./pages/NotFound.jsx";
import Home from "./pages/admin/Home.jsx";
import Dashboardview from "./pages/admin/NavBar.jsx";
import AdminLogin from "./pages/admin/adminAuth/AdminLogin.jsx";
import Client from "./pages/admin/adminPanel/client/Client.jsx";
import ClientDashBoard from "./pages/client-Side/pages/ClientDashBoard.jsx";
import ClientLogin from "./pages/client-Side/pages/ClientLogin.jsx";
import UserForm from "./pages/admin/adminPanel/client/UserForm.jsx";
import ProductHome from "./pages/admin/adminPanel/product/ProductHome.jsx";
import ProductForm from "./pages/admin/adminPanel/product/ProductForm.jsx";
import ProductView from "./pages/admin/adminPanel/product/ProductDetails.jsx";
import AdminLayout from "./components/AdminLayout.jsx";
import ClientLayout from "./components/ClientLayout.jsx";
import ViewCategory from "./pages/admin/adminPanel/category/ViewCategory.jsx";
import ProductCardDetails from "./pages/client-Side/pages/productCardDetails.jsx";
import ClientDetailsView from "./pages/admin/adminPanel/client/ClientDetailsView.jsx";

const router = createBrowserRouter([
  {
    path: "admin",
    element: <AdminLayout />,
    children: [
      {
        path: "home",
        element: <Home />,
      },

      {
        path: "client",
        element: <Client />,
      },
      {
        path: "client/create",
        element: <UserForm />,
      },
      {
        path: "client/:id",
        element: <UserForm />,
      },
      {
        path: "client/clientDetailsView/:id",
        element: <ClientDetailsView />,
      },
      {
        path: "product",
        element: <ProductHome />,
      },
      {
        path: "product/create",
        element: <ProductForm />,
      },
      {
        path: "product/:id",
        element: <ProductForm />,
      },

      {
        path: "product/view/:id",
        element: <ProductView />,
      },
      {
        path: "category",
        element: <ViewCategory />,
      },
    ],
  },

  {
    path: "/client",
    element: <ClientLayout />,
    children: [
      {
        path: "home",
        element: <ClientDashBoard />,
      },
      {
        path: "productCardDetails/:id",
        element: <ProductCardDetails />,
      },
    ],
  },

  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "/adminlogin",
        element: <AdminLogin />,
      },
      {
        path: "/clientlogin",
        element: <ClientLogin />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
