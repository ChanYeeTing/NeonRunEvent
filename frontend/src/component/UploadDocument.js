import React, { useState, useEffect } from 'react';
import './UploadDocument.css';
import { storage, ref, uploadBytesResumable, getDownloadURL } from '../firebase/firebase-init'; // Import Firebase Storage methods
import { uploadMemory, getMemories, getWinners, uploadWinner, approvedList, uploadEcert, updateEventStatus, getEventStatus } from '../utils/api';
import LoadingOverlay from './LoadingOverlay';

function UploadDocument() {
    const [images, setImages] = useState([]);
    const [files, setFiles] = useState([]);
    const [winners, setWinners] = useState([]);
    const [loading, setLoading] = useState(false);
    const [participants, setParticipants] = useState([]);
    const [eCertFile, setECertFile] = useState({}); // Store file for each participant
    const [afterEvent, setAfterEvent] = useState(false);



    const handleToggle = async () => {
        try {
            setLoading(true);
            await updateEventStatus(!afterEvent)
        } catch (err) {
            console.error(err);
        }
    };

    
    useEffect(() => {
        const fetchEventStatus = async () => {
            try {
                const status = await getEventStatus();
                setAfterEvent(status.afterEvent);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching event status:", error);
            }
        };
        fetchEventStatus();
    }, [handleToggle]);


    const handleFileChange = (e) => {
        setFiles(Array.from(e.target.files)); // Convert FileList to array
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
            // Loop through files to upload them
            Array.from(files).forEach((file) => {
                const fileRef = ref(storage, `memories/${Date.now()}_${file.name}`); // Create a reference to the storage location

                const uploadTask = uploadBytesResumable(fileRef, file); // Upload the file to Firebase

                uploadTask.on(
                    'state_changed',
                    (snapshot) => {
                        // Track progress if needed
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    },
                    (error) => {
                        alert(error.message);
                        setLoading(false);
                    },
                    () => {
                        // Once the upload is complete, get the public URL
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            setImages((prevImages) => [...prevImages, downloadURL]);
                            setLoading(false);
                            alert("Upload Successful");
                        });
                    }
                );
            });
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

    // Process each file and upload it to Firebase Storage
    const uploadedImages = [];

    for (const file of files) {
      const fileName = `winners/${Date.now()}_${file.name}`; // Create a unique name for the file
      const fileRef = ref(storage, fileName); // Create a reference to the storage location

      const uploadTask = uploadBytesResumable(fileRef, file); // Upload the file

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (error) => {
          alert(`Error: ${error.message}`);
          setLoading(false);
        },
        () => {
          // Once the upload is complete, get the file's public URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            uploadedImages.push(downloadURL);
            if (uploadedImages.length === files.length) {
            setWinners((prevImages) => [...prevImages, uploadedImages]);
              setLoading(false);
              alert('Upload successful');
            }
          });
        }
      );
    }
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
            // Create a unique file reference in Firebase Storage (use participantId and timestamp for uniqueness)
            const fileRef = ref(storage, `ecerts/${participantId}/${Date.now()}_${file.name}`);
    
            // Upload the file to Firebase Storage
            const uploadTask = uploadBytesResumable(fileRef, file); // Upload the file to Firebase
    
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    // Track progress if needed
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                },
                (error) => {
                    alert(error.message);
                    setLoading(false);
                },
                () => {
                    // Once the upload is complete, get the public URL
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        // Save the URL in the user's document or perform any other action as needed
                        console.log('Upload successful! URL:', downloadURL);
                        
                        // Update the participant's record in your state (or Firestore, etc.)
                        setParticipants((prevParticipants) => 
                            prevParticipants.map((participant) =>
                                participant.id === participantId
                                    ? { ...participant, ecertURL: downloadURL }
                                    : participant
                            )
                        );
                        alert('E-cert uploaded successfully');
                        setLoading(false);
                    });
                }
            );
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
            <button onClick={handleToggle}>
                {afterEvent ? "Disable After Event" : "Enable After Event"}
            </button>
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
