
import React, { useState } from 'react';
import { generateLogo } from '../geminiService';

const LogoGenerator: React.FC = () => {
  const [brandName, setBrandName] = useState('');
  const [style, setStyle] = useState('modern');
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateLogo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandName) return;
    setLoading(true);
    setError(null);
    try {
      const url = await generateLogo(brandName, style);
      setLogoUrl(url);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#1877F2] rounded-[2.5rem] p-8 border-4 border-indigo-400/30 shadow-2xl mt-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-white p-3 rounded-2xl text-[#1877F2] border-2 border-indigo-500 shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.172-1.172a4 4 0 115.656 5.656L10 17.657" />
          </svg>
        </div>
        <div>
          <h3 className="font-black text-2xl text-white drop-shadow-md">Logo Lab</h3>
          <p className="text-[10px] text-indigo-100 font-bold uppercase tracking-widest opacity-80">Brand Identity Creator</p>
        </div>
      </div>

      <form onSubmit={handleGenerateLogo} className="space-y-4 mb-6">
        <div className="space-y-3">
          <label className="text-[11px] font-black text-indigo-100 uppercase tracking-[0.2em] ml-1 block">
            Brand Name
          </label>
          <input 
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            placeholder="လုပ်ငန်းနာမည် ရိုက်ထည့်ပါ..."
            className="w-full px-5 py-4 rounded-2xl border-2 border-indigo-400 bg-white text-sm font-black text-slate-900 placeholder:text-slate-400 focus:ring-4 focus:ring-indigo-500/20 outline-none transition-all shadow-xl"
          />
          
          <div className="grid grid-cols-1 gap-3">
            <label className="text-[11px] font-black text-indigo-100 uppercase tracking-widest ml-1 block">Style Choice</label>
            <select 
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="w-full px-5 py-4 rounded-2xl border-2 border-indigo-400 bg-white text-sm font-black text-slate-900 focus:ring-4 focus:ring-indigo-500/20 outline-none transition-all shadow-lg cursor-pointer"
            >
              <option value="modern">Modern & Clean</option>
              <option value="minimalist">Minimalist</option>
              <option value="luxury">Luxury Gold</option>
              <option value="colorful">Playful Colorful</option>
              <option value="vintage">Classic Vintage</option>
            </select>
          </div>

          <button 
            type="submit" 
            disabled={loading || !brandName}
            className="group relative w-full py-4 bg-gradient-to-r from-indigo-700 via-violet-700 to-indigo-800 hover:from-indigo-600 hover:to-indigo-700 text-white font-black rounded-2xl shadow-2xl transition-all border-b-4 border-indigo-950 uppercase text-xs tracking-widest active:scale-[0.97] active:border-b-0 disabled:bg-slate-400 overflow-hidden"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ဖန်တီးနေသည်...
              </span>
            ) : 'Get Professional Logo'}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </button>
        </div>
      </form>

      {loading && (
        <div className="py-12 text-center animate-pulse flex flex-col items-center bg-white/10 rounded-3xl border border-white/20">
          <div className="w-10 h-10 border-4 border-white border-t-indigo-500 rounded-full animate-spin mb-4"></div>
          <p className="font-black text-white text-sm">သင့်အတွက် လိုဂို ဖန်တီးနေပါသည်...</p>
        </div>
      )}

      {logoUrl && !loading && (
        <div className="animate-in fade-in zoom-in-95 duration-500">
          <div className="relative rounded-[2rem] overflow-hidden border-4 border-white shadow-2xl group mx-auto">
            <img src={logoUrl} className="w-full h-auto" alt="Brand Logo" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <a 
                href={logoUrl} 
                download={`${brandName}_logo.png`}
                className="bg-white text-slate-900 px-6 py-3 rounded-xl font-black text-xs flex items-center gap-2 hover:bg-indigo-600 hover:text-white transition-all shadow-xl"
              >
                DOWNLOAD PNG
              </a>
            </div>
            {/* Watermark */}
            <div className="absolute bottom-3 right-4 text-[7px] text-white/40 font-bold uppercase tracking-widest pointer-events-none">
              Designed by ဈေးသည်
            </div>
          </div>
          <p className="text-[10px] text-center text-indigo-200 font-bold mt-4 uppercase tracking-tighter">
            High-quality vector style branding ready.
          </p>
        </div>
      )}

      {error && <div className="mt-4 p-3 bg-red-500/20 border border-red-500 text-white text-[10px] font-bold rounded-xl text-center">⚠️ {error}</div>}
    </div>
  );
};

export default LogoGenerator;
