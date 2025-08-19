import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-50 border-b border-slate-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center gap-2">
             <img src="/tw-icon.png" alt="Company Logo" className="w-8 h-8" />
            <span className="text-xl font-bold text-slate-800">ROI Calculator</span>
          </div>
          <a href="https://www.tripwiredigital.co.nz" target="_blank" rel="noopener noreferrer" className="hidden md:block bg-blue-600 text-white font-bold py-2 px-5 rounded-lg shadow-sm hover:bg-blue-700 transition-colors">
            Mentoring
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;