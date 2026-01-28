
import React, { useState, useEffect } from 'react';

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled up to 300px
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <div className={`fixed bottom-6 right-6 z-[100] transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
      <button
        onClick={scrollToTop}
        className="bg-[#F6C453] w-14 h-14 rounded-full shadow-2xl flex items-center justify-center hover:bg-[#4FA3D1] hover:scale-110 transition-all active:scale-95 group"
        aria-label="Back to top"
      >
        <svg 
          className="w-6 h-6 text-slate-900 group-hover:text-white transition-colors" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={3} 
            d="M5 15l7-7 7 7" 
          />
        </svg>
      </button>
    </div>
  );
};

export default BackToTop;
