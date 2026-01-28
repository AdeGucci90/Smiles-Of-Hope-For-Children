
import React, { useState, useEffect, useCallback } from 'react';
import { TESTIMONIALS } from '../constants';

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextTestimonial = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
      setIsTransitioning(false);
    }, 500);
  }, [isTransitioning]);

  const prevTestimonial = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
      setIsTransitioning(false);
    }, 500);
  };

  useEffect(() => {
    const timer = setInterval(nextTestimonial, 6000);
    return () => clearInterval(timer);
  }, [nextTestimonial]);

  return (
    <div className="py-16 bg-[#EBF6FC] overflow-hidden relative border-y border-[#4FA3D1]/10">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center relative">
          
          {/* Section Heading */}
          <div className="mb-8 flex flex-col items-center">
             <span className="text-[#4FA3D1] font-bold uppercase tracking-[0.2em] text-xs mb-2">Hearts & Smiles</span>
             <h2 className="text-3xl font-bold text-slate-900 font-playful">What Our Beneficiaries Say</h2>
          </div>

          <div className="relative h-48 md:h-32 flex items-center justify-center">
            {TESTIMONIALS.map((testimonial, index) => (
              <div
                key={index}
                className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${
                  index === activeIndex 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8 pointer-events-none'
                }`}
              >
                <div className="relative inline-block">
                  <span className="absolute -top-6 -left-8 text-6xl text-[#4FA3D1]/20 font-serif leading-none select-none">“</span>
                  <p className="text-lg md:text-2xl text-slate-800 font-medium italic leading-relaxed mb-6">
                    {testimonial.quote}
                  </p>
                  <span className="absolute -bottom-10 -right-8 text-6xl text-[#4FA3D1]/20 font-serif leading-none select-none rotate-180">“</span>
                </div>
                <div className="mt-4">
                  <p className="font-bold text-[#4FA3D1] text-lg font-playful">{testimonial.author}</p>
                  <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center items-center gap-8 mt-12">
            <button 
              onClick={prevTestimonial}
              className="text-slate-400 hover:text-[#4FA3D1] transition-colors p-2"
              aria-label="Previous testimonial"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    i === activeIndex ? 'bg-[#4FA3D1] scale-125 shadow-sm' : 'bg-slate-300 hover:bg-[#4FA3D1]/50'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button 
              onClick={nextTestimonial}
              className="text-slate-400 hover:text-[#4FA3D1] transition-colors p-2"
              aria-label="Next testimonial"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
