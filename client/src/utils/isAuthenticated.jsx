// src/utils/isAuthenticated.js
const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token; // returns true if token exists, false otherwise
  };
  
  export default isAuthenticated;
  