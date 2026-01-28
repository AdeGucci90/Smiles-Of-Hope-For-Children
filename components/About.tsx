import React from 'react';
import { View } from '../App';

interface AboutProps {
  onNavigate: (view: View) => void;
}

const About: React.FC<AboutProps> = ({ onNavigate }) => {
  return (
    <div className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#4FA3D1]/5 rounded-full blur-3xl -mr-48 -mt-48"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2 relative group">
             <div className="aspect-video lg:aspect-square bg-[#4FA3D1] rounded-[3rem] overflow-hidden shadow-2xl relative">
                <img 
                  src="/images/about us.webp" 
                  alt="Our Work in Communities" 
                  className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-[#4FA3D1]/20 mix-blend-multiply transition-opacity group-hover:opacity-0"></div>
             </div>
             <div className="absolute -bottom-8 -right-8 p-10 bg-[#4FA3D1] text-white rounded-3xl shadow-2xl hidden sm:block max-w-sm border-4 border-white">
                <h3 className="text-2xl font-bold mb-3 font-playful">Our Mission</h3>
                <p className="text-white/90 leading-relaxed font-medium">
                  Dedicated to improving the oral health and overall wellbeing of children in underserved communities through prevention and education.
                </p>
             </div>
          </div>
          
          <div className="lg:w-1/2 space-y-8">
            <div className="space-y-4">
              <span className="text-[#4FA3D1] font-bold uppercase tracking-[0.2em] text-sm">About Our Foundation</span>
              <h2 className="text-5xl md:text-6xl font-bold text-slate-900 leading-[1.1]">
                Join Hands, Bring Hope, <br />
                <span className="text-[#F6C453]">Change the World</span>
              </h2>
            </div>
            
            <p className="text-slate-800 leading-relaxed text-xl font-medium">
              Preventable oral diseases remain one of the most common yet overlooked health challenges affecting children. 
              In Nigeria, many children experience untreated dental caries due to limited access to care and low literacy.
            </p>

            <div className="flex gap-4">
              <button 
                onClick={() => onNavigate('about')}
                className="bg-[#4FA3D1] text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-slate-900 transition-all"
              >
                Learn More About Us
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div className="bg-[#EBF6FC] p-8 rounded-3xl border-l-8 border-[#F6C453] shadow-sm">
                <h4 className="font-bold text-[#4FA3D1] mb-3 text-xl">The Problem</h4>
                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                  Oral health is often excluded from child health programs, resulting in preventable pain and school absenteeism.
                </p>
              </div>
              <div className="bg-[#EBF6FC] p-8 rounded-3xl border-l-8 border-[#4FA3D1] shadow-sm">
                <h4 className="font-bold text-[#4FA3D1] mb-3 text-xl">Our Vision</h4>
                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                  A future where every child can grow up healthy, confident, and free from preventable oral diseases.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

