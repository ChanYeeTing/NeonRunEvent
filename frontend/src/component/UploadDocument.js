import React, { useState, useEffect } from 'react';
import './UploadDocument.css';
import { uploadMemory, getMemories, getWinners, uploadWinner } from '../utils/api';
import LoadingOverlay from './LoadingOverlay';

function UploadDocument() {
    const [images, setImages] = useState([]);
    const [files, setFiles] = useState([]);
    const [winners, setWinners] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        setFiles(Array.from(e.target.files)); // Convert FileList to array
        console.log(files);
    };

    useEffect(() => {
        const fetchImage = async () => {
            try {
                setLoading(true);
                const memories = await getMemories(); 
                setImages(memories.urls); 
                const winner = await getWinners();
                setWinners(winner.urls);
            } catch (error) {
                console.error(error); 
            }
            setLoading(false);
        };

        fetchImage(); 
    }, []); 

    const handleUpload = async () => {
        if (files.length === 0) {
            alert('Please select at least one file to upload.');
            return;
        }
        setLoading(true);
        const data = new FormData();
        files.forEach((file) => {
            data.append('images', file); // Match the key name with your backend
        });
        
        try {
            const response = await uploadMemory(data); // Ensure this matches your API
            alert(response.message);

            // Update the images state with the returned URLs
            setImages((prevImages) => [...prevImages, ...response.urls]);
            
        } catch (error) {
            console.error(error);
            alert('Failed to upload image');
        }
        setLoading(false);
    };

    const handleWinnerUpload = async () => {
        if (files.length === 0) {
            alert('Please select at least one file to upload.');
            return;
        }
        setLoading(true);
        const data = new FormData();
        files.forEach((file) => {
            data.append('winners', file); // Match the key name with your backend
        });
 
        try {
            const response = await uploadWinner(data); // Ensure this matches your API
            alert(response.message);

            // Update the images state with the returned URLs
            setWinners((prevImages) => [...prevImages, ...response.urls]);
            
        } catch (error) {
            console.error(error);
            alert('Failed to upload image');
        }
        setLoading(false);
    };

    return (
        <div className="upload-container">
            <LoadingOverlay loading={loading}/>
            <h1>Upload Documents</h1>
            <div>
                <h2>Memories</h2>
                <input type="file" multiple onChange={handleFileChange}  accept="image/*"/>
                <button onClick={handleUpload}>Upload</button>
            </div>
            <div>
                {images.map((url, index) => (
                    <img
                        key={index}
                        src={url}
                        alt={`Uploaded ${index}`}
                        style={{ width: '200px', margin: '10px' }}
                    />
                ))}
            </div>
            <div className='winner-upload'>
                <h2>Top 3 Winners</h2>
                <input type="file" onChange={handleFileChange}  accept="image/*"/>
                <button onClick={handleWinnerUpload}>Upload</button>
            </div>
            <div>
                {winners.map((url, index) => (
                    <img
                        key={index}
                        src={url}
                        alt={`Uploaded ${index}`}
                        style={{ width: '200px', margin: '10px' }}
                    />
                ))}
            </div>
        </div>
    );
}

export default UploadDocument;
