import React, { useEffect, useState } from "react";
import Sidebar from "../pages/client-Side/components/Sidebar";
import Navbar from "../pages/client-Side/components/Navbar";
import { useGlobelContext } from "../context/Context";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "../axios";

export default function ClientLayout() {
  const navigate = useNavigate();

  const { token, saveToken, user } = useGlobelContext();
  const [isLoading, setIsLoading] = useState(true);
  console.log("client layout", user?.role);

  useEffect(() => {
  console.log('from useEffect ');

    try {
      if (token) {
        if (user?.role === "user") {
          console.log(user?.role);
          setIsLoading(false);
        } else {
          console.log(user?.role);
          navigate("/admin/home");
        }
      
      }else {
        navigate("/clientlogin");
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
      setIsLoading(false);
    }
  }, [user?.role]);
  console.log('from clinet ');
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
      navigate("/clientLogin");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // const redirectToLogin = () => {
  //   // console.log(role);

  //   if (!token && user?.role === "admin") {
  //     navigate("/adminlogin");
  //   } else {
  //     navigate("/clientlogin");
  //   }
  // };
  // if (token) {
  //   console.log(user);
  //   return user?.role === "admin" ? (

  //     <Navigate to="/admin/home" />
  //   ) : (
  //     <Navigate to="/home" />
  //   );
  // }
  // useEffect(() => {
  //   if (!token) {
  //     redirectToLogin();
  //   }
  // }, [token]);

  return (
    <>
      <div className="">
        <div className="flex overflow-scroll ">
          <div className="basis-[12%] h-[100vh]">
            <Sidebar onLogout={onLogout} />
           
          </div>
          <div className="basis-[88%] border overflow-scroll h-[100vh]">
            <Navbar />
            <Outlet />
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
}
