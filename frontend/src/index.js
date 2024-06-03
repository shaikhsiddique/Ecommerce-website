import React from 'react';
import { createRoot } from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ShopContextProvider from './Context/ShopContextProvider'; // Import the context provider

const root = createRoot(document.getElementById('root')); // Create a root
root.render(
  <React.StrictMode>
    {/* Wrap your App component with ShopContextProvider */}
    <ShopContextProvider>
      <App />
    </ShopContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
