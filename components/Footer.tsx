
import React, { useState } from 'react';
import { View } from '../App';
import { LEAD_EMAIL } from '../constants';

interface FooterProps {
  onNavigate: (view: View) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const FORM_TITLE = "Newsletter Subscription";

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    // Simulate lead capture for newsletter
    setTimeout(() => {
      setIsSubmitting(false);
      setSubscribed(true);
      setEmail('');
      console.log(`Lead captured: [${FORM_TITLE}] -> ${LEAD_EMAIL}`);
      setTimeout(() => setSubscribed(false), 5000);
    }, 1200);
  };

  return (
    <footer className="bg-slate-900 text-white pt-24 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <img src="/images/Loader.png" alt="Smiles of Hope" className="h-16 w-auto" />
            <p className="text-[#EBF6FC] text-sm leading-relaxed font-medium">
              Improving the oral health and overall wellbeing of children through prevention, education, and access to essential services.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#F6C453] hover:text-slate-900 transition-all group" aria-label="Facebook">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z"></path></svg>
              </a>
              <a href="https://www.instagram.com/smilesofhope_foundation/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#F6C453] hover:text-slate-900 transition-all group" aria-label="Instagram">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.245 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.332 2.633-1.308 3.608-.975.975-2.242 1.245-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.332-3.608-1.308-.975-.975-1.245-2.242-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.245 3.608-1.308 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-1.735.079-3.508.412-4.755 1.659-1.248 1.248-1.579 3.024-1.659 4.755-.058 1.28-.072 1.688-.072 4.947s.014 3.667.072 4.947c.079 1.735.412 3.508 1.659 4.755 1.247 1.247 3.022 1.579 4.755 1.659 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c1.735-.079 3.508-.412 4.755-1.659 1.248-1.248-1.579-3.024 1.659-4.755.058-1.28.072-1.689.072-4.947s-.014-3.667-.072-4.947c-.079-1.735-.412-3.508-1.659-4.755-1.247-1.247-3.022-1.579-4.755-1.659-1.281-.058-1.689-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path></svg>
              </a>
              <a href="https://x.com/OfHope30433" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#F6C453] hover:text-slate-900 transition-all group" aria-label="X (Twitter)">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"></path></svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6 border-b border-[#4FA3D1]/30 pb-2 text-[#4FA3D1]">Quick Links</h4>
            <ul className="space-y-4 text-white">
              <li><button onClick={() => onNavigate('about')} className="hover:text-[#F6C453] transition-colors font-medium">About Our Foundation</button></li>
              <li><button onClick={() => onNavigate('programs')} className="hover:text-[#F6C453] transition-colors font-medium">Our Program Pillars</button></li>
              <li><button onClick={() => onNavigate('missions')} className="hover:text-[#F6C453] transition-colors font-medium">Recent Missions</button></li>
              <li><button onClick={() => onNavigate('donate')} className="hover:text-[#F6C453] transition-colors font-medium">Support Our Cause</button></li>
              <li><button onClick={() => onNavigate('join')} className="hover:text-[#F6C453] transition-colors font-medium">Volunteer Opportunities</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6 border-b border-[#4FA3D1]/30 pb-2 text-[#4FA3D1]">Contact Info</h4>
            <ul className="space-y-4 text-white">
              <li className="flex gap-3 text-sm font-medium">
                <svg className="w-5 h-5 text-[#F6C453] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                3rd Avenue ‘O’ House 7. Festac Town, Lagos Nigeria
              </li>
              <li className="flex gap-3 text-sm font-medium">
                <svg className="w-5 h-5 text-[#F6C453] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                {LEAD_EMAIL}
              </li>
              <li className="flex gap-3 text-sm font-medium">
                <svg className="w-5 h-5 text-[#F6C453] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                +234 803 720 2050
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6 border-b border-[#4FA3D1]/30 pb-2 text-[#4FA3D1]">Newsletter</h4>
            <form className="space-y-3" onSubmit={handleSubscribe}>
              {subscribed ? (
                <p className="bg-green-100 text-green-700 p-3 rounded-xl text-xs font-bold animate-pulse">
                  Subscribed to lead pool! (Subject: {FORM_TITLE})
                </p>
              ) : (
                <>
                  <input 
                    required
                    type="email" 
                    placeholder="Email address" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/10 border border-[#4FA3D1]/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#F6C453] text-[#4FA3D1]"
                  />
                  <button 
                    disabled={isSubmitting}
                    className={`w-full bg-[#F6C453] text-slate-900 font-bold py-3 rounded-xl transition-all text-sm flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70' : 'hover:bg-white'}`}
                  >
                    {isSubmitting ? 'Directing...' : 'Subscribe'}
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/10 text-center text-[#4FA3D1] text-xs font-bold tracking-widest uppercase">
          <p>
            <button 
              onClick={() => onNavigate('admin')}
              className="hover:text-white transition-all cursor-default focus:outline-none focus:ring-0 px-1"
              title="Admin Panel"
            >
              ©
            </button> 
            2026 Smiles of Hope for Children Foundation. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
