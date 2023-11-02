import React from 'react';
import { fetchUserProfile } from './profile.js';

function fetchUserProfile() {
    fetch('/profile', {
      method: 'GET',
      credentials: 'same-origin',
    })
      .then(response => {
        if (response.ok) {
          return response.json(); 
        } else {
          console.error('Failed to fetch user profile');
        }
      })
      .then(data => {
        const usernameElement = document.getElementById('username');
        const emailElement = document.getElementById('email');
  
        usernameElement.textContent = `Username: ${data.username}`;
        emailElement.textContent = `Email: ${data.email}`;
      })
      .catch(error => {
        console.error('Error fetching user profile:', error);
      });
  }
  
  export { fetchUserProfile };
  