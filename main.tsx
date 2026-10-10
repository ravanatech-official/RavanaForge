import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { initAnalytics } from './firebase';

// Initialize Firebase Analytics
initAnalytics().catch(() => {
  // Silent catch in environments without analytics support
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
