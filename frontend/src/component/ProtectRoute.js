import { Navigate } from "react-router-dom";
import React from 'react';

const ProtectedRoute = ({ children }) => {


  return localStorage.getItem("role")==="admin" ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
