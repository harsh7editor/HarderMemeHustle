import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Create from './pages/Create';
import Marketplace from './pages/Marketplace';
import Profile from './pages/Profile';
import { MemeProvider } from './context/MemeContext';

const App = () => {
  return (
    <MemeProvider>
      <div className="min-h-screen bg-black text-neon-green font-tech-mono">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </MemeProvider>
  );
};

export default App;