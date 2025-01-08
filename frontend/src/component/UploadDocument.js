import React, { useState, useEffect } from 'react';
import './UploadDocument.css';
import { uploadMemory, getMemories, getWinners, uploadWinner, approvedList, uploadEcert } from '../utils/api';
import LoadingOverlay from './LoadingOverlay';

function UploadDocument() {
    const [images, setImages] = useState([]);
    const [files, setFiles] = useState([]);
    const [winners, setWinners] = useState([]);
    const [loading, setLoading] = useState(false);
    const [participants, setParticipants] = useState([]);
    const [eCertFile, setECertFile] = useState({}); // Store file for each participant

    const handleFileChange = (e) => {
        setFiles(Array.from(e.target.files)); // Convert FileList to array
        console.log(files);
    };

    const handleECertFileChange = (e, participantId) => {
        setECertFile((prev) => ({
            ...prev,
            [participantId]: e.target.files[0],
        }));
    };

    useEffect(() => {
        const fetchImage = async () => {
            try {
                setLoading(true);
                const memories = await getMemories(); 
                setImages(memories.urls); 
                const winner = await getWinners();
                setWinners(winner.urls);

                const response = await approvedList();
                const participantsList = response.users.map((user) => ({
                    ...user,
                    rank: user.rankAssign || "No Rank",
                    ecertURL: user.ecertURL,
                  }));
                setParticipants(participantsList);

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

    const handleECertUpload = async (participantId, icNumber) => {
        const file = eCertFile[participantId];
        
        if (!file) {
            alert('Please select a file to upload for this participant.');
            return;
        }
    
        setLoading(true);
    
        const data = new FormData();
        data.append('ecert', file); // Append the e-cert file
        data.append('uid', participantId); // Append the participant's UID
        data.append('icNumber', icNumber); // Append the participant's IC number
    
        try {
            const response = await uploadEcert(data); // Ensure this matches your API
            alert(response.message);
            
            // // Optional: Update participants or display success
            // setParticipants((prevParticipants) =>
            //     prevParticipants.map((participant) =>
            //         participant.uid === participantId
            //             ? { ...participant, ecertUrl: response.url }
            //             : participant
            //     )
            // );

            // Re-fetch participants to get the updated list with ecertUrl
            const updatedParticipantsResponse = await approvedList();
            const updatedParticipants = updatedParticipantsResponse.users.map((user) => ({
                ...user,
                rank: user.rankAssign || "No Rank",
                ecertURL: user.ecertURL,
            }));
            setParticipants(updatedParticipants);
            console.log(updatedParticipantsResponse);

        } catch (error) {
            console.error(error);
            alert('Failed to upload e-cert.');
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
            <div className="participant-list">
                <h2>Participants</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>IC Number</th>
                            <th>Contact No</th>
                            <th>Category</th>
                            <th>Matric No</th>
                            <th>Package</th>
                            <th>Rank</th>
                            <th>Upload E-Cert</th>
                            <th>View E-Cert</th>
                        </tr>
                    </thead>
                    <tbody>
                        {participants.map((participant) => (
                            <tr key={participant.uid}>
                                <td>{participant.name}</td>
                                <td>{participant.icNumber}</td>
                                <td>{participant.contactNo}</td>
                                <td>{participant.category}</td>
                                <td>{participant.matricNo}</td>
                                <td>{participant.package}</td>
                                <td>{participant.rank}</td>
                                <td>
                                    <div className="ecert-upload-container">
                                        <input
                                            type="file"
                                            onChange={(e) => handleECertFileChange(e, participant.uid)}
                                        />
                                        <button onClick={() => handleECertUpload(participant.uid, participant.icNumber)}>Upload</button>
                                    </div>
                                </td>
                                <td>
                                    {participant.ecertURL && participant.ecertURL !== "N/A" ? (
                                        <a href={participant.ecertURL} target="_blank" rel="noopener noreferrer">View</a>
                                    ) : (
                                        <span style={{ color: 'gray', cursor: 'not-allowed' }}>View</span> // Disabled link style
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UploadDocument;
