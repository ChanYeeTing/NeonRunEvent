import React from 'react';
import './SuccessPayment.css';

function SuccessPayment() {
  return (
    <div className='success-container'>
        <form className='success-form'>
      <h2>Status Page</h2>
      <p>Your registration is succesful! Thank you for joining our event.</p>
      <p>Current Status: Approved</p>
      <br></br>
      </form>
      <form className='information-form'>
      <h2>
        Registered Information
      </h2>
      <p>Name: Chan Mei Ling</p>
      <p>Matric Number: 159123</p>
      <p>Category: USM Student</p>
      <p>Package: B</p>
      <p>T-shirt Size (only for Package B): M</p>   
      </form>
    </div>
  );
}

export default SuccessPayment;
