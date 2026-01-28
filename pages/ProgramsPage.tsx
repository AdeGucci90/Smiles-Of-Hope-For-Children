
import React from 'react';
import { View } from '../App';
import { PROGRAM_PILLARS } from '../constants';

interface ProgramsPageProps {
  onNavigate: (view: View) => void;
}

const ProgramsPage: React.FC<ProgramsPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white">
      {/* Integrated Blue Filter Page Header */}
      <div className="relative pt-40 pb-20 md:pt-56 md:pb-32 overflow-hidden bg-[#4FA3D1] text-center text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-multiply"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1600&auto=format&fit=crop")' }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/20"></div>
        
        <div className="relative z-10 container mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-black font-playful mb-6 drop-shadow-xl">Our Program Pillars</h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto opacity-90 font-medium font-sans">
            Sustainable strategies designed to tackle the root causes of oral health disparities.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-24">
        <div className="grid gap-16">
          {PROGRAM_PILLARS.map((pillar, idx) => (
            <div key={idx} className={`flex flex-col lg:flex-row gap-16 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              <div className="lg:w-1/2 space-y-6">
                <div className="text-6xl bg-[#EBF6FC] w-24 h-24 rounded-3xl flex items-center justify-center text-[#4FA3D1] shadow-lg">
                  {pillar.icon}
                </div>
                <h2 className="text-4xl font-bold text-slate-900 font-playful">{pillar.title}</h2>
                <p className="text-lg text-slate-600 leading-relaxed font-sans">
                  {pillar.description} We focus on creating a supportive ecosystem where health workers, parents, and community leaders collaborate.
                </p>
                <ul className="grid sm:grid-cols-2 gap-4">
                  {pillar.points.map((pt, i) => (
                    <li key={i} className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <span className="text-[#4FA3D1] font-bold">✓</span>
                      <span className="text-sm font-semibold text-slate-700 font-sans">{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:w-1/2">
                <div className="rounded-[3rem] overflow-hidden shadow-2xl aspect-video bg-slate-100">
                   <img 
                    src={`https://images.unsplash.com/photo-${1500000000000 + idx}?q=80&w=800&auto=format&fit=crop`} 
                    alt={pillar.title} 
                    className="w-full h-full object-cover"
                    onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=800&auto=format&fit=crop"; }}
                   />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#2C5A7A] py-24 text-white">
        <div className="container mx-auto px-6 text-center space-y-8">
           <h2 className="text-4xl font-bold font-playful">Support Our Programs</h2>
           <p className="text-xl opacity-80 max-w-2xl mx-auto font-sans">
             Your partnership allows us to expand these pillars to more communities across Nigeria.
           </p>
           <button 
             onClick={() => onNavigate('donate')}
             className="bg-[#F6C453] text-slate-900 px-12 py-5 rounded-full font-bold text-xl hover:scale-110 transition-transform shadow-2xl"
           >
             Make a Contribution
           </button>
        </div>
      </div>
    </div>
  );
};

export default ProgramsPage;
