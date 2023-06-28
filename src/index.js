import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app';
import './index.css';
// import { createPortal } from 'react-dom';
import Modal from 'components/modal';

const root = ReactDOM.createRoot(document.getElementById('root'));
// console.log(root);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
