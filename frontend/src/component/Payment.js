import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Payment.css';
import QRImage from '../image/qr.jpg';
import LoadingOverlay from './LoadingOverlay';
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { registerParticipant } from '../utils/api';

function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state?.formData || {}; // Retrieve form data from the location state

  const [paymentProof, setPaymentProof] = useState(null); // State to store the payment proof file
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Back navigation handler
  const back = () => {
    navigate("/register");
  };

  // Handle file selection for payment proof
  const handleFileChange = (e) => {
    setPaymentProof(e.target.files[0]);
    setError(''); // Clear any previous error message
  };

  // Function to handle file upload and participant registration
  const handleUpload = async () => {
    if (!paymentProof) {
      setError('Please upload proof of payment before submitting.');
      return;
    }

    setLoading(true); // Show loading overlay

    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      console.log("User is not authenticated");
      setLoading(false);
      return;
    }

    try {
      const storage = getStorage();
      const userId = user.uid;
      const fileRef = ref(storage, `paymentProofs/${userId}_${Date.now()}_${paymentProof.name}`); // Unique file reference

      const uploadTask = uploadBytesResumable(fileRef, paymentProof);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Optional: Track upload progress
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.error("Upload error:", error.message);
          setError('Failed to upload payment proof. Please try again.');
          setLoading(false);
        },
        async () => {
          // On successful upload, get the file URL
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log("File available at", downloadURL);

          // Proceed to register the participant
          await registerParticipant({
            ...formData,
            userId: user.uid,
            paymentProofUrl: downloadURL,
            status: 'Pending',
            createdAt: new Date(),
          });

          alert('Payment proof uploaded successfully!');
          navigate("/status"); // Navigate to the status page
        }
      );
    } catch (err) {
      console.error("Error uploading payment proof:", err.message);
      setError('Failed to upload payment proof. Please try again.');
    } finally {
      setLoading(false); // Hide loading overlay after processing
    }
  };

  // Submit handler that will trigger the upload process
  const submit = async (e) => {
    e.preventDefault();
    handleUpload(); // Call the upload function
  };

  return (
    <div className="payment-container">
      <LoadingOverlay loading={loading} /> {/* Loading overlay when loading */}
      <form className="payment-form" onSubmit={submit}>
        <h2>Complete Your Payment</h2>
        <p>
          Please complete your payment by scanning the QR code below and uploading your proof of payment.
          Remarks: YOURNAME_PACKAGE (Example: ALI_PackageB)
          <br /><br />
          Package A: RM20
          <br />
          Package B: RM35
        </p>

        <div className="qr-code-container">
          <img src={QRImage} alt="QR Code for Payment" className="qr-code" />
        </div>

        <label>
          Upload Proof of Payment:
          <input
            type="file"
            name="paymentProof"
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>

        {error && <p className="error-message">{error}</p>}

        <button type="button" onClick={back}>Back</button>
        <button type="submit" disabled={loading}>Submit</button>
      </form>
    </div>
  );
}

export default Payment;
