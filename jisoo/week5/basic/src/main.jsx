import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App3 from './app/App3.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App3 />
  </StrictMode>,
)
