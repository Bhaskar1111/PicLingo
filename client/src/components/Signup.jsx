import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
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

  return (
    <div className="signup-container">
      <form onSubmit={onSubmit}>
        <h2>Signup</h2>
        {error && <p className="error-message">{error}</p>}
        <input type="text" name="name" value={formData.name} onChange={onChange} placeholder="Name" required />
        <input type="email" name="email" value={formData.email} onChange={onChange} placeholder="Email" required />
        <input type="password" name="password" value={formData.password} onChange={onChange} placeholder="Password" required />
        <button type="submit">Signup</button>
      </form>
      <p>Already have an account? <Link to="/login">Login here</Link></p>
    </div>
  );
};

export default Signup;
