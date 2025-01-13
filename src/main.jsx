import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import BottomNavigation from "./components/BottomNavigation.jsx";
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BottomNavigation/>
      <App />
  </StrictMode>,
)
