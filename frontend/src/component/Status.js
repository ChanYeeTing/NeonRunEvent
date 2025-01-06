import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserStatus } from '../utils/api.js';
import './Status.css';

function Status({ }) {

  return (
    <div className='status-container'>
      <form className='status-form'>
        <h2>Status Page</h2>
        <p>Your payment has been submitted, waiting for admin approval.</p>
        <p>Current Status: {'Pending'}</p>
      </form>
    </div>
  );
}

export default Status;
