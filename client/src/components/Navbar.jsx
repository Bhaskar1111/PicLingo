import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate
import '../Styles/Navbar.css';

function Navbar() {
  const navigate = useNavigate(); // React Router's navigate function

  const handleLogout = () => {
    // Perform logout actions here, such as clearing local storage or making an API call to invalidate the token
    localStorage.removeItem('token'); // Example: Remove token from localStorage

    // Redirect to the login page after logout
    navigate('/login'); // Redirect to login page
  };

  return (
    <>
      <div className='Navbar'>
        <div className='section1'>
          <h1><b className='red'>P</b>iclingo</h1>
        </div>
        <div className='section2'>
          {/* Add logout button/link here */}
          <button onClick={handleLogout} className='logout-button'>Logout</button>
        </div>
      </div>
    </>
  );
}

export default Navbar;
