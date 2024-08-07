import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from './BottomNav';
import mainThemeGif from '../assets/MainTheme.gif';
import '../Styles/MainHome.css';
import { ThreeDCardDemo } from './3dcard';
import Spline from '@splinetool/react-spline';
import svg from "../assets/mainimg.svg"
const words = [
  {
    title: "Ui / UX Design",
    heading: "Piclingo: Translate Anything",
    content: "Effortlessly translate pictures, text, and audio with Piclingo. Break language barriers instantly!"
  },
  {
    title: "Photographer",
    heading: "Universal Translation with Piclingo",
    content: "Capture, type, or speak – Piclingo translates it all. Experience seamless communication."
  }
];

function MainHome() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [fadeClass, setFadeClass] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeClassName(''); // Reset fade class
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % words.length);
        setFadeClassName('fade');
      }, 1000); // Transition delay
    }, 7000); // Change text every 7 seconds

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  return (
    <div className='MainHome'>
      <div className='imgcnt'>
      
        <img src={svg} alt='Main Theme' className='imgcontent' />
        <div id="words" className={fadeClass}>
          <span id='head'>{words[index].heading}</span>
          <p>{words[index].content}</p>
        </div>
      </div>
      <div id='btncls'>
        <span className='btn' onClick={() => navigate('/')}>
         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-megaphone" viewBox="0 0 16 16">
            <path d="M13 2.5a1.5 1.5 0 0 1 3 0v11a1.5 1.5 0 0 1-3 0v-.214c-2.162-1.241-4.49-1.843-6.912-2.083l.405 2.712A1 1 0 0 1 5.51 15.1h-.548a1 1 0 0 1-.916-.599l-1.85-3.49-.202-.003A2.014 2.014 0 0 1 0 9V7a2.02 2.02 0 0 1 1.992-2.013 75 75 0 0 0 2.483-.075c3.043-.154 6.148-.849 8.525-2.199zm1 0v11a.5.5 0 0 0 1 0v-11a.5.5 0 0 0-1 0m-1 1.35c-2.344 1.205-5.209 1.842-8 2.033v4.233q.27.015.537.036c2.568.189 5.093.744 7.463 1.993zm-9 6.215v-4.13a95 95 0 0 1-1.992.052A1.02 1.02 0 0 0 1 7v2c0 .55.448 1.002 1.006 1.009A61 61 0 0 1 4 10.065m-.657.975 1.609 3.037.01.024h.548l-.002-.014-.443-2.966a68 68 0 0 0-1.722-.082z"/>
          </svg>
          Audio
        </span>
        <span className='btn' onClick={() => navigate('/home2')}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
            <path d="M480-260q75 0 127.5-52.5T660-440q0-75-52.5-127.5T480-620q-75 0-127.5 52.5T300-440q0 75 52.5 127.5T480-260Zm0-80q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM160-120q-33 0-56.5-23.5T80-200v-480q0-33 23.5-56.5T160-760h126l74-80h240l74 80h126q33 0 56.5 23.5T880-680v480q0 33-23.5 56.5T800-120H160Zm0-80h640v-480H638l-73-80H395l-73 80H160v480Zm320-240Z"/>
          </svg>
          Camera
        </span>
        <span className='btn' onClick={() => navigate('/home1')}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
            <path d="M160-400v-80h280v80H160Zm0-160v-80h440v80H160Zm0-160v-80h440v80H160Zm360 560v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T863-380L643-160H520Zm300-263-37-37 37 37ZM580-220h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19Z"/>
          </svg>
          Text
        </span>
      </div>
      <BottomNav />
    </div>
  );
}

export default MainHome;
