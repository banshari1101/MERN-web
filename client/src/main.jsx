import React from 'react';
import ReactDOM from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import App from './App';
import './index.css';
import { AuthProvider } from './store/auth';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
  <React.StrictMode>
    <App />
  <ToastContainer 
      position="top-right" autoClose={3000} 
      hideProgressBar={false} 
      newestOnTop={false} 
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable pauseOnHover theme="colored" 
      style={{ fontFamily: "Atlas Grotesk Web, Arial, Helvetica, sans-serif", fontSize: "2.2rem" }}
  />
  </React.StrictMode>
  </AuthProvider>
);