import React, { useState } from 'react';
import './PostEvent.css';
import CountDown from './CountDown';
import memory1 from '../image/contact-us-background.jpg';
import memory2 from '../image/contact-us-background.jpg';
import memory3 from '../image/contact-us-background.jpg';
import memory4 from '../image/contact-us-background.jpg';
import memory5 from '../image/contact-us-background.jpg';
import memory6 from '../image/contact-us-background.jpg';
import winner1 from '../image/contact-us-background.jpg';
import winner2 from '../image/contact-us-background.jpg';
import winner3 from '../image/contact-us-background.jpg';

function PostEvent()
{
    const [showAfterEvent, setShowAfterEvent] = useState(false)

    return(
        <div className='post-event-container'>
           {showAfterEvent ? (
                <AfterEvent />
            ) : (
                <>
                    <CountDown />
                    <button onClick={() => setShowAfterEvent(true)} className="after">After Event</button>
                </>
            )}
        </div>
    )
}

function AfterEvent()
{
    return(
        <div className='after-event'>
            <h1>Memories</h1>
            <div className='memories-container'>
            <img src={memory1} alt='memories'></img>
            <img src={memory2} alt='memories'></img>
            <img src={memory3} alt='memories'></img>
            <img src={memory4} alt='memories'></img>
            <img src={memory5} alt='memories'></img>
            <img src={memory6} alt='memories'></img>
            </div>
            
            
            <div className='winner-container'>
                <h1>Top 3 Winners</h1>
                <div className="winners">
                    <img src={winner1} alt="Winner 1" />
                    <img src={winner2} alt="Winner 2" />
                    <img src={winner3} alt="Winner 3" />
                </div>
            </div>
        </div>
    );
}

export default PostEvent;
