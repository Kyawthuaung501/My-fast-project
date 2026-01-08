
import React, { useState } from 'react';

interface PasswordGateProps {
  onSuccess: () => void;
}

const PasswordGate: React.FC<PasswordGateProps> = ({ onSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '1411985') {
      onSuccess();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
      <div className="w-full max-w-md bg-white rounded-[3rem] p-10 shadow-2xl border border-slate-100 text-center animate-in zoom-in-95 duration-500">
        <div className="w-20 h-20 bg-indigo-600 rounded-[2rem] flex items-center justify-center text-white text-3xl mx-auto mb-8 shadow-2xl shadow-indigo-200 rotate-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        
        <h2 className="text-3xl font-black text-slate-900 mb-2">မင်္ဂလာပါ</h2>
        <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-10">Access Verification Required</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password ရိုက်ထည့်ပါ..."
              className={`w-full px-8 py-5 rounded-2xl bg-slate-100 border-2 ${error ? 'border-red-500 animate-shake' : 'border-transparent focus:border-indigo-600'} focus:bg-white text-center text-lg font-black tracking-widest outline-none transition-all`}
              autoFocus
            />
          </div>
          
          <button
            type="submit"
            className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl shadow-2xl hover:bg-indigo-600 transition-all active:scale-[0.98] uppercase tracking-[0.2em] text-xs"
          >
            Enter System
          </button>
        </form>
        
        {error && <p className="mt-4 text-red-500 font-black text-xs uppercase animate-bounce">Incorrect Password!</p>}
        
        <div className="mt-12 pt-8 border-t border-slate-100">
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Authorized Personnel Only</p>
        </div>
      </div>
    </div>
  );
};

export default PasswordGate;
