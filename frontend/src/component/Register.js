import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import Runner from '../image/runner.png';

function Register() {
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    fullName: '',
    icNumber: '',
    contactNumber: '',
    email: '',
    userType: '',
    package: '',
    school: '',
    tshirtSize: '', 
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = (e) => {
    e.preventDefault();

    const newErrors = {};

    Object.keys(formData).forEach((key) => {
      if (!formData[key] && !(key === 'tshirtSize' && formData.package !== 'B')) {
        newErrors[key] = 'This field is required';
      }
    });

    if (formData.package === 'B' && !formData.tshirtSize) {
      newErrors.tshirtSize = 'Please select your t-shirt size';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      toPayment();  // Navigate to payment if no errors
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

        {/* User Type */}
        <label>
          Register as:
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="userType"
                value="student"
                checked={formData.userType === 'student'}
                onChange={handleChange}
              />
              Student USM
            </label>
            <label>
              <input
                type="radio"
                name="userType"
                value="public"
                checked={formData.userType === 'public'}
                onChange={handleChange}
              />
              Public
            </label>
          </div>
          {errors.userType && <div className="error">{errors.userType}</div>}
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

        {/* Email */}
        <label>
          Student Email
          <input
            type="email"
            name="email"
            placeholder="If you are not a USM student, enter your personal email."
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="error">{errors.email}</div>}
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
