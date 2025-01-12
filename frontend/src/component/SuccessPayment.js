import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { participantList } from '../utils/api';
import './SuccessPayment.css';
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from '../firebase/firebase-init';

function SuccessPayment() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const auth = getAuth();
      const user = auth.currentUser; // Get the current authenticated user

      if (user) {
        try {
          // Fetch the list of participants
          const data = await participantList();
          
          // Find the participant based on the current user's UID
          const currentUser = data.users.find(participant => participant.uid === user.uid);

          if (currentUser) {
            setUserData(currentUser); // Set the user data to state
            
            // Fetch the e-cert URL from Firebase Storage if the user is found
            const eCertFolderPath = `ecerts/${user.uid}/`; // Path to user's E-Certs folder
            const eCertFolderRef = ref(storage, eCertFolderPath);

            // List all the files in the user's E-Cert folder
            const fileList = await listAll(eCertFolderRef);

            // Sort the files by the timestamp (based on file name) and get the latest file
            const latestFile = fileList.items
              .map(fileRef => ({
                name: fileRef.name,
                timestamp: parseInt(fileRef.name.split('_')[0]), // Extract timestamp from filename
                fileRef
              }))
              .sort((a, b) => b.timestamp - a.timestamp) // Sort by latest timestamp
              .find(() => true); // Get the first item (the latest)

            // Fetch the download URL of the latest file
            if (latestFile) {
              const url = await getDownloadURL(latestFile.fileRef);
              setECertLink(url); // Set the URL to state
            } else {
              setECertLink(null); // No file found
            }

          } else {
            setError("User not found.");
          }
        } catch (error) {
          setError(error.message); // Set error if fetching fails
        } finally {
          setLoading(false); // Stop loading
        }
      } else {
        setError("User is not authenticated.");
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);
  

  if (loading) {
    return <div>Loading...</div>; // Show loading message while fetching data
  }

  if (error) {
    return <div>Error: {error}</div>; // Show error message if there's an issue
  }

  return (
    <div className='success-container'>
      <form className='success-form'>
        <h2>Status Page</h2>
        <p>Your registration is successful! Thank you for joining our event.</p>
        <p>Current Status: {userData?.status || 'Unknown'}</p>
        <br />
      </form>

      <form className='information-form'>
        <h2>Registered Information</h2>
        <p>Name: {userData?.fullName}</p>
        <p>Matric Number: {userData?.school}</p>
        <p>Email: {userData?.email}</p>
        <p>Contact Number: {userData?.contactNumber}</p>
        <p>Category: {userData?.category}</p>
        <p>Package: {userData?.package}</p>
        {userData?.package === 'B' && <p>T-shirt Size: {userData?.tshirtSize}</p>}
        {eCertLink ? (
          <div>
            <p>
              E-cert: {' '}
              <a href={eCertLink} target='_blank' rel='noopener noreferrer'>
                View E-Certificate
              </a>
            </p>
          </div>
        ) : (
          <p>E-cert: The e-cert will be uploaded after the event.</p>
        )}
      </form>
    </div>
  );
}

export default SuccessPayment;
