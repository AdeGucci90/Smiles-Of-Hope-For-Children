import React, { useState, useRef } from 'react';
import { View } from '../App';
import { LEAD_EMAIL } from '../constants';
import { sendJoinForm } from '../services/emailService';

interface JoinPageProps {
  onNavigate: (view: View) => void;
}

const JoinPage: React.FC<JoinPageProps> = ({ onNavigate }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const FORM_TITLE = "Sign Up Now";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (formRef.current) {
      const formData = new FormData(formRef.current);
      await sendJoinForm({
        full_name: formData.get('full_name') as string,
        email_address: formData.get('email_address') as string,
        area_of_interest: formData.get('area_of_interest') as string,
        about_yourself: formData.get('about_yourself') as string,
      });
    }
    
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Integrated Blue Filter Page Header */}
      <div className="relative pt-40 pb-20 md:pt-56 md:pb-32 overflow-hidden bg-[#4FA3D1] text-center text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-multiply"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1559027615-cd9d732ffadd?q=80&w=1600&auto=format&fit=crop")' }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/20"></div>
        
        <div className="relative z-10 container mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-black font-playful mb-6 drop-shadow-xl">Join Our Team</h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto opacity-90 font-medium font-sans">
            Lend your skills, your time, and your heart to help us save more smiles.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-6 py-24">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-20">
          <div className="lg:w-1/2 space-y-8">
            <h1 className="text-6xl font-black font-playful text-[#4FA3D1]">Become a <br /><span className="text-[#F6C453]">Smile Ambassador</span></h1>
            <p className="text-xl text-slate-600 leading-relaxed font-sans">
            At <i>Smiles of Hope for Children Foundation (SHCF)</i>, we believe meaningful change happens when passionate people come together to serve children and communities. We welcome individuals who share our commitment to prevention, equity, and community-centered care to join us in bringing hope one smile at a time.
            <br>
            Whether you are a healthcare professional, student, community advocate, or supporter, there are many ways to contribute your skills, time, and expertise to our mission.
            </br>
            </p>
            
            <div className="space-y-6 font-sans">
              {[
                { title: "Who Can Join", desc: "Oral health professionals (dentists, dental therapists, hygienists)" },
                { title: "Ways to Get Involved", desc: "Train to deliver oral health workshops to schools." },
                { title: "Why Join Us", desc: "Sponsor a community and see the impact directly." }
              ].map((role, i) => (
                <div key={i} className="flex gap-6 items-start p-6 bg-white rounded-3xl shadow-sm border border-slate-100">
                  <div className="w-12 h-12 rounded-2xl bg-[#EBF6FC] flex items-center justify-center text-2xl flex-shrink-0">
                    <svg className="w-6 h-6 text-[#4FA3D1]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1 font-playful">{role.title}</h4>
                    <p className="text-sm text-[#4FA3D1] font-bold">{role.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 bg-white p-12 rounded-[3rem] shadow-2xl border border-slate-100">
             {!submitted ? (
               <>
                 <h3 className="text-3xl font-bold mb-8 font-playful text-center text-slate-900">{FORM_TITLE}</h3>
                 <form ref={formRef} className="space-y-6 font-sans" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                      <input required type="text" name="full_name" placeholder="Full Name" className="w-full p-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-[#4FA3D1] text-[#4FA3D1]" />
                    </div>
                    <div className="space-y-2">
                      <input required type="email" name="email_address" placeholder="Email Address" className="w-full p-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-[#4FA3D1] text-[#4FA3D1]" />
                    </div>
                    <div className="space-y-2">
                      <select required name="area_of_interest" className="w-full p-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-[#4FA3D1] text-[#4FA3D1]">
                        <option value="" className="text-slate-500">Select Area of Interest</option>
                        <option>Field Volunteering</option>
                        <option>Expert Consultancy</option>
                        <option>Donation Sponsorship</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <textarea required name="about_yourself" rows={4} placeholder="Tell us a little about why you want to join..." className="w-full p-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-[#4FA3D1] text-[#4FA3D1]"></textarea>
                    </div>
                    <button 
                      disabled={isSubmitting}
                      className={`w-full bg-[#4FA3D1] text-white font-bold py-5 rounded-2xl text-xl transition-all shadow-xl flex items-center justify-center ${isSubmitting ? 'opacity-70' : 'hover:bg-slate-900'}`}
                    >
                      {isSubmitting ? 'Sending...' : 'Submit Application'}
                    </button>
                 </form>
               </>
             ) : (
               <div className="text-center py-10 space-y-6">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-4xl">
                  ✓
                </div>
                <h3 className="text-3xl font-bold font-playful text-slate-900">Application Received!</h3>
                <p className="text-slate-600 font-sans text-lg">
                  Thank you for your interest! Your application has been sent to <span className="text-[#4FA3D1] font-bold">{LEAD_EMAIL}</span>. We will review your application and contact you soon.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="bg-[#4FA3D1] text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-slate-900 transition-all"
                >
                  Apply for another role
                </button>
              </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinPage;

