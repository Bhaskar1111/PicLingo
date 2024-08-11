import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../Styles/App.css'
const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/translations/history', {
          headers: {
            'x-auth-token': token
          }
        });
        setHistory(response.data);
      } catch (error) {
        console.error('Failed to fetch history:', error);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div>
      <h1>Translation History</h1>
      <ul>
        {history.map((item) => (
          <li key={item._id}>
            <h2><b>Original:</b> {item.originalText}</h2>
            <h2><b>Translated:</b> {item.translatedText}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;
