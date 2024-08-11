// src/components/CameraCapture.jsx
import React, { useState, useRef, useCallback } from 'react';
import Tesseract from 'tesseract.js';
import axios from 'axios';
import _ from 'lodash';
import LanguagesSelect from './LanguagesSelect';


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
    <div className="p-8 text-white">
  <h1 className="text-3xl font-bold mb-6 text-center">Text Extraction and Translation</h1>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    <div className="p-6 bg-gray-800 rounded-lg shadow-lg flex flex-col">
    <div className='flex flex-row'>
    <div className='justify-center align-middle flex flex-col'>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="block w-half text-lg text-gray-500 file:mr-4 file:py-3 file:px-2 file:rounded-lg file:border-0 file:text-lg file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
      />
      <button
        onClick={handleExtractText}
        className="mt-6 w-20 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-2 rounded-lg text-lg transition duration-300"
      >
        Extract
      </button>
      </div>
      <div className="">
        <LanguagesSelect selectedLang={sourceLang} setLang={setSourceLang} />
      </div>
      </div>
      <textarea
        value={sourceText}
        onChange={handleSourceTextChange}
        rows="5"
        placeholder="Extracted text will appear here..."
        className="mt-6 w-full p-3 bg-gray-700 rounded-lg border border-gray-600 text-lg focus:outline-none focus:border-blue-500"
      />
    </div>
    <div className="p-6 bg-gray-800 rounded-lg shadow-lg flex flex-col">
      <LanguagesSelect selectedLang={targetLang} setLang={setTargetLang} />
      <textarea
        value={translatedText}
        readOnly
        rows="5"
        className="mt-6 w-full p-3 bg-gray-700 rounded-lg border border-gray-600 text-lg focus:outline-none focus:border-blue-500"
      />
      <button
        onClick={() => navigator.clipboard.writeText(translatedText)}
        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg text-lg transition duration-300"
      >
        Copy
      </button>
    </div>
  </div>
  {isLoading && <p className="mt-6 text-center text-lg text-gray-400">Loading...</p>}
</div>


  );
};

export default CameraCapture;
