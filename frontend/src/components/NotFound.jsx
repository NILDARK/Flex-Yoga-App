// src/components/NotFound.jsx
import React from 'react';

const NotFound = () => {
  return (
    <>
    <div className="container mt-5">
      <h1 className="text-center display-1">404</h1>
      <div className="text-center">
        <p className="lead">Page Not Found</p>
        <p className="text-muted">Sorry, the page you are looking for might be in another universe.</p>
      </div>
    </div>
    </>
  );
};

export default NotFound;
