import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const navigate = useNavigate();  // Initialize useNavigate

  function handleSubmit(e) {
    e.preventDefault();

    const userData = {
      username,
      email,
      password,
    };

    fetch('http://localhost:8070/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'ok') {
          toast.success('Login successful');
          localStorage.setItem('adminId', data._id);
          setTimeout(() => {
            navigate('/admin/dashboard');  // Navigate to dashboard after 500ms delay
          }, 500);
        } else {
          throw new Error(data.error || 'Login failed');
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }

  return (
    <div className="login-main-container">
      <div className="login-image">
        <img
          src="https://images.squarespace-cdn.com/content/v1/5fc881f0a8a7305318af122b/1611636539092-3A1YPLWHFOFMHBEQ09M2/YRECentral_Your-admin-simplified.gif"
          alt="Login"
          className="img-login"
        />
      </div>
      <div className="login-inner-container">
        <form onSubmit={handleSubmit}>
          <h3>Sign In</h3>

          <div className="username">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="email">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="password">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="checkbox-container">
            <input type="checkbox" id="rememberMe" />
            <label className="admin-checkbox" htmlFor="rememberMe">Remember me</label>
          </div>

          <div className="login-button-container">
            <button type="submit" className="login-button">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
