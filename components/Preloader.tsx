import React, { useState, useEffect } from 'react';

interface PreloaderProps {
  onLoadingComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onLoadingComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress with staggered completion
    const duration = 2000; // 2 seconds total
    const interval = 50;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setProgress(Math.min((currentStep / steps) * 100, 100));

      if (currentStep >= steps) {
        clearInterval(timer);
        // Start fade out
        setIsVisible(false);
        // Notify parent after fade out completes
        setTimeout(() => {
          onLoadingComplete();
        }, 500);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-50">
      {/* Logo */}
      <div className="mb-8 animate-pulse">
        <img
          src="/images/logo.png"
          alt="Smiles of Hope for Children"
          className="w-32 h-32 md:w-40 md:h-40 object-contain"
        />
      </div>

      {/* Loading text */}
      <h2 className="text-2xl md:text-3xl text-brand-blue mb-4 font-playful">
        Smiles of Hope for Children
      </h2>

      {/* Progress bar */}
      <div className="w-48 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-brand-yellow transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Loading indicator dots */}
      <div className="flex gap-2 mt-4">
        <span className="w-3 h-3 bg-brand-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <span className="w-3 h-3 bg-brand-blue rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <span className="w-3 h-3 bg-brand-blue rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>

      {/* Decorative circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-brand-lightBlue rounded-full opacity-20 animate-pulse" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-brand-yellow rounded-full opacity-10 animate-pulse" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-brand-blue rounded-full opacity-10 animate-pulse" />
      </div>
    </div>
  );
};

export default Preloader;

