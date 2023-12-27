import React from "react";
import { useGlobelContext } from "../Context";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

export default function GuestLayout() {
  const { token, role } = useGlobelContext();

  console.log("geust admin", role);

  if (token && role === "admin") {
    return <Navigate to={"admin/home"} />;
  }
  else if (token && role === "user") {
    return <Navigate to={"client/home"} />;
  }
  console.log("Geust token", token);
  return (
    <div>
      <Outlet />
    </div>
  );
}
