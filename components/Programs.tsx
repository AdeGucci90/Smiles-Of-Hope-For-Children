
import React from 'react';
import { PROGRAM_PILLARS } from '../constants';
import { View } from '../App';

interface ProgramsProps {
  onNavigate: (view: View) => void;
}

const Programs: React.FC<ProgramsProps> = ({ onNavigate }) => {
  return (
    <div className="py-24 bg-[#2C5A7A] text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#4FA3D1]/20 blur-[150px] rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[#4FA3D1]/10 blur-[150px] rounded-full"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-6">
          <span className="text-[#F6C453] font-bold uppercase tracking-[0.3em] text-sm">Our Strategy</span>
          <h2 className="text-5xl font-bold font-playful tracking-wide">What We Do for Those in Need</h2>
          <p className="text-white text-lg leading-relaxed">
            We focus on sustainable, community-driven strategies to ensure long-term health equity for children in underserved areas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {PROGRAM_PILLARS.map((pillar, idx) => (
            <div 
              key={idx} 
              className="group p-10 bg-white/5 backdrop-blur-md rounded-[2.5rem] border-2 border-white/10 hover:border-[#4FA3D1] hover:bg-white/10 transition-all duration-500 hover:-translate-y-4"
            >
              <div className="mb-8 bg-white w-24 h-24 rounded-3xl flex items-center justify-center group-hover:bg-[#F6C453] transition-all duration-500 shadow-xl overflow-hidden">
                <div className="transform transition-colors duration-500 group-hover:brightness-50 group-hover:invert-0">
                  {pillar.icon}
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-6 font-playful text-[#F6C453]">{pillar.title}</h3>
              <ul className="space-y-4">
                {pillar.points.map((point, pIdx) => (
                  <li key={pIdx} className="text-base text-white flex items-start gap-3 leading-snug">
                    <span className="text-[#4FA3D1] mt-1 text-lg font-bold">✦</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
           <button 
             onClick={() => onNavigate('programs')}
             className="bg-white text-[#4FA3D1] px-12 py-4 rounded-full font-bold text-lg hover:bg-[#F6C453] hover:text-slate-900 transition-all shadow-2xl transform hover:scale-110"
           >
             Explore Full Program Details
           </button>
        </div>
      </div>
    </div>
  );
};

export default Programs;
