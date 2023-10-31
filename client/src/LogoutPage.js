import React from 'react';

function LogoutPage() {
  const handleLogout = () => {
    // For demonstration purposes, let's assume you clear a token in localStorage.
    localStorage.removeItem('userToken');

    // Redirect the user to the login page or any other appropriate page.
    window.location.href = '/login';
  };

  return (
    <div className="logout-container">
      <div className="logout-card">
        <h2>Logout</h2>
        <p>Are you sure you want to log out?</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default LogoutPage;
