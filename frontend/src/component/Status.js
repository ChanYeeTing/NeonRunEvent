import React from 'react';
import './Status.css';

function Status() {
  return (
    <div className='status-container'>
        <form className='status-form'>
      <h2>Status Page</h2>
      <p>Your payment has been submitted, waiting admin to approve your registration.</p>
      <p>Current Status: Pending</p>

      <a href='/success'>Success Payment</a>
      <a href='/failed'>Failed Payment</a>
      </form>
    </div>
  );
}

export default Status;
