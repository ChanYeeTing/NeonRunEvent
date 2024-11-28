import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './Payment.css'; 
import QRImage from '../image/qr.jpg'; 

function Payment() {
  const navigate = useNavigate();

  const [paymentProof, setPaymentProof] = useState(null);
  const [error, setError] = useState('');

  const back = () => {
    navigate("/register");
  };

  const handleFileChange = (e) => {
    setPaymentProof(e.target.files[0]);
    setError('');
  };

  const submit = (e) => {
    e.preventDefault();

    // Check if the file is uploaded
    if (!paymentProof) {
      setError('Please upload proof of payment before submitting.');
      return;
    }

    navigate("/status");
  };

  return (
    <div className="payment-container">
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Payment;
