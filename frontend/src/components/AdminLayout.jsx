import React, { useEffect, useState } from 'react';
import Dashboardview from "../pages/admin/Dashboardview";
import Sidebar from "../pages/admin/Sidebar";
import { useGlobelContext } from '../context/Context';
import axios from '../axios';
import { Outlet, useNavigate } from 'react-router-dom';

export default function AdminLayout() {
  const { token, saveToken, user } = useGlobelContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          const response = await axios.get("/GetUser"); 
          if (response.data.role === "admin") {
            console.log(response.data.role);
            setIsLoading(false);
          } else {
            console.log(response.data.role);
            
            navigate("/client/home");
          }
        } else {
          navigate("/adminlogin");
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
 
  
  const onLogout = async (ev) => {
    ev.preventDefault();
    try {
      await axios.post("/logout");
      saveToken(null);
      // navigate("/adminlogin");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (isLoading) {
    // You can show a loading spinner or some indicator while checking authentication
    return <div>Loading...</div>;
  }
console.log(user?.role);
  return (
    <>
      
        <div className="flex overflow-scroll ">
          <div className="basis-[12%] h-[100vh]">
            <Sidebar />
          </div>
          <div className="basis-[88%] border overflow-scroll h-[100vh]">
            <Dashboardview onLogout={onLogout} />
           <Outlet/>
          </div>
        </div>
    
   
    </>
  );
}
