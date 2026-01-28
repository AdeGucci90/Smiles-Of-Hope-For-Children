
import React from 'react';
import { View } from '../App';

interface CTAProps {
  onNavigate: (view: View) => void;
}

const CTA: React.FC<CTAProps> = ({ onNavigate }) => {
  return (
    <div className="py-20 bg-[#4FA3D1] relative overflow-hidden">
      <div className="absolute inset-0 bg-black/5"></div>
      <div className="container mx-auto px-6 relative z-10 text-center text-white space-y-8">
        <h2 className="text-3xl md:text-5xl font-bold max-w-4xl mx-auto font-playful tracking-wide">
          Our Doors Are Always Open To More People Who Want To Support Each Other!
        </h2>
        <p className="text-white/80 text-lg max-w-2xl mx-auto">
          Your support helps us bring smiles, hope, and a brighter future to children in underserved communities.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <button 
            onClick={() => onNavigate('donate')}
            className="bg-[#F6C453] text-slate-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:scale-105 transition-all shadow-xl"
          >
            Give Donation Now
          </button>
          <button 
            onClick={() => onNavigate('join')}
            className="bg-white border-2 border-[#4FA3D1] text-[#4FA3D1] px-10 py-4 rounded-full font-bold text-lg hover:bg-slate-900 hover:text-white hover:scale-105 transition-all"
          >
            Join Us Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default CTA;
