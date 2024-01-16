// import React from "react";
// import { useGlobelContext } from "../Context";
// import {Outlet, useNavigate } from "react-router-dom";
// import axios from "../axios";
// import Dashboardview from "../pages/admin/Dashboardview";
// import Sidebar from "../pages/admin/Sidebar";
// import { useEffect } from "react";
// import { useState } from "react";

// export default function DefaultLayout() {
//   const navigate = useNavigate();

//   const { token, saveToken, user } = useGlobelContext();

//   useEffect(() => {
//     if (!token) {
//       redirectToLogin();
//     }
//   }, [token]);


//   const redirectToLogin = () => {
//     // console.log(role);

//     if (!token && user?.role === "admin") {
//       navigate("/adminlogin");
//     } else {
//       navigate("/clientlogin");
//     }
//   };

//   const onLogout = async (ev) => {
//     ev.preventDefault();
//     try {
//       await axios.post("/logout");
//       saveToken(null);
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };

//   return (
    
//           <div>
//             <Outlet />
//           </div>
//   );
// }
