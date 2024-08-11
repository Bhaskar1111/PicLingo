import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNav from './BottomNav';
import '../Styles/MainHome.css';
import Lottie from "lottie-react";
import 'aos/dist/aos.css';

import Aos from 'aos';

import animationData from '../assets/Animation - 1723121703012.json'; // Import your Lottie animation

const words = [

  {
    title: "Photographer",
    heading: "Universal Translation with Piclingo",
    content: "Capture, type – Piclingo translates it all. Experience seamless communication."
  }
];

function MainHome() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [fadeClass, setFadeClassName] = useState('');
  const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };
  useEffect(() => {
    Aos.init({duration:2000});
     // Clean up interval on component unmount
  }, []);

  return (
    <div className="MainHome p-6 text-white">
      <div className="imgcnt flex flex-col md:flex-row items-center justify-between">
        <div id="words" className="flex flex-col md:ml-8 gap-4">
        <div className='flex flex-col gap-5' data-aos="fadein">
          <span className="text-5xl font-bold mb-4">{words[index].heading}</span>
          <p className="text-lg mb-6">{words[index].content}</p>
        </div>
          <div id="btncls" className="flex flex-col content-start md:flex-row gap-4 justify-start">
            <button
              onClick={() => navigate('/home1')}
              className="cssbuttons-io-button"
            >
              Text
              <div className="icon">
                <svg
                  height="24"
                  width="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path
                    d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </button>
            <button
              onClick={() => navigate('/home2')}
              className="cssbuttons-io-button"
            >
              Upload-pic
              <div className="icon">
                <svg
                  height="24"
                  width="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 0h24v24H0z" fill="none"></path>
                  <path
                    d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </button>
          </div>
        </div>
        {/* Lottie animation instead of static image */}
        <Lottie animationData={animationData} 
          className='w-full h-full'
        />
      </div>
      <BottomNav />
    </div>
  );
}

export default MainHome;
