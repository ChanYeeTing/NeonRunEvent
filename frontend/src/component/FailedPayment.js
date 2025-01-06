import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth'; // Import Firebase Auth
import './FailedPayment.css';
import { updateStatus } from '../utils/api'; // Import your updateStatus API

function FailedPayment() {
  const navigate = useNavigate();
  const auth = getAuth(); // Get Firebase Auth instance
  const user = auth.currentUser; // Get the current user

  const resetStatusToPending = async () => {
    try {
      if (user) {
        const userId = user.uid; // Get the current user's UID
        const data = {
          userId,
          status: "Pending", // Set the status to "Pending"
        };
        await updateStatus(data); // Call your updateStatus API to update the user's status
        navigate("/payment"); // Redirect to the payment page
      } else {
        console.error("No user is logged in.");
        // Handle user not being logged in (e.g., redirect to login)
      }
    } catch (error) {
      console.error("Error resetting status:", error);
      // Handle error appropriately (e.g., show a message to the user)
    }
  };

  return (
    <div className='failed-container'>
        <form className='failed-form'>
      <h2>Status Page</h2>
      <h3>Payment Unsuccessful.</h3>
      <p>
        Please upload the correct document to prove that you have made the payment.
        <br />
        If you did not pay successfully, make the payment again.
      </p>
      <p>Current Status: Failed</p>

      <button type='button' onClick={resetStatusToPending}>Proceed to payment</button>
      </form>
    </div>
  );
}

export default FailedPayment;
