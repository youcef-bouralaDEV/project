import React, { useEffect, useState } from "react";
import Sidebar from "../pages/client-Side/components/Sidebar";
import Navbar from "../pages/client-Side/components/Navbar";
import { useGlobelContext } from "../context/Context";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "../axios";

export default function ClientLayout() {
  const navigate = useNavigate();

  const { token, saveToken, activeMenu } = useGlobelContext();
  const [isLoading, setIsLoading] = useState(false);
  console.log("admin layout", localStorage.getItem("userRole"));

  // useEffect(() => {
  //   if(token){
  //     const userRole = localStorage.getItem('userRole');

  //     if (userRole === 'user') {
  //       navigate('/client/home');
  //     }

  //   } else {
  //     navigate('/clientlogin')
  //    }
  // }, [navigate]);

  // console.log('from clinet ');
  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        client layout
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }
  const onLogout = async (ev) => {
    ev.preventDefault();
    try {
      await axios.post("/logout");
      saveToken(null);
      localStorage.removeItem("userRole");
      navigate("/clientLogin");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <div>
       
        <div className="flex relative ">
          {activeMenu ? (
            <div className="w-72 fixed sidebar bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
                : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <Navbar />
            </div>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
