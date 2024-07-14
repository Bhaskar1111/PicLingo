import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
            <p><b>Original:</b> {item.originalText}</p>
            <p><b>Translated:</b> {item.translatedText}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;
