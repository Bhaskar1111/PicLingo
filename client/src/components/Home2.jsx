// src/components/CameraCapture.jsx
import React, { useState, useRef, useCallback } from 'react';
import Tesseract from 'tesseract.js';
import axios from 'axios';
import _ from 'lodash';
import LanguagesSelect from './LanguagesSelect';
import '../Styles/Home1.css';

const CameraCapture = () => {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('te');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  // Function to handle text extraction from image
  const handleExtractText = async () => {
    setIsLoading(true);
    try {
      const file = fileInputRef.current?.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const image = new Image();
          image.onload = async () => {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = image.width;
            canvas.height = image.height;
            context.drawImage(image, 0, 0);
            const dataUrl = canvas.toDataURL('image/png');
            try {
              const { data: { text } } = await Tesseract.recognize(dataUrl, 'eng', {
                logger: (m) => console.log(m), // Log progress
                langPath: '/tessdata', // Path to the directory containing trained data files
              });
              setSourceText(text);
              handleTranslate(text);
            } catch (error) {
              console.error('OCR error:', error);
            }
          };
          image.src = reader.result;
        };
        reader.readAsDataURL(file);
      }
    } catch (error) {
      console.error('Extraction error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle text translation
  const handleTranslate = async (text) => {
    setIsLoading(true);
    try {
      const response = await axios.post('https://multilingual-text-and-speech-translator.onrender.com/translate-text', {
        text,
        sourceLang,
        targetLang,
      });
      setTranslatedText(response.data.translatedText);
    } catch (error) {
      console.error('Translation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Create a debounced version of handleTranslate
  const debouncedTranslate = useCallback(_.debounce(handleTranslate, 500), [sourceLang, targetLang]);

  const handleSourceTextChange = (e) => {
    const text = e.target.value;
    setSourceText(text);
    debouncedTranslate(text);
  };

  return (
    <div className='Trans'>
      <h1>Text Extraction and Translation</h1>
      <div className='Trans_main'>
        <div className='Sub_main'>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
          />
          <button onClick={handleExtractText}>
            Extract
          </button>
          <LanguagesSelect selectedLang={sourceLang} setLang={setSourceLang} />
          <textarea
            value={sourceText}
            onChange={handleSourceTextChange}
            rows="4"
            cols="50"
            placeholder='Extracted text will appear here...'
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
          <button onClick={() => navigator.clipboard.writeText(translatedText)}>
            Copy
          </button>
        </div>
      </div>
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default CameraCapture;
