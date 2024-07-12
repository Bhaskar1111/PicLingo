// src/components/CameraCapture.jsx
import React, { useState, useCallback, useRef } from 'react';
import axios from 'axios';
import LanguagesSelect from './LanguagesSelect';
import '../Styles/Home1.css';
import _ from 'lodash';
import Tesseract from 'tesseract.js';

const CameraCapture = () => {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('te'); // Use Tesseract language codes
  const [targetLang, setTargetLang] = useState('eng'); // Update to correct code
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  // Function to handle text translation
  const handleTranslate = async (text) => {
    setIsLoading(true);
    try {
      console.log('Text to translate:', text);
      const response = await axios.post('https://multilingual-text-and-speech-translator.onrender.com/translate-text', {
        text,
        sourceLang,
        targetLang,
      });
      setTranslatedText(response.data.translatedText);
      console.log('Translated text:', response.data.translatedText);
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

  // Function to handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const image = new Image();
        image.onload = () => {
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.width = image.width;
          canvas.height = image.height;
          context.drawImage(image, 0, 0);
          canvas.toBlob(async (blob) => {
            try {
              console.log('Running OCR...');
              const { data: { text } } = await Tesseract.recognize(blob, sourceLang, {
                logger: (m) => console.log(m), // Add logger to see progress
                langPath: '/tessdata', // Ensure this path is correct and accessible
              });
              setSourceText(text);
              console.log('Extracted text:', text);
              debouncedTranslate(text);
            } catch (error) {
              console.error('OCR error:', error);
            }
          });
        };
        image.src = reader.result;
      };
      reader.readAsDataURL(file);
    }
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
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageUpload}
          />
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
