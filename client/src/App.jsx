import React from 'react';
import Navbar from './components/Navbar';
import { Routes, Route, Outlet } from 'react-router-dom';
import { Footer } from './components/Footer';
import Features from './pages/Features';
import Language from './pages/Language';
import About from './pages/About';
import Home from './pages/Home';
import Genres from './pages/Genres';

const LayoutWithPadding = () => {
  return (
    <div className="pt-20 pb-24">
      <Outlet />
    </div>
  );
};

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B1020] to-[#0F172A]">
      <Navbar />

      <Routes>
        {/* Pages WITH navbar spacing */}
        <Route element={<LayoutWithPadding />}>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/about" element={<About />} />
        </Route>

        {/* Page WITHOUT navbar spacing */}
        <Route path="/language" element={<Language />} />
        <Route path="/genres" element={<Genres />} />
      </Routes>

      <Footer />
    </div>
  );
};

export default App;
