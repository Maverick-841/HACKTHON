import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';
import { Footer } from './components/Footer';

import Home from './pages/Home';
import Features from './pages/Features';
import About from './pages/About';

import Language from './pages/Language';
import Genres from './pages/Genres';
import MoviesPage from './pages/Movies/MoviesPage';

/* ---------- Layouts ---------- */

// Navbar + padding layout
const NavbarLayout = () => (
  <>
    <Navbar />
    <div className="pt-20 pb-24">
      <Outlet />
    </div>
    <Footer />
  </>
);

// No navbar layout
const NoNavbarLayout = () => (
  <>
    <Outlet />
  </>
);

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
          <Route path="/language" element={<Language />} />
          <Route path="/genres" element={<Genres />} />
          <Route path="/moviesPage" element={<MoviesPage />} />
        </Route>

      </Routes>
    </div>
  );
};

export default App;
