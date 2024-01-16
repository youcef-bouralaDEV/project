import React, { useEffect, useState } from 'react'
import Sidebar from '../pages/client-Side/components/Sidebar'
import Navbar from '../pages/client-Side/components/Navbar'
import { useGlobelContext } from '../context/Context';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from '../axios';

export default function ClientLayout() {
const navigate = useNavigate() ;

const { token, saveToken, user } = useGlobelContext();
const [isLoading, setIsLoading] = useState(true);


console.log(user);

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (token) {
          const response = await axios.get("/GetUser"); 
          if (response.data.role === "user") {
            console.log(response.data.role);
            setIsLoading(false);
          } else {
            console.log("from here");
            navigate("/admin/home");
          }
        } else {
          navigate("/clientlogin");
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  if (isLoading) {
    // You can show a loading spinner or some indicator while checking authentication
    return <div>Loading...</div>;
  }
  const onLogout = async (ev) => {
    ev.preventDefault();
    try {
      await axios.post("/logout");
      saveToken(null);
      // navigate("/home")
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
            <Sidebar />
          </div>
          <div className="basis-[88%] border overflow-scroll h-[100vh]">
            <Navbar onLogout={onLogout}/>
              <Outlet/>
            <div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
