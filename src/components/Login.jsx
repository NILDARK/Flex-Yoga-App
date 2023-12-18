import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "username":username, "password":password }),
      });

      if (response.status===200) {
        onLogin({username}); // Call the onLogin function passed as a prop
      } else {
        const data = await response.json();
        setError(data.message || 'Invalid Credentials');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h3>Login</h3>
      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className='button-container'>
      <button className="btn btn-primary" onClick={handleLogin}>
        Login
      </button>
      <button className="btn btn-secondary" onClick={()=>{navigate('/')}}>
        Back to Home
      </button>
      </div>
      {error && <p className="mt-2" style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;
