import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, PlusCircle, ShoppingCart, User } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-black border-b border-neon-green">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Terminal className="w-8 h-8 text-neon-green" />
            <span className="text-2xl font-bold text-neon-green glitch-text">MemeHustle</span>
          </Link>
          
          <div className="flex space-x-6">
            <Link to="/create" className="nav-link">
              <PlusCircle className="w-5 h-5" />
              <span>Create</span>
            </Link>
            <Link to="/marketplace" className="nav-link">
              <ShoppingCart className="w-5 h-5" />
              <span>Market</span>
            </Link>
            <Link to="/profile" className="nav-link">
              <User className="w-5 h-5" />
              <span>Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;