import React, { useState, useCallback } from 'react';
import axios from 'axios';
import LanguagesSelect from './LanguagesSelect';
import '../Styles/Home1.css';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import Features from './Features';

const Home1 = () => {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('te');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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

  const debouncedTranslate = useCallback(_.debounce(handleTranslate, 500), [sourceLang, targetLang]);

  const handleSourceTextChange = (e) => {
    const text = e.target.value;
    setSourceText(text);
    debouncedTranslate(text);
  };

   const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/translations/save', 
      {
        originalText: sourceText,
        translatedText,
      }, 
      {
        headers: {
          'x-auth-token': token
        }
      });
      alert('Translation saved successfully.');
    } catch (error) {
      console.error('Failed to save translation:', error);
      alert('Failed to save translation.');
    }
  };

  const handleClearHistory = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete('http://localhost:5000/api/translations/clear', {
        headers: {
          'x-auth-token': token
        }
      });
      alert('History cleared successfully.');
    } catch (error) {
      console.error('Failed to clear history:', error);
      alert('Failed to clear history.');
    }
  };

  const handleViewHistory = () => {
    navigate('/history');
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <h1 className="text-4xl font-bold text-white mb-8">Text Translation</h1>
      <div className="w-full max-w-4xl bg-gray-800 p-8 rounded-lg shadow-lg border-2 border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col space-y-6">
            <LanguagesSelect
              selectedLang={sourceLang}
              setLang={setSourceLang}
              className="w-full p-3 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-gray-600"
            />
            <textarea
              value={sourceText}
              placeholder="Something to Translate..."
              onChange={handleSourceTextChange}
              rows="6"
              className="w-full p-4 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-gray-600"
            />
          </div>
          <div className="flex flex-col space-y-6 relative">
            <LanguagesSelect
              selectedLang={targetLang}
              setLang={setTargetLang}
              className="w-full p-3 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-gray-600"
            />
              <textarea
                value={translatedText}
                readOnly
                rows="6"
                className="w-full p-4 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500 border-2 border-gray-600"
                style={{ color: isLoading ? "transparent" : "white" }} // Hides the text during loading
              />
              {isLoading && (
                <div className=" absolute inset-0 flex items-center justify-center bg-opacity-75">
                  <section className="dots-container">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                  </section>
                </div>
              )}
            
            <button
            className="px-6 py-2  text-center text-white bg-violet-600 border border-violet-600 rounded active:text-violet-500 hover:bg-transparent hover:text-violet-600 focus:outline-none focus:ring"
            onClick={() => navigator.clipboard.writeText(translatedText)}
           >
          Copy
        </button>

          </div>
        </div>
        <div className="mt-8 flex space-x-6 justify-center">
          <button
            className="px-3 py-1  max-w-100 text-center text-white bg-green-600 border border-violet-600 rounded active:text-violet-500 hover:bg-transparent hover:text-violet-600 focus:outline-none focus:ring"
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="px-6 py-2  text-center text-white bg-red-600 border border-violet-600 rounded active:text-violet-500 hover:bg-transparent hover:text-violet-600 focus:outline-none focus:ring"
            onClick={handleClearHistory}
          >
            Clear History
          </button>
          <button
            className="px-6 py-2  text-center text-white bg-violet-600 border border-violet-600 rounded active:text-violet-500 hover:bg-transparent hover:text-violet-600 focus:outline-none focus:ring"
            onClick={handleViewHistory}
          >
            View History
          </button>
        </div>
      </div>
     
    </div>
  );
};

export default Home1;
