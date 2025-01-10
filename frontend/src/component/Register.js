import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserStatus } from '../utils/api'; // Import necessary APIs
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import './Register.css';
import Runner from '../image/runner.png';

function Register() {
  const navigate = useNavigate();
  const auth = getAuth();
  //const user = auth.currentUser;
  const [currentUser, setUser] = useState(null);

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
  const [loading, setLoading] = useState(true); // Track loading status

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        alert("Please login to the website before registration.");
        navigate('/login'); // Redirect to login if user is not authenticated
        return;
      }

      setUser(currentUser);

      try {
        const userStatus = await fetchUserStatus(currentUser.uid);
        if (userStatus) {
          if (userStatus === 'Approved') {
            navigate('/success');
          } else if (userStatus === 'Failed') {
            navigate('/failed');
          } else if (userStatus === 'Pending') {
            navigate('/status');
          } else {
            setLoading(false); // Allow form to display if no status exists
          }
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('Error checking status:', error);
        setLoading(false);
      }
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, [auth, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    // Validate formData (same validation logic as before)
    if (!formData.fullName) {
      newErrors.fullName = 'Full Name is required';
    }

    if (!formData.icNumber) {
      newErrors.icNumber = 'IC Number is required';
    }

    if (!formData.contactNumber) {
      newErrors.contactNumber = 'Contact Number is required';
    }

    if (!formData.eventEmail) {
      newErrors.eventEmail = 'Email is required';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.package) {
      newErrors.package = 'Package selection is required';
    }

    if (!formData.year) {
      newErrors.year = 'Year selection is required';
    }

    if (formData.package === 'B' && !formData.tshirtSize) {
      newErrors.tshirtSize = 'T-shirt size is required for Package B';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      try {
        navigate('/payment', { state: { formData } });
      } catch (error) {
        console.error('Error registering:', error);
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
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

        {/* Matric No */}
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

//need to click on the register page again to trigger the navigation