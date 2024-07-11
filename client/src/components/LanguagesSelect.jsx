import React, { useState } from "react";
import data from "../assets/data.json";
import '../Styles/Home1.css';

const LanguagesSelect = ({ selectedLang, setLang }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (languageCode, languageName) => {
    setLang(languageCode);
    setIsOpen(false);
  };

  return (
    <div className="custom-select-wrapper">
      <div className="custom-select" onClick={() => setIsOpen(!isOpen)}>
        <div className="custom-select-trigger">
          {data.languages[selectedLang] || "Select a language"}
        </div>
        {isOpen && (
          <div className="custom-options">
            {Object.keys(data.languages).map((key) => (
              <div
                key={key}
                className="custom-option"
                onClick={() => handleOptionClick(key, data.languages[key])}
                id="option">
                {data.languages[key]}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguagesSelect;
