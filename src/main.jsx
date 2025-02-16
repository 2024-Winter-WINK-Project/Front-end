import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import axios from "axios";
import App from './App.jsx';

axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
      <App />
  // </StrictMode>,
)
