// App.jsx - REMOVE BrowserRouter import here
import React, { useEffect } from 'react';
import { Routes, Route, Outlet, useNavigate, useLocation } from 'react-router-dom';

// ✅ ADD SHOP PROVIDER

import Navbar from './components/Navbar';
import { Footer } from './components/Footer';

import Home from './pages/Home';
import Features from './pages/Features';
import About from './pages/About';

import Language from './pages/Language';
import Genres from './pages/Genres';
import MoviesPage from './pages/Movies/MoviesPage';
import MusicPage from './pages/Music/MusicPage';
import BooksPage from './pages/Books/BooksPage';
import PodCastsPage from './pages/Podcasts/PodCastsPage';
import AnimePage from './pages/Anime/AnimePage';
import WebseriesPage from './pages/Webseries/WebseriesPage';
import Mode from './pages/Mode';
import { Login } from './pages/Login';
import { Privacy } from './components/privacy';
import { ShopProvider } from './context/shopcontext';
import DocumentaryPage from './pages/Documentary/DocumentaryPage';

/* ---------- Layouts ---------- */

// Navbar + padding layout WITH Privacy Check
const NavbarLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Check privacy when on home page
  useEffect(() => {
    if (location.pathname === '/') {
      const isPrivacyAccepted = localStorage.getItem('privacyAccepted');
      if (!isPrivacyAccepted) {
        navigate('/privacy');
      }
    }
  }, [location.pathname, navigate]);

  return (
    <>
      <Navbar />
      <div className="pt-20 pb-24">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

// No navbar layout
const NoNavbarLayout = () => (
  <>
    <Outlet />
  </>
);

// Redirect Component for privacy.html
const RedirectToPrivacy = () => {
  useEffect(() => {
    window.location.href = '/privacy';
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1020] to-[#0F172A] flex items-center justify-center">
      <div className="text-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-lg">Redirecting to Privacy Policy...</p>
      </div>
    </div>
  );
};

/* ---------- App ---------- */

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1020] to-[#0F172A]">
      <Routes>

        {/* WITH Navbar */}
        <Route element={<NavbarLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/about" element={<About />} />
        </Route>

        {/* WITHOUT Navbar */}
        <Route element={<NoNavbarLayout />}>
          <Route path="/mode" element={<Mode />} />
          <Route path="/language" element={<Language />} />
          <Route path="/genres" element={<Genres />} />

          {/* ✅ UPDATE THESE ROUTES TO MATCH WHAT Genres.jsx NAVIGATES TO */}
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/music" element={<MusicPage />} />
          <Route path="/books" element={<BooksPage />} />
          <Route path="/podcasts" element={<PodCastsPage />} />

          <Route path="/anime" element={<AnimePage />} />
          <Route path="/webseries" element={<WebseriesPage />} />
          <Route path="/documentaries" element={<DocumentaryPage />} />

          <Route path="/login" element={<Login />} />
          <Route path="/privacy" element={<Privacy />} />

          {/* Add this redirect route */}
          <Route path="/privacy.html" element={<RedirectToPrivacy />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;