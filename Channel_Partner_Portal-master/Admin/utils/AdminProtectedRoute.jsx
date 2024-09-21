import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  const admin = useSelector((state) => state.user.admin);
  const location = useLocation();
  console.log("admin->", admin);
  if (!admin) {
    return <Navigate to="/admin" state={{ from: location }} replace />;
  }
  return children;
};
export default AdminProtectedRoute;
