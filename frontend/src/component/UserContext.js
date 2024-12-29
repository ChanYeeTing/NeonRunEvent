import React, { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth,db } from "../firebase/firebase-init"; // Import your Firebase `auth` instance
import { doc, getDoc } from "firebase/firestore";

// Create the context
const UserContext = createContext();

// Provide the context to the app
export const UserProvider = ({ children }) => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    console.log(role);
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
    
      // const userRef = doc(db, "users", currentUser.uid);
      // const userSnap = await getDoc(userRef);
      // console.log(userSnap.data().role);
      // setRole(userSnap.data().role); 
  
    } else {
      setRole(null); // If no user, clear role
    }
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, []);

  return (
    <UserContext.Provider value={{ setRole, role }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);
