import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../Styles/signup.css';
import signimg from '../assets/signup.png';
import 'aos/dist/aos.css';
import Aos from 'aos';




const Signup = () => {
  useEffect(()=>{
    Aos.init({duration:"2000"})
  }
  ,[])
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      console.log('Signup Error Response:', err.response);
      setError(err.response.data.msg || 'Signup failed. Please try again.');
    }
  };
  

  const navi = () => {
    console.log("clicked");
    navigate('/login');
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
    
  <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-sm w-full" data-aos="zoomin" >
    <form className="space-y-6" onSubmit={onSubmit}>
      <h2 className="text-2xl font-bold text-white text-center">Signup</h2>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <input 
        type="text" 
        name="name" 
        value={formData.name} 
        onChange={onChange} 
        placeholder="Name" 
        required 
        className="w-full p-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500" 
      />
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
        Sign Up
      </button>
      <p className="text-white text-center">
        Already have an account? <Link to='/login' className="text-blue-500 hover:underline">Login Here</Link>
      </p>
    </form>
  </div>
</div>

  );
};

export default Signup;
