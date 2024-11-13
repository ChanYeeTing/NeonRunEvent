import React from 'react';
import './Navbar.css'

function Navbar()
{
    return(
        <header className="header">
            <a href='/' className="logo">Logo</a>
            <nav className="navBar">
                <a href='/'>Home</a>
                <a href='/'>Register</a>
                <a href='/'>Info</a>
                <a href='/'>Post Event</a>
                <a href='/'>About Us</a>
            </nav>
            <a href='/'>Username</a>
        </header>
    )

}

export default Navbar;
