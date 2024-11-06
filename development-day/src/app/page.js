"use client"

import React, { useState } from 'react';
import axios from 'axios';

const HomePage = () => {
  const [showForm, setShowForm] = useState(false);
  const [occupation, setOccupation] = useState('');
  const [formData, setFormData] = useState({
    familyName: '',
    givenName: '',
    email: '',
    age: '',
    country: '',
    phoneNumber: '',
    occupation: '',
    university: '',
  });

  const handleLoginClick = () => {
    setShowForm(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'occupation') {
      setOccupation(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Send form data to the server
    try {
      const response = await axios.post('/api/register', formData);
      console.log('User registered:', response.data);
      // Reset form and close it
      setFormData({
        familyName: '',
        givenName: '',
        email: '',
        age: '',
        country: '',
        phoneNumber: '',
        occupation: '',
        university: '',
      });
      setShowForm(false);
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div style={{ height: '100vh', overflow: 'hidden', position: 'relative' }}>
      {/* Centered Content */}
      <div style={{ textAlign: 'center', marginTop: '20%' }}>
        <h1>Finding Your Ideal Vacation</h1>
        <p>Welcome to Cathay Travel AI</p>
        <button onClick={handleLoginClick}>Log In</button>
      </div>

      {/* Registration Form */}
      {showForm && (
        <div style={{ position: 'absolute', top: '10%', left: '30%', width: '40%', backgroundColor: '#fff', padding: '20px', borderRadius: '8px' }}>
          <h2>Registration Form</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Family Name:
              <input type="text" name="familyName" value={formData.familyName} onChange={handleChange} required />
            </label>
            <br />
            <label>
              Given Name:
              <input type="text" name="givenName" value={formData.givenName} onChange={handleChange} required />
            </label>
            <br />
            <label>
              Email:
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </label>
            <br />
            <label>
              Age:
              <input type="number" name="age" value={formData.age} onChange={handleChange} required />
            </label>
            <br />
            <label>
              Country:
              <input type="text" name="country" value={formData.country} onChange={handleChange} required />
            </label>
            <br />
            <label>
              Phone Number:
              <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
            </label>
            <br />
            <label>
              Occupation:
              <select name="occupation" value={formData.occupation} onChange={handleChange} required>
                <option value="">Select Occupation</option>
                <option value="student">Student</option>
                <option value="professional">Professional</option>
                <option value="other">Other</option>
              </select>
            </label>
            <br />
            {occupation === 'student' && (
              <label>
                University:
                <input type="text" name="university" value={formData.university} onChange={handleChange} required />
              </label>
            )}
            <br />
            <button type="submit">Submit</button>
            <button type="button" onClick={() => setShowForm(false)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default HomePage;
