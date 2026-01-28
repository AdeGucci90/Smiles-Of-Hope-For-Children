import React, { useState, useRef } from 'react';
import { View } from '../App';
import { LEAD_EMAIL } from '../constants';
import { sendContactForm } from '../services/emailService';

interface ContactPageProps {
  onNavigate: (view: View) => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  
  const address = "3rd Avenue 'O' House 7, Festac Town, Lagos, Nigeria";
  const encodedAddress = encodeURIComponent(address);
  const publicMapUrl = `https://www.google.com/maps?q=${encodedAddress}&output=embed`;
  const FORM_TITLE = "Contact Us";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (formRef.current) {
      const formData = new FormData(formRef.current);
      await sendContactForm({
        from_name: formData.get('from_name') as string,
        from_email: formData.get('from_email') as string,
        subject: formData.get('subject') as string,
        message: formData.get('message') as string,
      });
    }
    
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Integrated Blue Filter Page Header */}
      <div className="relative pt-40 pb-20 md:pt-56 md:pb-32 overflow-hidden bg-[#4FA3D1] text-center text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-multiply"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1534536281715-e28d76689b4d?q=80&w=1600&auto=format&fit=crop")' }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/20"></div>
        
        <div className="relative z-10 container mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-black font-playful mb-6 drop-shadow-xl">{FORM_TITLE}</h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto opacity-90 font-medium font-sans">
            Have questions or want to partner with us? We'd love to hear from you.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-20">
          {/* Contact Information */}
          <div className="space-y-12">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-slate-900 font-playful">Get in Touch</h2>
              <p className="text-lg text-slate-600 leading-relaxed font-sans">
                Whether you're a parent seeking advice, a community leader looking to host an outreach, or a potential donor, our team is ready to assist you.
              </p>
            </div>

            <div className="space-y-8 font-sans">
              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-[#EBF6FC] flex items-center justify-center text-[#4FA3D1] group-hover:bg-[#4FA3D1] group-hover:text-white transition-all shadow-sm">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div>
                  <h4 className="font-bold text-xl text-slate-900 mb-1 font-playful">Our Location</h4>
                  <p className="text-slate-600">{address}</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-[#EBF6FC] flex items-center justify-center text-[#4FA3D1] group-hover:bg-[#4FA3D1] group-hover:text-white transition-all shadow-sm">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <div>
                  <h4 className="font-bold text-xl text-slate-900 mb-1 font-playful">Phone Number</h4>
                  <p className="text-slate-600">+234 803 720 2050</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-[#EBF6FC] flex items-center justify-center text-[#4FA3D1] group-hover:bg-[#4FA3D1] group-hover:text-white transition-all shadow-sm">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <h4 className="font-bold text-xl text-slate-900 mb-1 font-playful">Email Address</h4>
                  <p className="text-slate-600">{LEAD_EMAIL}</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-8 font-sans">
              <h4 className="font-bold text-slate-900 mb-4 uppercase tracking-widest text-sm">Follow Our Impact</h4>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center hover:bg-[#F6C453] hover:text-white transition-all" aria-label="Facebook">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z"></path></svg>
                </a>
                <a href="https://www.instagram.com/smilesofhope_foundation/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center hover:bg-[#F6C453] hover:text-white transition-all" aria-label="Instagram">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.332 3.608 1.308.975.975 1.245 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.332 2.633-1.308 3.608-.975.975-2.242 1.245-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.332-3.608-1.308-.975-.975-1.245-2.242-1.308-3.608-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.245 3.608-1.308 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-1.735.079-3.508.412-4.755 1.659-1.248 1.248-1.579 3.024-1.659 4.755-.058 1.28-.072 1.688-.072 4.947s.014 3.667.072 4.947c.079 1.735.412 3.508 1.659 4.755 1.247 1.247 3.022 1.579 4.755 1.659 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c1.735-.079 3.508-.412 4.755-1.659 1.248-1.248-1.579-3.024 1.659-4.755.058-1.28.072-1.689.072-4.947s-.014-3.667-.072-4.947c-.079-1.735-.412-3.508-1.659-4.755-1.247-1.247-3.022-1.579-4.755-1.659-1.281-.058-1.689-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path></svg>
                </a>
                <a href="https://x.com/OfHope30433" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center hover:bg-[#F6C453] hover:text-white transition-all" aria-label="X (Twitter)">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"></path></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-10 md:p-16 rounded-[4rem] shadow-2xl border border-slate-100 relative font-sans">
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#F6C453] rounded-full flex items-center justify-center shadow-xl animate-bounce">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </div>
            
            {!submitted ? (
              <>
                <h3 className="text-3xl font-bold mb-10 font-playful text-center text-slate-900">Send us a Message</h3>
                <form ref={formRef} className="space-y-6" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#4FA3D1] uppercase ml-2">Full Name</label>
                    <input 
                      required
                      type="text" 
                      name="from_name"
                      placeholder="John Doe" 
                      className="w-full p-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-[#4FA3D1] transition-all text-[#4FA3D1]" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#4FA3D1] uppercase ml-2">Email Address</label>
                    <input 
                      required
                      type="email" 
                      name="from_email"
                      placeholder="john@example.com" 
                      className="w-full p-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-[#4FA3D1] transition-all text-[#4FA3D1]" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#4FA3D1] uppercase ml-2">Subject</label>
                    <input 
                      required
                      type="text" 
                      name="subject"
                      placeholder="Inquiry Topic" 
                      className="w-full p-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-[#4FA3D1] transition-all text-[#4FA3D1]" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#4FA3D1] uppercase ml-2">Message</label>
                    <textarea 
                      required
                      name="message"
                      rows={5} 
                      placeholder="Your message here..." 
                      className="w-full p-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-[#4FA3D1] transition-all text-[#4FA3D1]"
                    ></textarea>
                  </div>
                  <button 
                    disabled={isSubmitting}
                    className={`w-full bg-[#4FA3D1] text-white font-bold py-6 rounded-2xl text-xl shadow-xl transition-all transform hover:-translate-y-1 flex items-center justify-center ${isSubmitting ? 'opacity-70' : 'hover:bg-slate-900'}`}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-10 space-y-6">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-4xl">
                  ✓
                </div>
                <h3 className="text-3xl font-bold font-playful text-slate-900">Message Sent!</h3>
                <p className="text-slate-600 font-sans text-lg">
                  Thank you! Your message has been sent to <span className="text-[#4FA3D1] font-bold">{LEAD_EMAIL}</span>. Our team will get back to you shortly.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="text-[#4FA3D1] font-bold border-b-2 border-[#4FA3D1] hover:text-[#F6C453] hover:border-[#F6C453] transition-all"
                >
                  Send another message
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Real Google Map Section */}
      <div className="container mx-auto px-6 pb-24 font-sans">
        <div className="w-full h-[500px] bg-slate-100 rounded-[3rem] overflow-hidden relative shadow-2xl border-8 border-white">
          <iframe 
            title="Smiles of Hope Foundation Location"
            width="100%" 
            height="100%" 
            frameBorder="0" 
            scrolling="no" 
            marginHeight={0} 
            marginWidth={0} 
            src={publicMapUrl}
            className="grayscale hover:grayscale-0 transition-all duration-700"
            allowFullScreen
          ></iframe>
        </div>
        <p className="text-center mt-6 text-[#4FA3D1] font-bold text-sm uppercase tracking-widest">
          Find us at: {address}
        </p>
      </div>
    </div>
  );
};

export default ContactPage;

