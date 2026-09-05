import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logoImage from '../assets/images/logoorg.jpg'; 

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Function to close the mobile menu when a link is clicked
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="relative z-50 bg-white border-b border-gray-100">
      <div className="flex items-center justify-between px-4 py-4 mx-auto md:px-8 max-w-7xl">
        
        {/* Brand / Logo Area */}
        <Link to="/" className="flex items-center gap-3" onClick={closeMenu}>
          {/* Logo Image */}
          <div className="w-10 h-10 overflow-hidden bg-gray-100 rounded-full shrink-0">
            {/* Replace the src below with {logoImage} once imported */}
            <img 
              src={logoImage}
              alt="Apostolic Church Logo" 
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-bold leading-tight sm:text-lg text-brand-navy">Apostolic Church</span>
            <span className="text-[10px] tracking-widest text-gray-400 uppercase">Sri Lanka</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden gap-8 text-sm font-medium text-gray-600 md:flex">
          <Link to="/" className="hover:text-brand-navy">Home</Link>
          <Link to="/churches" className="hover:text-brand-navy">Find a Church</Link>
          <Link to="/events" className="hover:text-brand-navy">Events</Link>
          <Link to="#" className="hover:text-brand-navy">Ministries</Link>
          <Link to="#" className="hover:text-brand-navy">About</Link>
          <Link to="#" className="hover:text-brand-navy">Contact</Link>
        </div>

        {/* Desktop Call to Action Button */}
        <div className="hidden md:block">
          <button className="px-6 py-2 text-sm font-medium text-white transition-colors rounded-full bg-[#0c1322] hover:bg-slate-800">
            Plan a Visit
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button 
          className="p-2 text-gray-600 md:hidden hover:text-[#0c1322]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="absolute left-0 right-0 px-4 py-4 bg-white border-b shadow-lg top-full border-gray-50 md:hidden">
          <div className="flex flex-col gap-4 text-base font-medium text-gray-600">
            <Link to="/" className="block py-2 border-b border-gray-50 hover:text-brand-navy" onClick={closeMenu}>Home</Link>
            <Link to="/churches" className="block py-2 border-b border-gray-50 hover:text-brand-navy" onClick={closeMenu}>Find a Church</Link>
            <Link to="/events" className="block py-2 border-b border-gray-50 hover:text-brand-navy" onClick={closeMenu}>Events</Link>
            <Link to="#" className="block py-2 border-b border-gray-50 hover:text-brand-navy" onClick={closeMenu}>Ministries</Link>
            <Link to="#" className="block py-2 border-b border-gray-50 hover:text-brand-navy" onClick={closeMenu}>About</Link>
            <Link to="#" className="block py-2 mb-2 hover:text-brand-navy" onClick={closeMenu}>Contact</Link>
            
            <button className="w-full px-6 py-3 text-sm font-medium text-white transition-colors rounded-full bg-[#0c1322] hover:bg-slate-800">
              Plan a Visit
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}