import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Toaster } from 'react-hot-toast'
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom'; // Keep this
import { ShopProvider } from './context/shopcontext.jsx';

// Redirect fix for privacy.html BEFORE React loads
if (window.location.pathname === '/privacy.html') {
  window.location.href = '/privacy';
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* BrowserRouter MUST wrap everything that uses useNavigate */}
    <BrowserRouter>
      <ShopProvider>
        <App />
        <Toaster position="top-right" reverseOrder={false} />
      </ShopProvider>
    </BrowserRouter>
  </StrictMode>
);