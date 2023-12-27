import { createBrowserRouter, Navigate } from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout.jsx";
import GuestLayout from "./components/GuestLayout.jsx";
import NotFound from "./pages/NotFound.jsx";
import Home from "./pages/admin/Home.jsx";
import Dashboardview from "./pages/admin/Dashboardview.jsx";
import AdminLogin from "./pages/admin/adminAuth/AdminLogin.jsx";
import Client from "./pages/admin/adminPanel/Client.jsx";
import ClientDashBoard from "./pages/client-Side/ClientDashBoard.jsx";
import ClientLogin from "./pages/client-Side/ClientLogin.jsx";
import UserForm from "./pages/admin/adminPanel/UserForm.jsx";
import ProductHome from "./pages/admin/product/ProductHome.jsx";
import ProductForm from "./pages/admin/product/ProductForm.jsx";
import ProductView from "./pages/admin/product/ProductView.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "admin/home",
        element: <Home />,
      },
      {
        path: "client/home",
        element: <ClientDashBoard/>,
      },
      {
        path: "admin/client",
        element: <Client />,
      },
      {
        path: "admin/client/create",
        element: <UserForm />,
      },
      {
        path: "admin/client/:id",
        element: <UserForm/>,
      },
      {
        path: "admin/product",
        element: <ProductHome/>,
      },
      {
        path: "admin/product/create",
        element: <ProductForm/>,
      },
      {
        path: "admin/product/:id",
        element: <ProductForm/>,
      },
      {
        path: "admin/product/view/:id",
        element: <ProductView/>,
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
