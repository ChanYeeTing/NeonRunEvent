import './Home.css';
import poster from "../image/poster.jpg"
import React from 'react';

function Home()
{
    return(
        <section className="home">
        <div>
            <img src={poster} className="poster" alt="Poster" />
        </div>
        <div className="registerNow">
            <a href="/register">Register Now</a>
        </div>
        </section>
    );

}

export default Home;
