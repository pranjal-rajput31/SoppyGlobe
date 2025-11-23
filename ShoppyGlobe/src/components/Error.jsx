import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Error.css';

function Error() {
    // Hooks
  const navigate = useNavigate();
  // Render
  return (
    <div className="error-page">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist or an error occurred.</p>
      <button className="error-home-btn" onClick={() => navigate('/')}>Go to Home</button>
    </div>
  );
}

export default Error;
