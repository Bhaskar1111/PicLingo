import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'
import Home1 from './components/Home1';

import MainHome from './components/MainHome';
import CameraCapture from './components/Home2';
function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Navbar />
        <Routes>
          <Route path="/home1" element={<Home1 />} />
          <Route path="/" element={<MainHome />} />
          <Route path="/home2" element={<CameraCapture/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
