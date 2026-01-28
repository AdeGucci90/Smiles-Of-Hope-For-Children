import React, { useState, useEffect, useRef } from 'react';
import { View } from '../App';
import { LEAD_EMAIL } from '../constants';
import { sendDonateForm } from '../services/emailService';

interface DonatePageProps {
  onNavigate: (view: View) => void;
}

const DonatePage: React.FC<DonatePageProps> = ({ onNavigate }) => {
  const [selectedTier, setSelectedTier] = useState<number | null>(null);
  const [displayAmount, setDisplayAmount] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const FORM_TITLE = "Support Information";

  // Sync display amount when a preset tier is selected
  useEffect(() => {
    if (selectedTier !== null) {
      setDisplayAmount(selectedTier.toLocaleString());
    } else {
      setDisplayAmount('');
    }
  }, [selectedTier]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove all non-numeric characters except decimals
    const rawValue = e.target.value.replace(/[^0-9.]/g, '');
    
    // Prevent multiple decimals
    const parts = rawValue.split('.');
    const cleanValue = parts[0] + (parts.length > 1 ? '.' + parts.slice(1).join('') : '');

    if (cleanValue === '') {
      setSelectedTier(null);
      setDisplayAmount('');
      return;
    }

    const numericValue = parseFloat(cleanValue);
    setSelectedTier(isNaN(numericValue) ? null : numericValue);

    // Format with commas for display
    // We split by decimal to only format the integer part
    const [integerPart, decimalPart] = cleanValue.split('.');
    const formattedInteger = integerPart ? parseInt(integerPart, 10).toLocaleString() : '';
    
    // Maintain the decimal point in the display string so user can type decimals
    const finalDisplay = cleanValue.includes('.') 
      ? `${formattedInteger}.${decimalPart || ''}`
      : formattedInteger;

    setDisplayAmount(finalDisplay);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (formRef.current) {
      const formData = new FormData(formRef.current);
      await sendDonateForm({
        first_name: formData.get('first_name') as string,
        last_name: formData.get('last_name') as string,
        email: formData.get('email') as string,
        donation_purpose: formData.get('donation_purpose') as string,
        amount: displayAmount ? `₦${displayAmount}` : '',
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
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?q=80&w=1600&auto=format&fit=crop")' }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/20"></div>
        
        <div className="relative z-10 container mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-black font-playful mb-6 drop-shadow-xl">Support Our Mission</h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto opacity-90 font-medium font-sans">
            Your generosity fuels our outreaches and transforms lives across underserved communities.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-6 py-20 flex flex-col lg:flex-row gap-20 items-start">
        <div className="lg:w-1/2 space-y-8">
           <span className="text-[#4FA3D1] font-bold uppercase tracking-[0.3em] text-sm font-sans">Make An Impact</span>
           <h1 className="text-6xl font-black font-playful text-slate-900 leading-tight">
             One Smile <br /><span className="text-[#F6C453]">At A Time</span>
           </h1>
           <p className="text-xl text-slate-800 leading-relaxed font-medium font-sans">
             Your contribution directly funds oral health screenings, distribution of fluoride toothpaste, and community education programs across underserved areas in Nigeria.
           </p>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {[
               { amount: 5000, impact: "Toothpaste for 50 children" },
               { amount: 25000, impact: "Full screening for a rural school" },
               { amount: 100000, impact: "Mobile clinic operations for 1 week" },
               { amount: 250000, impact: "Training for 20 community health workers" }
             ].map((tier, i) => (
               <button 
                 key={i}
                 onClick={() => setSelectedTier(tier.amount)}
                 className={`p-8 rounded-[2.5rem] border-4 transition-all text-left group ${
                   selectedTier === tier.amount 
                   ? 'border-[#4FA3D1] bg-[#EBF6FC] shadow-xl scale-105' 
                   : 'border-slate-100 hover:border-[#F6C453] hover:shadow-lg'
                 }`}
               >
                 <div className="text-3xl font-bold mb-2 text-[#4FA3D1] font-sans">₦{tier.amount.toLocaleString()}</div>
                 <p className="text-sm text-[#4FA3D1] font-bold uppercase tracking-widest font-sans">{tier.impact}</p>
               </button>
             ))}
           </div>
        </div>

        <div className="lg:w-1/2 w-full bg-[#EBF6FC] p-10 md:p-16 rounded-[4rem] shadow-2xl border-t-8 border-[#4FA3D1]">
           {!submitted ? (
             <>
               <h3 className="text-3xl font-bold mb-10 text-center font-playful text-slate-900">{FORM_TITLE}</h3>
               <form ref={formRef} className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-6 font-sans">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-[#4FA3D1] uppercase">First Name</label>
                      <input required type="text" name="first_name" className="w-full p-4 rounded-2xl bg-white border-none focus:ring-2 focus:ring-[#4FA3D1] text-[#4FA3D1]" placeholder="Jane" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-[#4FA3D1] uppercase">Last Name</label>
                      <input required type="text" name="last_name" className="w-full p-4 rounded-2xl bg-white border-none focus:ring-2 focus:ring-[#4FA3D1] text-[#4FA3D1]" placeholder="Doe" />
                    </div>
                  </div>
                  <div className="space-y-2 font-sans">
                    <label className="text-sm font-bold text-[#4FA3D1] uppercase">Email Address</label>
                    <input required type="email" name="email" className="w-full p-4 rounded-2xl bg-white border-none focus:ring-2 focus:ring-[#4FA3D1] text-[#4FA3D1]" placeholder="jane@example.com" />
                  </div>
                  <div className="space-y-2 font-sans">
                    <label className="text-sm font-bold text-[#4FA3D1] uppercase">Purpose of Donation</label>
                    <select required name="donation_purpose" className="w-full p-4 rounded-2xl bg-white border-none focus:ring-2 focus:ring-[#4FA3D1] text-[#4FA3D1] appearance-none cursor-pointer">
                      <option value="">Select Purpose</option>
                      <option>General Support</option>
                      <option>Mobile Dental Clinic</option>
                      <option>Toothpaste & Kits Distribution</option>
                      <option>Community Health Worker Training</option>
                      <option>School Screening Programs</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="space-y-2 font-sans">
                    <label className="text-sm font-bold text-[#4FA3D1] uppercase">Amount</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#4FA3D1] font-bold text-lg">₦</span>
                      <input 
                        required 
                        type="text" 
                        inputMode="numeric"
                        className="w-full p-4 pl-10 rounded-2xl bg-white border-none focus:ring-2 focus:ring-[#4FA3D1] text-[#4FA3D1]" 
                        placeholder="0.00" 
                        value={displayAmount} 
                        onChange={handleAmountChange} 
                      />
                    </div>
                  </div>
                  <button 
                    disabled={isSubmitting}
                    className={`w-full bg-[#F6C453] text-slate-900 font-bold py-6 rounded-2xl text-xl shadow-xl transition-all transform flex items-center justify-center ${isSubmitting ? 'opacity-70' : 'hover:bg-[#4FA3D1] hover:text-white hover:-translate-y-2'}`}
                  >
                    {isSubmitting ? 'Sending...' : 'Complete Donation'}
                  </button>
                  <p className="text-center text-xs text-[#4FA3D1] font-bold italic font-sans">
                    All donations are processed through secure gateways.
                  </p>
               </form>
             </>
           ) : (
             <div className="text-center py-10 space-y-6">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-4xl">
                  ✓
                </div>
                <h3 className="text-3xl font-bold font-playful text-slate-900">Thank You!</h3>
                <p className="text-slate-600 font-sans text-lg">
                  Your donation inquiry has been sent to <span className="text-[#4FA3D1] font-bold">{LEAD_EMAIL}</span>. We will follow up to finalize the process.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="bg-[#4FA3D1] text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-slate-900 transition-all"
                >
                  Return to form
                </button>
              </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default DonatePage;

