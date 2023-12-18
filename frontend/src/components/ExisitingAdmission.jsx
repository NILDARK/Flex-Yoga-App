import React, { useState, useEffect } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import Login from './Login';
import BatchChange from './BatchChange';
import PaymentPage from './PaymentPage';
import '../styles/ExisitingAdmission.css';

const ExistingAdmission = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [loggedUser,setLoggedUser] = useState("");
  const [isActive,setIsActive] = useState(true);
  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      setLoggedIn(true);
      setLoggedUser(storedUser);
    }
  }, []);
  const handleLogin = ({username}) => {
    setLoggedUser(username);
    setLoggedIn(true);
    localStorage.setItem('loggedInUser', username);
  };
  const getActiveStatus = async () => {
    if(loggedUser===""){
      return;
    }
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/get-active-status?username=${loggedUser}`);        if (response.status === 200) {
        const data = await response.json();
        setIsActive(data.is_active||false)
      } else {
        const data = await response.json();
        console.error('Error fetching active status:', data.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Error during fetch:', error);
    }
  }

  useEffect(()=>{
    getActiveStatus();
  },[loggedUser]);

  const handleLogout = () => {
    setLoggedIn(false);
    setLoggedUser("");
    localStorage.removeItem('loggedInUser');
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Existing Admission</h2>
      {isLoggedIn ? (
        <div>
          <p>{loggedUser}! You are logged in!</p>
          {isActive ? (
            // <div className="row">
            //   <div className="col-md-6 jumbotron">
            //     <BatchChange userName={loggedUser} />
            //   </div>
            //   <div className="col-md-6 jumbotron">
            //     <PaymentPage userName={loggedUser} />
            //   </div>
            // </div>
            <div className="parent-div">
            <div className="child-div">
              <BatchChange userName={loggedUser} />
            </div>
            <div className="child-div">
              <PaymentPage userName={loggedUser} />
            </div>
          </div>
          ) : (
            <p style={{ color: 'red' }}>Your yoga classes are temporarily suspended due to fee dues for previous months, contact administrator for lifting suspension.</p>
          )}
          <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <Login onLogin={handleLogin} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ExistingAdmission;
