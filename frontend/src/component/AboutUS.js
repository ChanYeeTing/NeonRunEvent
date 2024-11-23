import React from 'react';
import './AboutUs.css';
import { FaEnvelope,FaFacebook, FaInstagram } from 'react-icons/fa'; 

function AboutUs()
{

    return(
        <div className='about-container'>
            <div className='about-us'>
                <h1>About Us</h1>
                <p>The Green Lung WNTD Festive Neon Run is an exhilarating celebration of health, 
                    wellness, and environmental awareness, organized in support of the World No Tobacco Day 
                    (WNTD) campaign. This one-of-a-kind event combines the vibrant energy of a neon-lit fun 
                    run with the impactful mission of promoting a smoke-free, sustainable future. We aim to inspire communities to embrace a healthier lifestyle by raising awareness 
                        about the harmful effects of tobacco on individuals and the environment. By taking part 
                        in the Festive Neon Run, participants pledge to protect not only their health but also 
                        the "green lungs" of our planet — our forests, parks, and natural ecosystems.</p>

                    <h2>Why Join Us?</h2>
                    <p>Participating in the Green Lung WNTD Festive Neon Run means taking a stand for your health, 
                        supporting a worthy cause, and enjoying a night of fun and glowing memories with friends and family.
                        Together, let's illuminate the path to a smoke-free, greener future!</p>
            </div>
            <div className='contact-us'>
            <h1>Contact Us</h1>
            <p><FaEnvelope size={30} color="#C13584" style={{ background: 'none' }} />contact@greenlungrun.com</p>
            <p><FaFacebook size={30} color="#4267B2" style={{ background: 'none' }} />Green Lung USM</p>
            <p><FaInstagram size={30} color="#C13584" style={{ background: 'none' }} />@usmgreenlung</p>
            
            </div>
            
        </div>
    );
}

export default AboutUs;