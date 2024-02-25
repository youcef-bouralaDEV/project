import { useEffect, useState } from "react";
import Dashboardview from "../pages/admin/NavBar";
import Sidebar from "../pages/admin/Sidebar";
import { useGlobelContext } from "../context/Context";
import axios from "../axios";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../pages/admin/NavBar";
import { FiSettings } from "react-icons/fi";

function AdminLayout() {
  const { token, saveToken,user, activeMenu ,GetUser} = useGlobelContext();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  console.log("admin layout", localStorage.getItem('userRole'));

  // useEffect(() => {
  //   if(token){
  //     const userRole = localStorage.getItem('userRole');
  
  //     if (userRole === 'admin') {
  //       navigate('/admin/home');
  //     }
      

  //   }else {
  //     navigate('/adminlogin')
  //    }
  // }, [navigate]);

  const onLogout = async (ev) => {
    ev.preventDefault();
    try {
      await axios.post("/logout");
      saveToken(null);
      localStorage.removeItem('userRole');
      navigate("/adminlogin");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        admin layout
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-500"></div>
      </div>
    );
  }
  // console.log(user?.role);
  return (
    <div>
      <button onClick={onLogout} className="bg-red-500 p-1">Logout</button>
      <div className="flex relative ">
        <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
      
            <button
              type="button"
              onClick={() => setThemeSettings(true)}
              style={{ background: "blue" }}
              className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
            >
              <FiSettings />
            </button>
          
        </div>
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
  );
}

export default AdminLayout;
