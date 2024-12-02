import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FailedPayment.css';
import Payment from './Payment';

function FailedPayment() {
const navigate = useNavigate(); 

const pay = () => {
    navigate("/payment");
};

  return (
    <div className='failed-container'>
        <form className='failed-form'>
      <h2>Status Page</h2>
      <h3>Payment Unsuccessful.</h3>
      <p>
        Please upload the correct document to prove that you have made the payment.
        <br></br>
        If you did not pay successfully, make the payment again.
      </p>
      <p>Current Status: Failed</p>

      <button type='button' onClick={pay}>Proceed to payment</button>
      </form>
    </div>
  );
}

export default FailedPayment;
