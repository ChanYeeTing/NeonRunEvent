import React, { useState } from 'react';
import './Navbar.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from "./UserContext";
import { auth } from '../firebase/firebase-init';
import { signOut } from 'firebase/auth';
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function Navbar()
{
    const user = useAuthState(auth);
    console.log(user);
    const userAuth = getAuth();
    const [isEmailVerified, setEmailStatus] = useState(false);
    // Listen for authentication state changes
    onAuthStateChanged(userAuth, (user) => {
        if (user) {
            // Access the emailVerified property
            setEmailStatus(user.emailVerified);
        }
    });
    const { role, setRole } = useUser();
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
          await signOut(auth); // Log out the user
          setRole(null);
          console.log("User logged out successfully.");
          navigate("/");
          setEmailStatus(false);
        } catch (error) {
          console.error("Error during logout:", error.message);
        }
      };

      
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
            {isEmailVerified ? (
                <div className='userContainer'>
                <p className='userName'>{user[0]?user[0].displayName:""}</p>
                <button className="user" onClick={handleLogout}>Log Out</button>
                </div>
            ) : (
                <a className="user" href='/login'>Log In</a>
            )}
        </header>
    )

}

export default Navbar;
