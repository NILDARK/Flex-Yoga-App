// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './components/HomePage';
import ExistingAdmission from './components/ExisitingAdmission';
import NewAdmission from './components/NewAdmission';
import BatchChange from './components/BatchChange';
import PaymentPage from './components/PaymentPage';
import NotFound from './components/NotFound';

function App() {

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/existing-admission" element={<ExistingAdmission/>} />
          <Route path="/new-admission" element={<NewAdmission />} />
        <Route path="/batch-change" element={<BatchChange/>} />
        <Route path="/payment" element={<PaymentPage/>} />
        <Route path="*" element={<NotFound/>} />
        </Routes>
    </BrowserRouter>
  );
};

export default App;
