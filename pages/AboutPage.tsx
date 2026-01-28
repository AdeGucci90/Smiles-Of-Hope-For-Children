
import React from 'react';
import { View } from '../App';
import Founder from '../components/Founder';
import { TEAM_MEMBERS } from '../constants';

interface AboutPageProps {
  onNavigate: (view: View) => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white">
      {/* Integrated Blue Filter Page Header */}
      <div className="relative pt-40 pb-20 md:pt-56 md:pb-32 overflow-hidden bg-[#4FA3D1]">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50 mix-blend-multiply"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1600&auto=format&fit=crop")' }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>
        
        <div className="relative z-10 container mx-auto px-6 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-black font-playful mb-6 drop-shadow-xl">About Our Foundation</h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto opacity-90 font-medium font-sans">
            Dedicated to improving children's oral health through prevention, education, and community engagement.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
          <div className="space-y-8">
            <div className="inline-block px-4 py-1 bg-[#F6C453] text-slate-900 font-bold rounded-full text-xs uppercase tracking-widest">
              Our Vision
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
              A Future Where Every Child Can <span className="text-[#4FA3D1]">Grow Up Healthy</span>
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              We envision a future where every child, regardless of background, can grow up healthy, confident, and free from preventable oral diseases. Preventable oral diseases remain one of the most common yet overlooked health challenges affecting children in underserved communities.
            </p>
            <div className="bg-[#EBF6FC] p-8 rounded-[2rem] border-l-8 border-[#4FA3D1]">
              <h3 className="text-xl font-bold text-[#4FA3D1] mb-4">Our Mission Statement</h3>
              <p className="italic text-slate-700">
                "Smiles of Hope for Children Foundation is dedicated to improving the oral health and overall wellbeing of children in underserved communities through prevention, education, community engagement, and access to essential oral health services."
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square bg-slate-100 rounded-[4rem] overflow-hidden shadow-2xl rotate-3">
              <img 
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop" 
                alt="Foundation at work" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-[#F6C453] p-10 rounded-[3rem] shadow-xl hidden md:block max-w-xs border-4 border-white">
               <span className="text-4xl block mb-2">⭐</span>
               <p className="font-bold text-slate-900">Dedicated to long-term health equity and child wellbeing.</p>
            </div>
          </div>
        </div>
      </div>

      <Founder />

      {/* Team Members Section */}
      <div className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-[#4FA3D1] font-bold uppercase tracking-widest text-sm">The Hearts Behind the Smiles</span>
            <h2 className="text-5xl font-bold text-slate-900 font-playful">Meet Our Team</h2>
            <p className="text-lg text-slate-600 leading-relaxed font-sans">
              Our diverse team of pediatric specialists, health workers, and community advocates are unified by a single goal: making dental care accessible to every child.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {TEAM_MEMBERS.map((member, idx) => (
              <div key={idx} className="group relative">
                <div className="aspect-[4/5] rounded-[3rem] overflow-hidden mb-6 shadow-lg transform group-hover:-translate-y-2 transition-all duration-500 border-4 border-white">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                    <div className="flex gap-4">
                      {member.socials?.linkedin && (
                        <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-brand-blue hover:bg-brand-yellow transition-colors">
                           <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
                        </a>
                      )}
                      {member.socials?.twitter && (
                        <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-brand-blue hover:bg-brand-yellow transition-colors">
                           <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"></path></svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-center group-hover:bg-slate-50 p-6 rounded-3xl transition-colors">
                  <h4 className="text-2xl font-bold text-slate-900 mb-1 font-playful">{member.name}</h4>
                  <p className="text-[#4FA3D1] font-bold text-xs uppercase tracking-widest mb-3">{member.role}</p>
                  <p className="text-slate-500 text-sm leading-relaxed font-sans">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
