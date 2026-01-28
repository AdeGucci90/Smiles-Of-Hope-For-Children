
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { LEAD_EMAIL } from '../constants';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: 'Hi! I am the Smiles of Hope assistant. How can I help you today regarding children\'s oral health?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRoutingLead, setIsRoutingLead] = useState(false);
  const [leadRouted, setLeadRouted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const FORM_TITLE = "Oral Health Assistant Inquiry";

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    const userInput = input.trim();
    if (!userInput || loading) return;

    setMessages(prev => [...prev, { role: 'user', text: userInput }]);
    setInput('');
    setLoading(true);

    try {
      // Defensive check for process.env
      const key = typeof process !== 'undefined' ? process.env.API_KEY : undefined;
      
      if (!key) {
        throw new Error("API Key not available");
      }

      const ai = new GoogleGenAI({ apiKey: key });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userInput,
        config: {
          systemInstruction: `
            You are a pediatric oral health assistant for the "Smiles of Hope for Children Foundation".
            Founder: Prof. Olubukola Olatosi.
            Goal: Answer questions about children's oral hygiene, preventive care, and the foundation's mission.
            Maintain a friendly, professional, and helpful tone.
            Avoid giving strict medical prescriptions; always suggest consulting a professional dentist for severe issues.
            Encourage practices like brushing twice daily with fluoride toothpaste and early dental visits.
            If a user wants to talk to a person or save their query, tell them they can use the "Send as Lead" button.
          `
        }
      });

      const responseText = response.text || "I'm sorry, I couldn't process that.";
      setMessages(prev => [...prev, { role: 'bot', text: responseText }]);
    } catch (error) {
      console.error("AI Error:", error);
      const errorMsg = error instanceof Error && error.message === "API Key not available" 
        ? "The AI assistant is currently offline. Please use our contact form for inquiries." 
        : "I'm having trouble connecting right now. Please try again in a moment.";
      setMessages(prev => [...prev, { role: 'bot', text: errorMsg }]);
    } finally {
      setLoading(false);
    }
  };

  const handleRouteLead = () => {
    setIsRoutingLead(true);
    // Simulate routing chat log to company email
    setTimeout(() => {
      setIsRoutingLead(false);
      setLeadRouted(true);
      console.log(`Lead captured: [${FORM_TITLE}] -> ${LEAD_EMAIL}`);
      setTimeout(() => setLeadRouted(false), 3000);
    }, 1500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {isOpen && (
        <div className="bg-white w-80 md:w-96 h-[500px] rounded-2xl shadow-2xl border border-slate-200 flex flex-col mb-4 overflow-hidden animate-slide-up">
          <div className="bg-[#4FA3D1] p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <div>
                <h4 className="font-bold text-sm">Oral Health Assistant</h4>
                <p className="text-[10px] text-white/80">Directed to {LEAD_EMAIL}</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-black/10 p-1 rounded transition-colors" aria-label="Close Chat">
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          
          <div ref={scrollRef} className="flex-grow p-4 overflow-y-auto space-y-4 bg-slate-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm shadow-sm ${m.role === 'user' ? 'bg-[#4FA3D1] text-white' : 'bg-white border text-slate-700'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border px-4 py-2 rounded-2xl text-sm animate-pulse">Thinking...</div>
              </div>
            )}
            {leadRouted && (
              <div className="flex justify-center">
                <div className="bg-green-100 text-green-700 text-[10px] px-3 py-1 rounded-full font-bold animate-bounce">Inquiry directed to team email!</div>
              </div>
            )}
          </div>

          <div className="p-4 border-t bg-white flex flex-col gap-3">
            <div className="flex gap-2">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type a question..."
                className="flex-grow bg-slate-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4FA3D1] text-[#4FA3D1]"
              />
              <button 
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="bg-[#4FA3D1] text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#3d8db8] transition-colors disabled:opacity-50"
                aria-label="Send Message"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </div>
            {messages.length > 2 && (
              <button 
                onClick={handleRouteLead}
                disabled={isRoutingLead}
                className={`text-[10px] font-bold text-[#4FA3D1] uppercase tracking-widest border border-[#4FA3D1]/30 rounded-full py-1.5 hover:bg-[#4FA3D1] hover:text-white transition-all ${isRoutingLead ? 'opacity-50' : ''}`}
              >
                {isRoutingLead ? 'Directing inquiry...' : 'Send Inquiry as Lead ✨'}
              </button>
            )}
          </div>
        </div>
      )}
      
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#F6C453] w-16 h-16 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform active:scale-95"
        aria-label="Open Oral Health Assistant"
      >
        {isOpen ? (
          <svg className="w-8 h-8 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        ) : (
          <svg className="w-8 h-8 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
        )}
      </button>

      <style>{`
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ChatBot;
