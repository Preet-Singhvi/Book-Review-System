import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <BrowserRouter >
    <App />
    <ToastContainer position="top-right" />
  </BrowserRouter>,
  document.getElementById('root')
)