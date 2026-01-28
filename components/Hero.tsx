
import React, { useEffect, useState, useCallback } from 'react';
import { View } from '../App';

interface HeroProps {
  onNavigate: (view: View) => void;
}

interface Slide {
  image: string;
  tag: string;
  title: React.ReactNode;
  description: string;
}

const SLIDES: Slide[] = [
  {
    image: "/images/Hero1.jpg",
    tag: "Our Mission",
    title: <>Bringing <span className="text-brand-yellow">Hope</span>, One Smile at a Time</>,
    description: "Smiles of Hope for Children Foundation is dedicated to improving oral health and wellbeing in underserved communities."
  },
  {
    image: "/images/Hero2.jpg",
    tag: "Prevention First",
    title: <>Early Care for a <span className="text-brand-yellow">Healthy</span> Future</>,
    description: "We promote age-appropriate hygiene and fluoride use to prevent diseases before they start."
  },
  {
    image: "/images/Hero3.jpg",
    tag: "Community Power",
    title: <>Empowering <span className="text-brand-yellow">Caregivers</span> & Schools</>,
    description: "Delivering culturally appropriate education to parents and community leaders across Nigeria."
  },
  {
    image: "/images/Hero 4.jpg",
    tag: "Direct Care",
    title: <>Restoring Smiles, Changing <span className="text-brand-yellow">Lives</span></>,
    description: "Our mobile clinics provide free dental checkups, treatments, and referrals to children in need."
  },
  {
    image: "/images/Hero 5.jpg",
    tag: "Our Impact",
    title: <>Every Smile Tells a <span className="text-brand-yellow">Success</span> Story</>,
    description: "Join thousands of caregivers and children whose lives have been transformed through our programs."
  }
];

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    setTimeout(() => setIsTransitioning(false), 800);
  }, [isTransitioning]);

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    setTimeout(() => setIsTransitioning(false), 800);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 7000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="relative h-[90vh] md:h-screen min-h-[600px] w-full overflow-hidden bg-slate-900">
      {/* Background Slides */}
      {SLIDES.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Image with Ken Burns Effect */}
          <div className="absolute inset-0 overflow-hidden">
            <img 
              src={slide.image} 
              alt=""
              className={`w-full h-full object-cover transition-transform duration-[10000ms] ease-linear ${
                index === currentSlide ? 'scale-110' : 'scale-100'
              }`}
              onError={(e) => {
                // Fallback to a placeholder if the image fails to load
                const target = e.target as HTMLImageElement;
                if (!target.src.includes('via.placeholder')) {
                  target.src = 'https://via.placeholder.com/1600x900/4FA3D1/ffffff?text=Smiles+of+Hope';
                }
              }}
            />
          </div>
          {/* Dark Overlay with Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60 z-10" />
        </div>
      ))}

      {/* Content Container */}
      <div className="container relative z-20 mx-auto h-full px-6 flex flex-col justify-center items-center">
        <div className="max-w-4xl text-center">
          {/* Slide Tag */}
          <div className="mb-6 flex justify-center">
            <span className="inline-block px-4 py-1.5 bg-brand-blue/80 backdrop-blur-md text-white rounded-full text-xs font-bold uppercase tracking-[0.2em] animate-fade-in-down border border-white/20">
              {SLIDES[currentSlide].tag}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-white leading-tight mb-8 drop-shadow-2xl font-playful tracking-wide">
            {SLIDES[currentSlide].title}
          </h1>

          {/* Sub-text */}
          <p className="text-lg md:text-2xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            {SLIDES[currentSlide].description}
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <button
              onClick={() => onNavigate('donate')}
              className="bg-brand-yellow text-slate-900 px-10 py-5 rounded-2xl font-bold text-xl shadow-2xl hover:bg-white transition-all transform hover:-translate-y-1 active:scale-95"
            >
              Donate Now
            </button>
            <button
              onClick={() => onNavigate('programs')}
              className="bg-white/10 backdrop-blur-md border-2 border-white/30 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-white hover:text-brand-blue transition-all transform hover:-translate-y-1 active:scale-95"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Slider Controls */}
      <div className="absolute bottom-10 left-0 w-full z-30 px-6">
        <div className="container mx-auto flex justify-between items-center">
          {/* Navigation Arrows */}
          <div className="flex gap-4">
            <button 
              onClick={prevSlide}
              className="w-12 h-12 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-white flex items-center justify-center hover:bg-white hover:text-brand-blue transition-all"
              aria-label="Previous slide"
            >
              <span className="text-xl">←</span>
            </button>
            <button 
              onClick={nextSlide}
              className="w-12 h-12 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-white flex items-center justify-center hover:bg-white hover:text-brand-blue transition-all"
              aria-label="Next slide"
            >
              <span className="text-xl">→</span>
            </button>
          </div>

          {/* Progress Dots */}
          <div className="flex gap-3">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`group relative h-1.5 rounded-full transition-all duration-500 overflow-hidden ${
                  i === currentSlide ? 'w-12 bg-brand-yellow' : 'w-4 bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              >
                {i === currentSlide && (
                  <div className="absolute inset-0 bg-white/40 animate-progress-fill" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Down Hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 hidden md:block opacity-50">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-white rounded-full animate-bounce"></div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes progress-fill {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.8s ease-out forwards;
        }
        .animate-progress-fill {
          animation: progress-fill 7s linear forwards;
        }
      `}</style>
    </div>
  );
};

export default Hero;
