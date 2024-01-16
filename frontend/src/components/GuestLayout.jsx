import { useGlobelContext } from "../context/Context";
import { Navigate, Outlet } from "react-router-dom";

export default function GuestLayout() {
  const { token, user } = useGlobelContext();
console.log(user?.role);
  if (token) {
    // console.log(user?.role);
    return user?.role === "admin" ? (
      
      <Navigate to="/admin/home" />
    ) : (
      <Navigate to="client/home" />
    );
  }

  return (
    <div>
      <Outlet />
    </div>
  );
}
