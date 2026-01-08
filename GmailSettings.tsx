
import React, { useState, useEffect } from 'react';

interface GmailSettingsProps {
  onEmailChange: (email: string) => void;
  onClose: () => void;
}

const GmailSettings: React.FC<GmailSettingsProps> = ({ onEmailChange, onClose }) => {
  const [email, setEmail] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem('rehit_user_gmail');
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  const handleSave = () => {
    if (email.includes('@')) {
      localStorage.setItem('rehit_user_gmail', email);
      onEmailChange(email);
      setIsSaved(true);
      setTimeout(() => {
        setIsSaved(false);
        onClose();
      }, 1000);
    } else {
      alert("မှန်ကန်သော Email လိပ်စာ ထည့်သွင်းပေးပါ။");
    }
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 relative z-[301] shadow-2xl animate-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-100 rounded-full transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <div className="flex flex-col items-center text-center mb-8">
          <div className="bg-red-100 p-4 rounded-[1.5rem] text-red-600 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </div>
          <h3 className="text-2xl font-black text-slate-900">Gmail Configuration</h3>
          <p className="text-slate-500 text-sm mt-2">AI မှ အစီရင်ခံစာများ ပေးပို့နိုင်ရန် <br/> သင့် Gmail လိပ်စာကို သတ်မှတ်ပါ။</p>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Receiver Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              className="w-full px-6 py-4 rounded-2xl border border-slate-200 bg-slate-50 text-sm focus:bg-white focus:border-red-400 outline-none transition-all font-bold"
            />
          </div>
          
          <button
            onClick={handleSave}
            className={`w-full py-4 rounded-2xl font-black text-sm transition-all flex items-center justify-center gap-2 shadow-xl ${
              isSaved ? 'bg-green-500 text-white shadow-green-100' : 'bg-slate-900 text-white hover:bg-red-600 shadow-slate-200'
            }`}
          >
            {isSaved ? 'SAVED SUCCESSFUL' : 'UPDATE GMAIL ADDRESS'}
          </button>
          
          <p className="text-[10px] text-slate-400 text-center font-bold uppercase tracking-tighter">
            * Reports will be auto-dispatched after generation
          </p>
        </div>
      </div>
    </div>
  );
};

export default GmailSettings;
