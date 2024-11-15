import './Home.css';
import poster from "../image/poster.jpg"
import intro from "../image/neonRun.png"
import Runpackage from '../image/package.jpg'
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
        <div className="introduce">
            <h2>What is WNTD Festiva Neon Run?</h2>
            <div className='intro-container'>
            <p>WNTD Festiva Neon Run is hosted by Sekretariat Green Lung USM in conjuction with the World No Tobacco Day, with themed
                <b> "Breathe Clean, Smoke Free" </b> to emphasise the importance of being smoke-free and tobacco-free for our health.
                The primary goal of the WNTD Festiva Neon Run is to raise awareness about the detrimental effects of tobacco use and to 
                promote a healthier, smoke-free lifestyle. By aligning with World No Tobacco Day, 
                the event seeks to educate the public on the dangers of smoking and the benefits of quitting. It serves as a powerful 
                reminder of the importance of clean air and the positive impact of a tobacco-free environment on our health.
            </p>
            <img src={intro} className='intro'/>
            </div>
        </div>
        <div className='package-container'>
            
            <h2>Package Provided</h2>
            <img src={Runpackage}/>
            <p></p>

        </div>
        </section>
    );

}

export default Home;
