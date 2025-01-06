import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth'; // Firebase Authentication to get current user
import { participantList } from '../utils/api'; // Import your participantList API
import './SuccessPayment.css';

function SuccessPayment() {
  const [userData, setUserData] = useState(null); // State to store user data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error handling state

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
      </form>
    </div>
  );
}

export default SuccessPayment;
