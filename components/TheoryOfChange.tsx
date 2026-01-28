
import React from 'react';

const TheoryOfChange: React.FC = () => {
  return (
    <div className="py-24 bg-[#4FA3D1]">
      <div className="container mx-auto px-6">
        <div className="bg-slate-900 rounded-[3rem] p-12 md:p-20 text-white shadow-3xl relative overflow-hidden border-8 border-white/10">
          <div className="relative z-10">
            <div className="inline-block px-4 py-1 bg-[#F6C453] text-slate-900 font-bold rounded-full text-xs uppercase tracking-widest mb-6">
              Impact Roadmap
            </div>
            <h2 className="text-5xl font-bold mb-12 border-l-8 border-[#4FA3D1] pl-8 font-playful">Theory of Change</h2>
            
            <div className="grid md:grid-cols-3 gap-16 relative">
              {/* Connector Line (Desktop) */}
              <div className="hidden md:block absolute top-10 left-0 w-full h-0.5 bg-gradient-to-r from-[#4FA3D1] via-[#F6C453] to-[#4FA3D1] opacity-30 z-0"></div>

              <div className="space-y-6 relative z-10 group">
                <div className="w-20 h-20 rounded-3xl bg-[#4FA3D1] flex items-center justify-center font-bold text-3xl group-hover:bg-[#F6C453] group-hover:text-slate-900 transition-all duration-500 shadow-xl">1</div>
                <h4 className="text-2xl font-bold text-[#F6C453] font-playful">Intervention</h4>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Equipping caregivers with knowledge, tools, and training community health workers to recognize oral disease.
                </p>
              </div>

              <div className="space-y-6 relative z-10 group">
                <div className="w-20 h-20 rounded-3xl bg-[#4FA3D1] flex items-center justify-center font-bold text-3xl group-hover:bg-[#F6C453] group-hover:text-slate-900 transition-all duration-500 shadow-xl">2</div>
                <h4 className="text-2xl font-bold text-[#F6C453] font-playful">Progress</h4>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Preventable oral conditions like early childhood caries are reduced through early care and intervention.
                </p>
              </div>

              <div className="space-y-6 relative z-10 group">
                <div className="w-20 h-20 rounded-3xl bg-[#4FA3D1] flex items-center justify-center font-bold text-3xl group-hover:bg-[#F6C453] group-hover:text-slate-900 transition-all duration-500 shadow-xl">3</div>
                <h4 className="text-2xl font-bold text-[#F6C453] font-playful">Equity</h4>
                <p className="text-gray-300 text-lg leading-relaxed">
                  Healthier children, improved quality of life, better school readiness, and long-term health equity.
                </p>
              </div>
            </div>
          </div>
          
          {/* Background decoration */}
          <div className="absolute bottom-[-20%] right-[-5%] p-4 opacity-[0.03] select-none pointer-events-none">
            <h1 className="text-[20rem] font-black font-playful">SMILE</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TheoryOfChange;
