import React from 'react';
import './Navbar.css'

function Navbar()
{
    return(
        <header className="header">
            <a href='/' className="logo">Logo</a>
            <nav className="navBar">
                <a href='/'>Home</a>
                <a href='/register'>Register</a>
                <a href='/info'>Info</a>
                <a href='/post-event'>Post Event</a>
                <a href='/about-us'>About Us</a>
            </nav>
            <a href='/'>Username</a>
        </header>
    )

}

export default Navbar;
