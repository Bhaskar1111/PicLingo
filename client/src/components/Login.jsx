import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import 'aos/dist/aos.css';
import gif from '../assets/login.gif'
import Aos from 'aos';
const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Login Request Payload:', formData); // Log the request payload
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      console.log("done")
      navigate('/');
    } catch (err) {
      console.log('Login Error:', err.response); // Log the error response
      setError('Login failed. Please check your credentials or sign up if you are not registered.');
    }
  };
  useEffect(()=>{
    Aos.init({duration:"2000"})
  }
  ,[])
  return (
  <div className="flex items-center justify-center min-h-screen">
   <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-sm w-full " data-aos="zoomin">
    <form className="space-y-6" onSubmit={onSubmit}>
      <div className="flex items-center justify-center space-x-2">
        <svg className="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
          <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
        </svg>
        <h2 className="text-2xl font-bold text-white">Login</h2>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <input 
        type="email" 
        name="email" 
        value={formData.email} 
        onChange={onChange} 
        placeholder="Email" 
        required 
        className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
      />
      <input 
        type="password" 
        name="password" 
        value={formData.password} 
        onChange={onChange} 
        placeholder="Password" 
        required 
        className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
      />
      <button 
        type="submit" 
        className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Login
      </button>
      <p className="text-white text-center">
        Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign up here</Link>
      </p>
    </form>
  </div>
</div>

  );
};

export default Login;
