import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(''); // State to store error message
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError(''); // Reset the error before making the request

    try {
      const response = await axios.post('https://time-table-viewer-t8n7.vercel.app/api/login', { email, password });
      localStorage.setItem('token', response.data.token); // Store token in localStorage
      navigate('/adminPanel');
    } catch (err) {
      console.error("Full error object:", err);
      if (err.response) {
        console.error("Error response data:", err.response.data);
        setLoginError(err.response?.data?.error || 'Login failed. Please try again.'); // Set error message
      } else {
        setLoginError('Network error. Please check your connection.'); // Set network error message
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          
          {/* Display error message if there is one */}
          {loginError && (
            <div className="text-red-500 text-sm mb-4">{loginError}</div>
          )}
          
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
