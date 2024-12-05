import './Home.css';
import poster from "../image/background.png"
import intro from "../image/neonRun.png"
import Runpackage from "../image/package.jpg"
import TShirt from "../image/tshirt.jpg"
import SizeChart from "../image/tshirtSizeChart.jpg"
import Medal from "../image/medal.jpg"
import Map from "../image/map.jpg"
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home()
{
    const navigate = useNavigate();
    const registerButton = () =>
    {
        navigate("/register");
    }
    return(
        <section className="home">
        <div>
            <img src={poster} className="poster" alt="Poster" />
        </div>
        <div className="registerNow">
            <button onClick={()=>registerButton()}>Register Now</button>
        </div>
            <div className='intro-container'>
                <div className='introdution'>
                    <h2>What is WNTD Festive Neon Run?</h2>
                    <p>WNTD Festive Neon Run is hosted by Sekretariat Green Lung USM in conjuction with the World No Tobacco Day, with themed
                        <b> "Breathe Clean, Smoke Free" </b> to emphasise the importance of being smoke-free and tobacco-free for our health.
                        The primary goal of the WNTD Festiva Neon Run is to raise awareness about the detrimental effects of tobacco use and to 
                        promote a healthier, smoke-free lifestyle. By aligning with World No Tobacco Day, 
                        the event seeks to educate the public on the dangers of smoking and the benefits of quitting. It serves as a powerful 
                        reminder of the importance of clean air and the positive impact of a tobacco-free environment on our health.
                    </p>
                </div>
                <img src={intro} className='intro' alt="Intro"/>
            </div>
        <div className='package-container'>
            
            <h2>Package Provided</h2>
            <img src={Runpackage} alt="Package"/>
            <br></br>
            {/* <p>
                There are two packages available for Neon Run. Race kit includes
                neon light sticks and neon body paint, let you become the brightest star
                of the night. Package A contains race kit, snacks, and medal for 
                Top 150 finisher while Package B is the package add-on with a cool design T-shirt.
            </p> */}
            <h2>T-Shirt Design</h2>
            <img src={TShirt} alt="T-shirt"/>
            <br></br>
            <h2>T-Sirt Size Chart</h2>
            <img src={SizeChart} alt="Size Chart"/>
            <br></br>
            <h2>Medal Design for Top 150</h2>
            <img src={Medal} alt="Medal"/>
            <br></br>
        </div>
        <div class="map-container">
            <div>
                <img src={Map} className='map-image' alt='Map' />
            </div>
            <div class="map-content">
                <h2>Hey, the Route Map is OUT!</h2>
                <p>
                Get ready for an unforgettable experience! Neon Run is a 5km run around USM main campus compound. You will be passing
                by some "landmarks" in USM while completing the run! 
                Immerse yourself in the energy and excitement as you dash through this unique event.
                </p>
                <p>
                Don’t miss out on this incredible opportunity! 
                Grab your spot now and be part of a vibrant journey filled with fun, fitness, and unforgettable memories. 
                See you at the starting line!
                </p>
                <p>
                If you have any enquiries, please don't hesitate to contact us, we are
                here to assist you!
                </p>
                <p>
                Refer to About Us to reach us!
                </p>
            </div>
        </div>
        </section>
    );

}

export default Home;
