import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'font-awesome/css/font-awesome.min.css';
import './index.css'
import "@govbr-ds/core/dist/core.min.css";
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
