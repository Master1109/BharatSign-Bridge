import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import './i18n'
import { ToastProvider } from '@/context/ToastContext'
import { FavoritesProvider } from '@/context/FavoritesContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <FavoritesProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </FavoritesProvider>
    </BrowserRouter>
  </React.StrictMode>
)
