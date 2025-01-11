import React, { useEffect, useState } from 'react';
import './PostEvent.css';
import CountDown from './CountDown';

import winner1 from '../image/contact-us-background.jpg';
import winner2 from '../image/contact-us-background.jpg';
import winner3 from '../image/contact-us-background.jpg';
import { getMemories, getWinners, approvedList, getEventStatus } from '../utils/api';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, storage, listAll } from '../firebase/firebase-init';
import { ref, getDownloadURL } from "firebase/storage";

function PostEvent()
{
    const [showAfterEvent, setShowAfterEvent] = useState(false)

    useEffect(() => {
        const fetchEventStatus = async () => {
            try {
                const status = await getEventStatus(); 
                setShowAfterEvent(status.afterEvent); 
            } catch (error) {
                console.error("Error fetching event status:", error);
            }
        };

        fetchEventStatus(); 
    }, []); 

    return(
        <div className='post-event-container'>
           {showAfterEvent ? (
                <AfterEvent />
            ) : (
                <>
                    <CountDown />
                </>
            )}

        </div>
    )
}

function AfterEvent()
{
    const [images, setImages] = useState([]);
    const [winners, setWinners] = useState([]);
    const [eCertLink, setECertLink] = useState(null);

    const [user] = useAuthState(auth); // Get current logged-in user

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

                    // Fetch approved list
                    const approvedParticipants = await approvedList(); 
                    const loggedInUser = approvedParticipants.users.find(
                        (participant) => participant.uid === user?.uid
                    );

                    // If the user is found, fetch the latest uploaded E-Cert URL from Firebase Storage
                    if (loggedInUser) {
                        const eCertDir = `ecerts/${user.uid}/`; // Path to the user's E-Cert directory in Firebase Storage
                        const eCertRef = ref(storage, eCertDir);
                        
                        // List all files in the user's directory
                        listAll(eCertRef)
                            .then((result) => {
                                if (result.items.length > 0) {
                                    // Sort files by timestamp (assuming filenames start with the timestamp)
                                    const sortedFiles = result.items.sort((a, b) => {
                                        return b.name.split('_')[0] - a.name.split('_')[0]; // Compare timestamps
                                    });

                                    // Get the latest file
                                    const latestFileRef = sortedFiles[0];

                                    // Fetch the download URL for the latest E-Cert file
                                    getDownloadURL(latestFileRef)
                                        .then((url) => {
                                            setECertLink(url); // Set the URL to state
                                        })
                                        .catch((error) => {
                                            console.error("Error fetching E-Cert:", error);
                                            setECertLink(null); // Handle error case
                                        });
                                } else {
                                    setECertLink(null); // No E-Cert found
                                }
                            })
                            .catch((error) => {
                                console.error("Error listing E-Cert files:", error);
                                setECertLink(null); // Handle error case
                            });
                    }

                } catch (error) {
                    console.error(error); 
                }
            };
    
            fetchMemories(); 
        }, [user]); 

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
            <div className="ecert-container">
                <h1>E-Cert</h1>
                {eCertLink ? (
                    <p>
                        E-Cert Link:{" "}
                        <a
                            href={eCertLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ecert-link"
                        >
                            {eCertLink}
                        </a>
                    </p>
                ) : (
                    <p>No E-Cert available for your account.</p>
                )}
            </div>

        </div>
    );
}

export default PostEvent;
