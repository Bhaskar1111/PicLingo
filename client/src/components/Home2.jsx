import React, { useState, useCallback, useRef } from 'react';
import axios from 'axios';
import LanguagesSelect from './LanguagesSelect';
import '../Styles/Home1.css';
import _ from 'lodash';
import Tesseract from 'tesseract.js';

const CameraCapture = () => {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('te');
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Function to handle text translation
  const handleTranslate = async (text) => {
    setIsLoading(true);
    try {
      console.log(text);
      const response = await axios.post('https://multilingual-text-and-speech-translator.onrender.com/translate-text', {
        text,
        sourceLang,
        targetLang,
      });
      setTranslatedText(response.data.translatedText);
      console.log(response.data.translatedText);
    } catch (error) {
      console.error('Translation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounce the translation function
  const debouncedTranslate = useCallback(_.debounce(handleTranslate, 500), [sourceLang, targetLang]);

  // Function to handle source text change
  const handleSourceTextChange = (e) => {
    const text = e.target.value;
    setSourceText(text);
    debouncedTranslate(text);
  };

  // Function to start camera and capture photo
  const startCamera = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      })
      .catch((error) => {
        console.error('Camera error:', error);
      });
  };

  // Function to capture image from the camera and process it
  const captureImage = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob(async (blob) => {
      try {
        const { data: { text } } = await Tesseract.recognize(blob, sourceLang);
        setSourceText(text);
        debouncedTranslate(text);
      } catch (error) {
        console.error('OCR error:', error);
      }
    });
  };

  return (
    <div className='Trans'>
      <h1>Text Translation</h1>
      <div className='Trans_main'>
        <div className='Sub_main'>
          <LanguagesSelect selectedLang={sourceLang} setLang={setSourceLang} />
          <textarea
            value={sourceText}
            placeholder='Something to Translate....'
            onChange={handleSourceTextChange}
            rows="4"
            cols="50"
            readOnly
          />
          <button onClick={startCamera}>
            Start Camera
          </button>
          <button onClick={captureImage}>
            Capture Image
          </button>
          <video ref={videoRef} style={{ display: 'none' }}></video>
          <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
        </div>
        <div className='Sub_main' id='green'>
          <LanguagesSelect selectedLang={targetLang} setLang={setTargetLang} />
          <textarea
            value={translatedText}
            readOnly
            rows="4"
            cols="50"
          />
          <button
            onClick={() => {
              navigator.clipboard.writeText(translatedText);
              alert('Text copied to clipboard');
            }}
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
};

export default CameraCapture;
