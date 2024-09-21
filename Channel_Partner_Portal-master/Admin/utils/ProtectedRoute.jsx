import React from "react";
import { useSelector } from "react-redux";
import { auth } from "../src/firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [user] = useAuthState(auth);
  const location = useLocation();
  //console.log("user->", user);
  if (!user) {
    return <Navigate to="/portal" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;