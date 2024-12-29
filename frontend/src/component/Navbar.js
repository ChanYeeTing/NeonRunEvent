import React, { useState, useEffect } from 'react';
import './Navbar.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase-init';
import { signOut } from 'firebase/auth';
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function Navbar({ setLoading })
{
    const user = useAuthState(auth);
    const userAuth = getAuth();
    const [isEmailVerified, setEmailStatus] = useState(false);

    // Listen for authentication state changes
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
          if (currentUser) {
            setEmailStatus(currentUser.emailVerified);
          } else {
            setEmailStatus(false);
          }
        });
        return () => unsubscribe();
      }, []);

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
           
            await signOut(auth); // Log out the user
            sessionStorage.removeItem("role");
            setEmailStatus(false); // Clear email status
        
            console.log("User logged out successfully.");
            navigate("/"); // Navigate to the home page
          } catch (error) {
            console.error("Error during logout:", error.message);
          } 
      };

      if(sessionStorage.getItem("role"))
      {
        if(user[0]?.displayName)
            setLoading(false);

      }
      else{
        setLoading(false)
      }
      
    return(
        <header className="header">
           
            {! useLocation().pathname.includes("admin") ? 
            <a href='/' className="logo">WNTD Neon Run</a> :
            <a href='/admin-dashboard' className="logo">WNTD Neon Run</a>
            }

            <nav className="navBar">
            {! useLocation().pathname.includes("admin") &&
            <div>
                <a href='/'>Home</a>
                <a href='/register'>Register</a>
                <a href='/info'>Info</a>
                <a href='/post-event'>Post Event</a>
                <a href='/about-us'>About Us</a>
                </div>
                }
            </nav>
            {sessionStorage.getItem("role") ? (
                <div className='userContainer'>
                <p className='userName'>{user[0]?.displayName}</p>
                <button className="user" onClick={handleLogout}>Log Out</button>
                </div>
            ) : (
                <a className="user" href='/login'>Log In</a>
            )}
        </header>
    )

}

export default Navbar;
