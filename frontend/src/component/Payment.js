import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './Payment.css'; 
import QRImage from '../image/qr.jpg';
import LoadingOverlay from './LoadingOverlay'; 
import { getAuth } from "firebase/auth";
import { uploadPaymentProof } from '../utils/api.js';

function Payment() {
  const navigate = useNavigate();

  const [paymentProof, setPaymentProof] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const back = () => {
    navigate("/register");
  };

  const handleFileChange = (e) => {
    setPaymentProof(e.target.files[0]);
    setError('');
  };

  const submit = async (e) => {
    e.preventDefault();

    // Check if the file is uploaded
    if (!paymentProof) {
      setError('Please upload proof of payment before submitting.');
      return;
    }

    setLoading(true);

    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      console.log("User is not authenticated");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      const userId = user.uid;
      formData.append('paymentProof', paymentProof); // Append the selected file
      formData.append('userId', userId); // Here you should pass the userId (from Firebase Authentication)

      const response = await uploadPaymentProof(formData); // Call the API to upload the payment proof

      if (response.url) {
        alert('Payment proof uploaded successfully!');
        navigate("/status"); // Navigate to the status page upon successful upload
      } else {
        setError('Failed to upload payment proof. Please try again.');
      }
    } catch (err) {
      console.error('Error uploading payment proof:', err.message);
      setError('Failed to upload payment proof. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <LoadingOverlay loading={loading} />
      <form className="payment-form" onSubmit={submit}>
        <h2>Complete Your Payment</h2>
        <p>
          Please complete your payment by scanning the QR code below and uploading your proof of payment.
          Remarks: YOURNAME_PACKAGE (Example: ALI_PackageB)
          <br></br><br></br>
          Package A : RM20
          <br></br>
          Package B : RM35
        </p>

        <div className="qr-code-container">
          <img src={QRImage} alt="QR Code for Payment" className="qr-code" />
        </div>

        <label>
          Upload Proof of Payment :
          <input type="file" name="paymentProof" accept="image/*" onChange={handleFileChange}/>
        </label>

        {error && <p className="error-message">{error}</p>}

        <button type="button" onClick={back}>Back</button>
        <button type="button" onClick={submit} disabled={loading}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Payment;
