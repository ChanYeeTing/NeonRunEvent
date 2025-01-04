import React, { useEffect, useState } from 'react';
import './PostEvent.css';
import CountDown from './CountDown';

import winner1 from '../image/contact-us-background.jpg';
import winner2 from '../image/contact-us-background.jpg';
import winner3 from '../image/contact-us-background.jpg';
import { getMemories, getWinners } from '../utils/api';

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
    const [images, setImages] = useState([]);
    const [winners, setWinners] = useState([]);

        useEffect(() => {
            const fetchMemories = async () => {
                try {
                    const memories = await getMemories(); 
                    setImages(memories.urls); 
                    const winner = await getWinners();
                    const sortedUrls = winner.urls.sort((a, b) => {
                        return a.localeCompare(b); 
                    });
                    setWinners(sortedUrls);
                } catch (error) {
                    console.error(error); 
                }
            };
    
            fetchMemories(); 
        }, []); 

    return(
        <div className='after-event'>
            <h1>Memories</h1>
            <div className='memories-container'>
            {images.length > 0 ? (
          images.map((url, index) => (
            <div key={index} className="image-item">
            <img  src={url} alt={`Uploaded Memory ${index}`} style={{ width: '200px', margin: '10px' }} className='uploadedImage'/>
            </div>
          ))
        ) : (
          <p>No images to display yet.</p>
        )}
            </div>
            

            <div className='winner-container'>
                <h1>Top 3 Winners</h1>
                <div className="winners">
                    {winners.length > 0 ? (
                        winners.map((url, index) => (
                            <div key={index} >
                                <img src={url} alt={`Uploaded Winner ${index}`} />
                            </div>
                        ))
                    ) : (
                        <>
                            <img src={winner1} alt="Winner 1" />
                            <img src={winner2} alt="Winner 2" />
                            <img src={winner3} alt="Winner 3" />
                        </>
                    )}

                </div>
            </div>
        </div>
    );
}

export default PostEvent;
