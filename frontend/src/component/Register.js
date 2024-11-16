// import CountDown from './CountDown';
import React, { useState } from 'react';
import './Register.css';
import Runner from '../image/runner.png';

function Register() {
  const [formData, setFormData] = useState({
    fullName: '',
    icNumber: '',
    contactNumber: '',
    email: '',
    userType: '',
    package: '',
    year: '',
    school: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = 'This field is required';
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      console.log('Form submitted:', formData);
      alert('Registration successful!');
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
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

        {/* MAtric Number */}
        <label>
          Matric No.
          <input
            type="text"
            name="icNumber"
            placeholder="If you are not a USM student, put N/A"
            value={formData.icNumber}
            onChange={handleChange}
          />
          {errors.icNumber && <div className="error">{errors.icNumber}</div>}
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

        {/* School */}
        <label>
          School
          <input
            type="text"
            name="school"
            placeholder="If you are not a USM student, put N/A"
            value={formData.school}
            onChange={handleChange}
          />
          {errors.school && <div className="error">{errors.school}</div>}
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

        {/* Submit Button */}
        <button type="submit">Submit</button>
      </form>

      {/* Running Image */}
      <div className="running-image">
        <img src={Runner} alt="Running Icon" />
      </div>
    </div>
  );
}

export default Register;
