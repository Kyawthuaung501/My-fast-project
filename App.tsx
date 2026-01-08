
import React, { useState, useEffect } from 'react';
import ProductForm from './components/ProductForm';
import ContentDisplay from './components/ContentDisplay';
import ImageGenerator from './components/ImageGenerator';
import LogoGenerator from './components/LogoGenerator';
import HistoryList from './components/HistoryList';
import ActivityLog from './components/ActivityLog';
import GmailSettings from './components/GmailSettings';
import { MarketingPlan, LoadingState, HistoryItem } from './types';
import { generateMarketingContent } from './geminiService';

const App: React.FC = () => {
  const [marketingPlan, setMarketingPlan] = useState<MarketingPlan | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [logs, setLogs] = useState<string[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isGmailOpen, setIsGmailOpen] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('app_history');
    if (saved) setHistory(JSON.parse(saved));
    setEmail(localStorage.getItem('rehit_user_gmail') || '');
  }, []);

  const addLog = (msg: string) => setLogs(p => [`${msg}`, ...p.slice(0, 49)]);

  const handleFormSubmit = async (input: any) => {
    setLoadingState(LoadingState.ANALYZING);
    setMarketingPlan(null);
    setImageUrl(undefined);
    addLog("🚀 AI အင်ဂျင်ကို စတင်နှိုးဆော်နေပါသည်...");

    try {
      const plan = await generateMarketingContent(input);
      setMarketingPlan(plan);
      addLog("✅ အရောင်းဗျူဟာနှင့် စာသားများ အဆင်သင့်ဖြစ်ပါပြီ။");
      
      const newItem: HistoryItem = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        productName: plan.productName,
        productLink: input.link || '',
        plan,
        status: 'DRAFT'
      };
      
      const updatedHistory = [newItem, ...history.slice(0, 19)];
      setHistory(updatedHistory);
      localStorage.setItem('app_history', JSON.stringify(updatedHistory));
      setLoadingState(LoadingState.COMPLETE);
    } catch (e: any) {
      setLoadingState(LoadingState.ERROR);
      addLog(`❌ ERROR: ${e.message}`);
    }
  };

  return (
    <div className="min-h-screen pb-24 selection:bg-indigo-100 overflow-x-hidden">
      <nav className="bg-white/90 backdrop-blur-xl border-b border-slate-100 px-4 md:px-8 py-4 flex justify-between items-center sticky top-0 z-[100] shadow-sm">
        <div className="flex items-center gap-3">
           <div className="relative">
             <h1 className="gold-3d-text text-3xl md:text-4xl animate-float-gold tracking-tighter">ဈေးသည်</h1>
             <div className="absolute -top-1 -right-4 flex items-center gap-1">
               <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
               <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest">LIVE AI</span>
             </div>
           </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setIsGmailOpen(true)} className="p-3 bg-white border border-slate-100 shadow-sm rounded-xl text-lg transition-all active:scale-90">📧</button>
          <button onClick={() => setIsHistoryOpen(true)} className="p-3 bg-white border border-slate-100 shadow-sm rounded-xl text-lg transition-all active:scale-90">🕒</button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-6 md:space-y-8 order-1">
          <div className="bg-gradient-to-br from-indigo-600 to-indigo-900 p-8 md:p-10 rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl relative overflow-hidden ring-4 ring-indigo-50/50">
            <ProductForm onSubmit={handleFormSubmit} isLoading={loadingState === LoadingState.ANALYZING} />
          </div>
          <LogoGenerator />
          <ActivityLog logs={logs} />
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-8 order-2">
          {marketingPlan ? (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
              <ContentDisplay plan={marketingPlan} />
              <div className="h-px bg-slate-200 my-8"></div>
              <ImageGenerator 
                productName={marketingPlan.productName} 
                initialImageUrl={imageUrl}
                onImageGenerated={(url) => setImageUrl(url)}
                isLoadingExternally={loadingState === LoadingState.ANALYZING}
              />
            </div>
          ) : (
            <div className="min-h-[400px] md:h-[650px] bg-white/40 border-4 border-dashed border-slate-200 rounded-[2.5rem] md:rounded-[4rem] flex flex-col items-center justify-center text-center p-8 md:p-16 backdrop-blur-md relative overflow-hidden group">
              <div className="w-20 h-20 bg-white rounded-3xl shadow-xl flex items-center justify-center mb-8 text-indigo-600 text-3xl animate-bounce border border-slate-100">✨</div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 tracking-tight">သင်၏ အရောင်းလက်ထောက် အသင့်ရှိနေပါသည်</h2>
              <p className="text-slate-500 text-sm md:text-base max-w-md leading-relaxed font-medium">
                ဘယ်ဘက်တွင် လင့်ခ် သို့မဟုတ် ဓာတ်ပုံထည့်သွင်းပေးပါ။ AI က သင့်အတွက် အကောင်းဆုံး အရောင်းပိုစ့်နှင့် ဗျူဟာများကို ဖန်တီးပေးပါမည်။
              </p>
            </div>
          )}
        </div>
      </main>

      {isGmailOpen && <GmailSettings onEmailChange={setEmail} onClose={() => setIsGmailOpen(false)} />}
      
      {isHistoryOpen && (
        <div className="fixed inset-0 z-[200] flex justify-end">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity duration-500" onClick={() => setIsHistoryOpen(false)}></div>
          <div className="w-full max-w-md bg-white h-full relative z-[201] p-8 md:p-10 shadow-2xl animate-in slide-in-from-right duration-500 overflow-y-auto">
            <div className="flex justify-between items-center mb-8">
               <h2 className="text-2xl font-black text-slate-900">🕒 မှတ်တမ်းများ</h2>
               <button onClick={() => setIsHistoryOpen(false)} className="p-3 hover:bg-slate-100 rounded-full transition-all">✕</button>
            </div>
            <HistoryList 
              history={history} 
              onSelectItem={(i) => { 
                setMarketingPlan(i.plan); 
                setImageUrl(i.imageUrl); 
                setIsHistoryOpen(false); 
              }} 
              onClear={() => {
                if(confirm('မှတ်တမ်းများကို ဖျက်ရန် သေချာပါသလား?')) {
                  setHistory([]);
                  localStorage.removeItem('app_history');
                }
              }} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
