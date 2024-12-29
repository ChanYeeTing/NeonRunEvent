import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase-init";
import { useContext } from "../"

const ProtectedRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
