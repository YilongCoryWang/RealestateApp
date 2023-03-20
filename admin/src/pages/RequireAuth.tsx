import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const RequireAuth:React.FC = () => {
  const isTokenExist = !!localStorage.getItem("token");
  return isTokenExist ? <Outlet /> : <Navigate to="/login" replace={true} />;
};

export default RequireAuth;
