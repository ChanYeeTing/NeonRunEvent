import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import Runner from '../image/runner.png';
import { getAuth } from "firebase/auth";
import { registerParticipant } from '../utils/api.js';

function Register() {
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    fullName: '',
    icNumber: '',
    contactNumber: '',
    eventEmail: '',
    category: '',
    package: '',
    year: '',
    school: '',
    tshirtSize: '', 
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const saveToFirestore = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
  
    if (!user) {
      console.log("User is not authenticated");
      return;
    }

    try{
      const registerData = {
        ...formData,
        userId: user.uid, // Include user UID to associate data with the user
        createdAt: new Date(),
        status: 'Pending',
      }
       const response = await registerParticipant(registerData);
       console.log(response);
    }
    catch(error)
    {
      console.log(error.message);
    }
  };
  

  const handleNext = async (e) => {
    e.preventDefault();

    const newErrors = {};

    Object.keys(formData).forEach((key) => {
      if (!formData[key] && !(key === 'tshirtSize' && formData.package !== 'B')) {
        newErrors[key] = 'This field is required';
      }
    });

    // Vlidation for IC number format
    if (!/^\d{6}-\d{2}-\d{4}$/.test(formData.icNumber)) {
      newErrors.icNumber = 'Invalid IC number format.';
    }

    // Validation for contact number format
    if (!/^01\d-\d{7,8}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = 'Invalid contact number format.';
    }

    // Validation for matric number (6 digits only)
    if (!/^(\d{6}|N\/A)$/i.test(formData.school)) {
      newErrors.school = 'Matric number must be exactly 6 digits or "N/A".';
    }

    //T-SHIRT size cannot be null for package B
    if (formData.package === 'B' && !formData.tshirtSize) {
      newErrors.tshirtSize = 'Please select your t-shirt size';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      await saveToFirestore(); // Save data to Firestore
     navigate("/payment");  // Navigate to payment if no errors
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleNext}>
        <h2>Register as a participant now!</h2>

        {/* Full Name */}
        <label>
          Full Name
          <input
            type="text"
            name="fullName"
            placeholder="Enter your name as in your NRIC"
            value={formData.fullName}
            onChange={handleChange}
          />
          {errors.fullName && <div className="error">{errors.fullName}</div>}
        </label>

        {/* IC Number */}
        <label>
          IC number
          <input
            type="text"
            name="icNumber"
            placeholder="Enter your IC number Eg.xxxxxx-xx-xxxx"
            value={formData.icNumber}
            onChange={handleChange}
          />
          {errors.icNumber && <div className="error">{errors.icNumber}</div>}
        </label>

        {/* Contact Number */}
        <label>
          Contact Number
          <input
            type="text"
            name="contactNumber"
            placeholder="Enter your contact number Eg.01x-xxx xxxx"
            value={formData.contactNumber}
            onChange={handleChange}
          />
          {errors.contactNumber && <div className="error">{errors.contactNumber}</div>}
        </label>

        {/* Category */}
        <label>
          Register as:
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="category"
                value="student"
                checked={formData.category === 'student'}
                onChange={handleChange}
              />
              Student USM
            </label>
            <label>
              <input
                type="radio"
                name="category"
                value="public"
                checked={formData.category === 'public'}
                onChange={handleChange}
              />
              Public
            </label>
          </div>
          {errors.category && <div className="error">{errors.category}</div>}
        </label>

        {/* Matric Number */}
        <label>
          Matric No.
          <input
            type="text"
            name="school"
            placeholder="If you are not a USM student, put N/A"
            value={formData.school}
            onChange={handleChange}
          />
          {errors.school && <div className="error">{errors.school}</div>}
        </label>

        {/* Year */}
        <label>
          Year
          <div className="radio-group">
            {['1', '2', '3', '4', 'N/A'].map((year) => (
              <label key={year}>
                <input
                  type="radio"
                  name="year"
                  value={year}
                  checked={formData.year === year}
                  onChange={handleChange}
                />
                {year}
              </label>
            ))}
          </div>
          {errors.year && <div className="error">{errors.year}</div>}
        </label>

        {/* Email */}
        <label>
          Student Email
          <input
            type="email"
            name="eventEmail"
            placeholder="If you are not a USM student, enter your personal email."
            value={formData.eventEmail}
            onChange={handleChange}
          />
          {errors.eventEmail && <div className="error">{errors.eventEmail}</div>}
        </label>

        {/* Package */}
        <label>
          Package:
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="package"
                value="A"
                checked={formData.package === 'A'}
                onChange={handleChange}
              />
              A (RM20)
            </label>
            <label>
              <input
                type="radio"
                name="package"
                value="B"
                checked={formData.package === 'B'}
                onChange={handleChange}
              />
              B (RM35)
            </label>
          </div>
          {errors.package && <div className="error">{errors.package}</div>}
        </label>

        {/* T-shirt Size (Conditional for Package B) */}
        {formData.package === 'B' && (
          <label>
            T-shirt Size:
            <div className="radio-group">
              {['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'].map((size) => (
                <label key={size}>
                  <input
                    type="radio"
                    name="tshirtSize"
                    value={size}
                    checked={formData.tshirtSize === size}
                    onChange={handleChange}
                  />
                  {size}
                </label>
              ))}
            </div>
            {errors.tshirtSize && <div className="error">{errors.tshirtSize}</div>}
          </label>
        )}

        {/* Next Button */}
        <button type="submit" >Next</button>
      </form>

      {/* Running Image */}
      <div className="running-image">
        <img src={Runner} alt="Running Icon" />
      </div>
    </div>
  );
}

export default Register;
