import React, { useState, useCallback } from 'react';
import axios from 'axios';
import LanguagesSelect from './LanguagesSelect';
import '../Styles/Home1.css';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';

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
      <button onClick={handleSave}>Save</button>
      <button onClick={handleClearHistory}>Clear History</button>
      <button onClick={handleViewHistory}>View History</button>
    </div>
  );
};

export default Home1;
