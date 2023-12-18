// src/components/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Welcome to Flex Yoga Admission Portal</h2>
      <div className="jumbotron">
        <p className="lead">Experience the serenity and flexibility at Flex Yoga classes. Our classes are designed to enhance your physical and mental well-being.</p>
        <p>Join us today and embark on a journey to a healthier and more balanced life.</p>
      </div>
      <div className="text-center">
        <p className="mb-4">
          <Link to="/existing-admission" className="btn btn-primary btn-lg mr-3">
            Existing Admission
          </Link>
        </p>
        <p>
          <Link to="/new-admission" className="btn btn-success btn-lg">
            New Admission
          </Link>
        </p>
      </div>
    </div>
  );
};

export default HomePage;
