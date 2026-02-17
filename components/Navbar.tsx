import React, { useState, useEffect } from 'react';
import { Menu, X, Church } from 'lucide-react';
import { NAV_ITEMS } from '../constants';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 ease-in-out ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center gap-3">
            <div className={`p-2 rounded-full ${isScrolled ? 'bg-gkps-blue text-white' : 'bg-white/10 text-white backdrop-blur-sm'}`}>
              <Church size={24} />
            </div>
            <div className="flex flex-col">
              <span className={`font-serif text-xl font-bold tracking-wide ${isScrolled ? 'text-gkps-blue' : 'text-white'}`}>
                GKPS TANGERANG
              </span>
              <span className={`text-xs tracking-widest uppercase ${isScrolled ? 'text-slate-600' : 'text-gray-200'}`}>
                Resort Tangerang
              </span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`text-sm font-medium tracking-wide transition-colors duration-200 uppercase font-sans
                  ${isScrolled 
                    ? 'text-slate-700 hover:text-gkps-red' 
                    : 'text-white/90 hover:text-white hover:underline decoration-gkps-gold decoration-2 underline-offset-4'
                  }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md ${isScrolled ? 'text-slate-800' : 'text-white'} hover:bg-opacity-10 hover:bg-gray-200`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-xl absolute w-full border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block px-3 py-3 text-base font-medium text-slate-700 hover:text-gkps-blue hover:bg-gray-50 border-l-4 border-transparent hover:border-gkps-blue transition-all"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;