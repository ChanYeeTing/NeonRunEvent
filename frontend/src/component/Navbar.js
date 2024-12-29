import React from 'react';
import './Navbar.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from "./UserContext";
import { auth } from '../firebase/firebase-init';
import { signOut } from 'firebase/auth';

function Navbar()
{
    const { user,setUser, role } = useUser();
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
        localStorage.removeItem("authToken");
          await signOut(auth); // Log out the user
          setUser(null); // Update context to null (no user)
          console.log("User logged out successfully.");
          navigate("/");
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
            {user ? (
                role==="user" ?
                <div className='userContainer'>
                <p className='userName'>{user.displayName}</p>
                <button className="user" onClick={handleLogout}>Log Out</button>
                </div> :
                <button className="user" onClick={handleLogout}>Log Out</button>
            ) : (
                <a className="user" href='/login'>Log In</a>
            )}
        </header>
    )

}

export default Navbar;
