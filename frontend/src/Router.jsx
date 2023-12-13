import { createBrowserRouter, Navigate } from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout.jsx";
import GuestLayout from "./components/GuestLayout.jsx";
import NotFound from "./pages/NotFound.jsx";
import Home from "./pages/admin/Home.jsx";
import Dashboardview from "./pages/admin/Dashboardview.jsx";
import AdminLogin from "./pages/admin/adminAuth/AdminLogin.jsx";
import Client from "./pages/admin/adminPanel/Client.jsx";
import UserForm from "./pages/admin/adminPanel/userForm.jsx";
import ClientDashBoard from "./pages/client-Side/ClientDashBoard.jsx";
import ClientLogin from "./pages/client-Side/ClientLogin.jsx";

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
        path: "client/home",
        element: <ClientDashBoard/>,
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
