import React, { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase-init"; // Import your Firebase `auth` instance
// import { doc, getDoc } from "firebase/firestore";
import { jwtDecode } from "jwt-decode";

// Create the context
const UserContext = createContext();

// Provide the context to the app
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
      const token = localStorage.getItem("authToken");
      const decoded = jwtDecode(token);
      const role = decoded.claims.role;
      setUser(currentUser);
      setRole(role); 
      console.log(decoded);
    } else {
      setUser(null);
      setRole(null); // If no user, clear role
    }
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, role }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);
