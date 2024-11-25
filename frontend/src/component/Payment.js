import React from 'react';
import './Payment.css'; 
import QRImage from '../image/qr.jpg'; 

function Payment() {
  return (
    <div className="payment-container">
      <form className="payment-form">
        <h2>Complete Your Payment</h2>
        <p>Please complete your payment by scanning the QR code below and uploading your proof of payment.</p>

        <div className="qr-code-container">
          <img src={QRImage} alt="QR Code for Payment" className="qr-code" />
        </div>

        <label>
          Upload Proof of Payment
          <input type="file" name="paymentProof" accept="image/*" />
        </label>

        <button type="submit" disabled>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Payment;
