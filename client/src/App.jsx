import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home1 from './components/Home1';
import MainHome from './components/MainHome';
import CameraCapture from './components/Home2';
import Login from './components/Login';
import Signup from './components/Signup';
import History from './components/History';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Navbar />
        <Routes>
          <Route path="/home1" element={<PrivateRoute element={<Home1 />} />} />
          <Route path="/" element={<PrivateRoute element={<MainHome />} />} />
          <Route path="/home2" element={<PrivateRoute element={<CameraCapture />} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/history" element={<PrivateRoute element={<History />} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
