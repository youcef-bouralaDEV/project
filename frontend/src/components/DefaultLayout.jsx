import React from "react";
import { useGlobelContext } from "../Context";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import axios from "../axios";
import Dashboardview from "../pages/admin/Dashboardview";
import Sidebar from "../pages/admin/Sidebar";
import { useEffect } from "react";
import { useState } from "react";

export default function DefaultLayout() {
  const navigate = useNavigate();
  const { token, saveToken, role } = useGlobelContext();
  const [userRole, setUserRole] = useState(role);


  useEffect(() => {
   
    if (!token) {
      redirectToLogin();
    }
  }, [token]);
console.log(role);
  const redirectToLogin = () => {
console.log(role);

    if (!token && role === "admin") {
      navigate("/adminlogin");
    } else if (!token && userRole === "user") {
      navigate("/clientlogin");
    } else {
      navigate("/adminlogin");
    }
  };

  const onLogout = async (ev) => {
    ev.preventDefault();
    try {
      await axios.post("/logout");
      saveToken(null);
      if (!token && userRole === "admin") {
        navigate("/adminlogin");
      } else if (!token && userRole === "user") {
        navigate("/clientlogin");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="">
      <div className="flex overflow-scroll ">
        <div className="basis-[12%] h-[100vh]">
          <Sidebar />
        </div>
        <div className="basis-[88%] border overflow-scroll h-[100vh]">
          <Dashboardview onLogout={onLogout}  />
          <div>
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </div>
  );
}
