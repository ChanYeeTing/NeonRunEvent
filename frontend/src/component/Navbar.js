import React from 'react';
import './Navbar.css'
import { useLocation } from 'react-router-dom';

function Navbar()
{
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
            {! useLocation().pathname.includes("admin") ?
            <a className="user" href='/login'>Log In</a>:
            <a className="user" href='/'>Log Out</a>}
        </header>
    )

}

export default Navbar;
