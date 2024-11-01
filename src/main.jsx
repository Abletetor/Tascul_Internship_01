// import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
   // 
   <ThemeProvider>
      <App />
   </ThemeProvider>
   // 
);
