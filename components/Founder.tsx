
import React from 'react';

const Founder: React.FC = () => {
  return (
    <div className="py-24 bg-white overflow-hidden relative">
      {/* Decorative background shape */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/3 h-2/3 bg-[#EBF6FC] rounded-r-[10rem] z-0"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-20">
          <div className="md:w-1/3 relative">
             <div className="relative">
                {/* Decorative dots */}
                <div className="absolute -top-10 -left-10 text-[#4FA3D1] opacity-20 text-6xl select-none">••••<br/>••••<br/>••••</div>
                
                <div className="w-64 h-64 md:w-96 md:h-96 rounded-[4rem] border-8 border-[#4FA3D1] overflow-hidden shadow-3xl mx-auto transform rotate-3 hover:rotate-0 transition-all duration-500">
                    <img 
                      src="/images/Founder.webp"
                      alt="Founder Professor Olubukola Olatosi" 
                      className="w-full h-full object-cover scale-110"
                    />
                </div>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-[#2C5A7A] text-white px-8 py-3 rounded-2xl font-bold whitespace-nowrap shadow-2xl border-2 border-white">
                    Prof. Olubukola Olatosi
                </div>
             </div>
          </div>
          
          <div className="md:w-2/3 space-y-8">
            <div className="space-y-4">
              <span className="text-[#4FA3D1] font-bold uppercase tracking-[0.2em] text-sm">Our Visionary Founder</span>
              <h2 className="text-5xl md:text-6xl font-bold text-slate-900 italic font-playful leading-tight">
                "Bringing hope, dignity, and healthy smiles."
              </h2>
            </div>
            
            <div className="space-y-6 text-slate-600 leading-relaxed text-xl relative font-medium">
              <span className="absolute -top-10 -left-10 text-9xl text-[#4FA3D1]/10 font-serif leading-none select-none z-0">“</span>
              <p className="relative z-10">
              Dr. Olubukola Olatosi is the Founder and Executive Director of Smiles of Hope for Children Foundation (SHCF). She is a pediatric dentist and oral health researcher with a strong commitment to prevention, health equity, and community-centered care. Dr. Olatosi founded SHCF to address preventable oral diseases among children in underserved communities by promoting early oral health education, free community dental screenings, and sustainable partnerships. Her work bridges research, clinical practice, and advocacy to ensure that every child has the opportunity to grow up healthy and confident.
              </p>
              <p className="relative z-10">
              This foundation is dedicated to bringing hope, dignity, and healthy smiles to families who need them most—one smile at a time.
              </p>
            </div>
            
            <div className="pt-6 flex items-center gap-6">
               <div className="w-16 h-1 bg-[#F6C453] rounded-full"></div>
               <div>
                  <p className="font-bold text-2xl text-slate-900">— Prof. Olubukola (Bukky) Olatosi</p>
                  <p className="text-lg text-[#4FA3D1] font-bold uppercase tracking-widest">Founder & Pediatric Specialist</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Founder;
