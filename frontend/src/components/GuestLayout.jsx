import { useGlobelContext } from "../context/Context";
import { Navigate, Outlet } from "react-router-dom";

export default function GuestLayout() {
  const { token, user } = useGlobelContext();

  console.log("admin layout", localStorage.getItem('userRole'));
  const userRole = localStorage.getItem('userRole');

  

  // console.log(user?.role);
  if (token) {

    if(userRole === "admin")
      return <Navigate to="/admin/home" />;
    else {

      return <Navigate to="/client/home" />;
    }
    
    
  }

  return (
    <div>
      <Outlet />
    </div>
  );
}
