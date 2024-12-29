import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {


  return sessionStorage.getItem("role")==="admin" ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
