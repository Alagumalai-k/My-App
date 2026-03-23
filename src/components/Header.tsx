/**
 * Header Component
 * Displays the application title and navigation
 */

import React from 'react';
import { Mountain } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-primary to-secondary text-white py-8 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Mountain size={40} className="text-accent" />
          <h1 className="text-4xl md:text-5xl font-bold">Go With Travel</h1>
          <Mountain size={40} className="text-accent" />
        </div>
        <p className="text-center text-lg text-gray-100">
          Discover the Top 10 Hills Locations and Resorts in South India
        </p>
        <p className="text-center text-sm text-gray-200 mt-2">
          Tamil Nadu | Kerala | Karnataka
        </p>
      </div>
    </header>
  );
};

export default Header;
