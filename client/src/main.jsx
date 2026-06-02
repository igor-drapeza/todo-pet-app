import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './normalize.css'
import './index.css'
import App from './App.jsx'
import ShowModalEdit from './showModalEdit/showModalEdit.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
