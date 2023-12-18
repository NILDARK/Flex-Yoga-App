// src/components/NewAdmission.jsx
import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import '../styles/NewAdmission.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap-icons/font/bootstrap-icons.css'; // Include Bootstrap Icons CSS
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
const NewAdmission = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    name: '',
    age: '',
    contact: '',
    batch:'1',
  });
  const [enrollAndPayLater, setEnrollAndPayLater] = useState(false);
  const [errors, setErrors] = useState({});
  const [termsAgreed,setTermsAgreed] = useState(false);
  const completePayment = async () => {
    try {
      const response = await fetch('http://localhost:5000/complete-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "username":formData.username }),
      });

      if (response.status===200) {
        setErrors((prevErrors) => ({ ...prevErrors, payment: '' }));
        alert("Enrollment and Fee Payment for this month is successfull.")
        navigate('/');
      } else {
        const data = await response.json();
        setErrors({ ...errors, payment: 'Payment Failed for now, try again later!' });
      }
    } catch (error) {
      console.error('Error during Payment:', error);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
      valid = false;
    }else if(formData.username.trim().length<6 || formData.username.trim().length>24){
      newErrors.username = 'Username must be of length 6-24';
      valid = false;
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
      valid = false;
    }else if(formData.password.trim().length<8 || formData.password.trim().length>16){
      newErrors.password = 'Password must be of length 8-16';
      valid = false;
    }

    if (formData.password.trim() !== formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }
    let regex = /^[a-zA-Z]+$/;
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }else if(!regex.test(formData.name.trim())){
      newErrors.name = 'Name must contain letters';
      valid = false;
    }

    const age = parseInt(formData.age, 10);
    if (isNaN(age) || age < 18 || age > 65) {
      newErrors.age = 'Age should be an integer between 18 and 65.';
      valid = false;
    }
    let regex_contact = /^\d+$/;
    if (!formData.contact.trim()) {
      newErrors.contact = 'Contact is required';
      valid = false;
    }else if(formData.contact.trim().length!=10 || !regex_contact.test(formData.contact.trim())){
      newErrors.contact = 'Contact must contain digits and length must be 10';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:5000/create_user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: formData.username.trim(),
            password: formData.password.trim(),
            name: formData.name.trim(),
            age: formData.age,
            contact: formData.contact.trim(),
            batch: formData.batch,
          }),
        });
  
        if (response.status === 201) {
          console.log('User created successfully:', formData);
          if (enrollAndPayLater) {
            console.log('Enroll and Pay Later');
            alert("Enrollment is successfull. You can pay fees later!");
            navigate('/')
          } else {
            console.log('Enroll and Pay Now');
            completePayment();
          }
        } else if (response.status === 401) {
          const data = await response.json();
          console.error('User already exists:');
          setErrors({ ...errors, username: 'User already exists' });
        } else {
          const data = await response.json();
          console.error('Error creating user:', data.message || 'Unknown error');
        }
      } catch (error) {
        console.error('Error during user creation:', error);
      }
    } else {
      console.log('Form has errors. Please fix them before submitting.');
    }
  };
  

  return (
    <div className="container mt-5">
      <div className="card p-4">
      <h2 className="text-center mb-4">New Admission</h2>
      {termsAgreed?(<>
      <form onSubmit={handleSubmit} className="px-30">
          <div className="form-group">
            <label htmlFor="username">
              Username <span className="text-danger">*</span>:
              <span
                className="ml-1"
                data-toggle="tooltip"
                data-placement="right"
                title="Username must be of length 6-24."
              >
                ℹ️
              </span>
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className={`form-control ${errors.username ? 'is-invalid' : ''}`}
            />
            {errors.username && <div className="invalid-feedback text-danger">{errors.username}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="password">
              Password <span className="text-danger">*</span>:
              <span
                className="ml-1"
                data-toggle="tooltip"
                data-placement="right"
                title="Password must be 8-16 characters long."
              >
                ℹ️
              </span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            />
            {errors.password && <div className="invalid-feedback text-danger">{errors.password}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmpassword">
              Confirm Password <span className="text-danger">*</span>:
              <span
                className="ml-1"
                data-toggle="tooltip"
                data-placement="right"
                title="Confirm Password must match above password."
              >
                ℹ️
              </span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
            />
            {errors.confirmPassword && <div className="invalid-feedback text-danger">{errors.confirmPassword}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="Name">
              Name <span className="text-danger">*</span>:
              <span
                className="ml-1"
                data-toggle="tooltip"
                data-placement="right"
                title="Enter your name."
              >
                ℹ️
              </span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            />
            {errors.name && <div className="invalid-feedback text-danger">{errors.name}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="Age">
              Age <span className="text-danger">*</span>:
              <span
                className="ml-1"
                data-toggle="tooltip"
                data-placement="right"
                title="Age should be integer. Allowed age is between 18-65."
              >
                ℹ️
              </span>
            </label>
            <input
              type="text"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              className={`form-control ${errors.age ? 'is-invalid' : ''}`}
            />
            {errors.age && <div className="invalid-feedback text-danger">{errors.age}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="contact">
              Contact <span className="text-danger">*</span>:
              <span
                className="ml-1"
                data-toggle="tooltip"
                data-placement="right"
                title="Enter your phone number. Should only contain 10 digits without country code."
              >
                ℹ️
              </span>
            </label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              className={`form-control ${errors.contact ? 'is-invalid' : ''}`}
            />
            {errors.contact && <div className="invalid-feedback text-danger">{errors.contact}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="batch">
              Current Batch <span className="text-danger">*</span>:
              <span
                className="ml-1"
                data-toggle="tooltip"
                data-placement="right"
                title="Select batch for yoga class."
              >
                ℹ️
              </span>
            </label>
            <select
              name="batch"
              value={formData.currentBatch}
              onChange={handleInputChange}
              className={`form-control ${errors.currentBatch ? 'is-invalid' : ''}`}
            >
              <option value="" disabled>Select a Batch</option>
              <option value={1}>6-7AM</option>
              <option value={2}>7-8AM</option>
              <option value={3}>8-9AM</option>
              <option value={4}>5-6PM</option>
            </select>
            {errors.currentBatch && (
              <div className="invalid-feedback text-danger">{errors.currentBatch}</div>
            )}
          </div>

          <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-secondary mr-2" onClick={() => setEnrollAndPayLater(true)}>
                Enroll and Pay Later
              </button>
              <button type="submit" className="btn btn-primary mr-2" onClick={() => setEnrollAndPayLater(false)}>
                Enroll and Pay Now
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>
                Back to Home
              </button>
            </div>
        </form>
      </>):(<>
      <div className="terms-container jumbotron">
        <h3 className='text-center'>Terms and Conditions for Admission</h3>
        <ul>
          <li>
            Participant's age must be between the range 18-65.
          </li>
          <li>
            The classes will be conducted in four batches, Participant can enroll in any one of them. 
            <ol>
              <li>
                6-7 AM
              </li>
              <li>
                7-8 AM
              </li>
              <li>
                8-9 AM
              </li>
              <li>
                5-6 PM
              </li>
            </ol>
          </li>
          <li>
            Participant can enroll any day of the month. But need to pay fees for entire month, i.e. INR 500/-. Participant is also provide with an option of enroll now and pay later.
          </li>
          <li>
            Participant can pay current month fees any time by the end of that month by logging in to their account.
          </li>
          <li>
            Participant cannot pay fees in advance, as fees has to be paid month on month basis.
          </li>
          <li>
            If participant misses to pay fees for current month, next month classes for participant will be suspended, to resume contact Flex Yoga Class administrator.
          </li>
          <li>
            Participant cannot change batch for current month. But will be able to change batch for upcoming month only.
          </li>
        </ul>
        <div className="d-flex justify-content-center mt-3">
            <button type="submit" className="btn btn-primary mr-2" onClick={() => setTermsAgreed(true)}>
              Agree and Continue
            </button>
            <button type="submit" className="btn btn-secondary" onClick={() => navigate('/')}>
              Back to Home
            </button>
        </div>
      </div>
      </>)}
      </div>
    </div>
  );
};

export default NewAdmission;
