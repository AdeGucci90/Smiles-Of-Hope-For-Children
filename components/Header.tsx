import React, { useState } from 'react';
import { NAV_LINKS } from '../constants';
import { View } from '../App';

interface HeaderProps {
  isScrolled: boolean;
  currentView: View;
  onNavigate: (view: View) => void;
}

const Header: React.FC<HeaderProps> = ({ isScrolled, currentView, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const view = href.replace('#', '') as View;
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  // The top bar is shown on all pages when not scrolled
  const showTopBar = !isScrolled;

  return (
    <header className="w-full fixed top-0 z-50 transition-all duration-300">
      {/* Top Bar - Visible on all pages when not scrolled */}
      <div className={`hidden md:flex bg-slate-900 text-white py-2 px-6 justify-between items-center text-sm transition-all duration-300 overflow-hidden ${showTopBar ? 'h-auto opacity-100' : 'h-0 py-0 opacity-0'}`}>
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[#F6C453]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
            +234 803 720 2050
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[#F6C453]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            info@smilesofhopeforchildren.org
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <span className="text-gray-400 mr-2">Follow us:</span>
          <a href="#" className="hover:text-[#F6C453] transition-colors" aria-label="Facebook">
             <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z"></path></svg>
          </a>
          <a href="https://www.instagram.com/smilesofhope_foundation/" target="_blank" rel="noopener noreferrer" className="hover:text-[#F6C453] transition-colors" aria-label="Instagram">
             <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.245 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.332 2.633-1.308 3.608-.975.975-2.242 1.245-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.332-3.608-1.308-.975-.975-1.245-2.242-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.245 3.608-1.308 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-1.735.079-3.508.412-4.755 1.659-1.248 1.248-1.579 3.024-1.659 4.755-.058 1.28-.072 1.688-.072 4.947s.014 3.667.072 4.947c.079 1.735.412 3.508 1.659 4.755 1.247 1.247 3.022 1.579 4.755 1.659 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c1.735-.079 3.508-.412 4.755-1.659 1.248-1.248-1.579-3.024 1.659-4.755.058-1.28.072-1.689.072-4.947s-.014-3.667-.072-4.947c-.079-1.735-.412-3.508-1.659-4.755-1.247-1.247-3.022-1.579-4.755-1.659-1.281-.058-1.689-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path></svg>
          </a>
          <a href="https://x.com/OfHope30433" target="_blank" rel="noopener noreferrer" className="hover:text-[#F6C453] transition-colors" aria-label="X (Twitter)">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"></path></svg>
          </a>
        </div>
      </div>

      {/* Main Nav - Now transparent on all pages at top of scroll */}
      <nav className={`${isScrolled ? 'bg-white shadow-lg py-2' : 'bg-transparent text-white py-4'} transition-all duration-300`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div
            className="flex flex-col cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <img
              src="/images/logo.png"
              alt="Smiles of Hope Children Foundation"
              className={`h-32 md:h-40 w-auto transition-all duration-300 ${isScrolled ? 'brightness-75' : 'brightness-100'}`}
            />
          </div>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a 
                  href={link.href} 
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`font-semibold transition-colors hover:text-[#F6C453] ${
                    currentView === link.href.replace('#', '') ? 'text-[#F6C453]' : (isScrolled ? 'text-slate-800' : 'text-white')
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <button 
                onClick={() => onNavigate('donate')}
                className="bg-[#F6C453] hover:bg-[#e0b246] text-slate-900 px-6 py-2 rounded-full font-bold transition-all transform hover:scale-105 shadow-md"
              >
                Donate Now
              </button>
            </li>
          </ul>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div className={`w-6 h-0.5 mb-1.5 transition-all ${isScrolled ? 'bg-slate-900' : 'bg-white'}`}></div>
            <div className={`w-6 h-0.5 mb-1.5 transition-all ${isScrolled ? 'bg-slate-900' : 'bg-white'}`}></div>
            <div className={`w-6 h-0.5 transition-all ${isScrolled ? 'bg-slate-900' : 'bg-white'}`}></div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden bg-white text-slate-900 absolute w-full transition-all duration-300 overflow-hidden ${mobileMenuOpen ? 'max-h-screen py-6 shadow-xl border-t' : 'max-h-0'}`}>
          <ul className="flex flex-col items-center gap-6">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a 
                  href={link.href} 
                  className={`text-lg font-bold hover:text-[#4FA3D1] ${currentView === link.href.replace('#', '') ? 'text-[#4FA3D1]' : ''}`}
                  onClick={(e) => handleLinkClick(e, link.href)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <button 
              onClick={() => { onNavigate('donate'); setMobileMenuOpen(false); }}
              className="bg-[#F6C453] text-slate-900 px-10 py-3 rounded-full font-bold shadow-lg"
            >
              Donate Now
            </button>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;

