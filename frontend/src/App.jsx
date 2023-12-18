// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './components/HomePage';
import ExistingAdmission from './components/ExisitingAdmission';
import NewAdmission from './components/NewAdmission';
import BatchChange from './components/BatchChange';
import PaymentPage from './components/PaymentPage';

function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(true);

  // const handleLogin = () => {
  //   // Simplified login logic, set to true for demonstration purposes
  //   setIsLoggedIn(true);
  // };

  // const handleLogout = () => {
  //   // Simplified logout logic, set to false for demonstration purposes
  //   setIsLoggedIn(false);
  // };

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/existing-admission" element={<ExistingAdmission/>} />
          <Route path="/new-admission" element={<NewAdmission />} />
        <Route path="/batch-change" element={<BatchChange/>} />
        <Route path="/payment" element={<PaymentPage/>} />
      
        </Routes>
    </BrowserRouter>
  );
};

export default App;
