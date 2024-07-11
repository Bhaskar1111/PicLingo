import React, { useState, useCallback } from 'react';
import axios from 'axios';
import LanguagesSelect from './LanguagesSelect';
import '../Styles/Home1.css';
import _ from 'lodash';

const Home1 = () => {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('te');
  const [isLoading, setIsLoading] = useState(false);

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

  // Create a debounced version of handleTranslate
  const debouncedTranslate = useCallback(_.debounce(handleTranslate, 500), [sourceLang, targetLang]);

  const handleSourceTextChange = (e) => {
    const text = e.target.value;
    setSourceText(text);
    debouncedTranslate(text);
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
          <button>
            Copy
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home1;
