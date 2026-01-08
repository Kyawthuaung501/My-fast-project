import React, { useState, useEffect } from 'react';
import { generateProductVisual } from '../geminiService';

interface ImageGeneratorProps {
  productName: string;
  onImageGenerated?: (url: string) => void;
  initialImageUrl?: string;
  isLoadingExternally?: boolean;
}

const ImageGenerator: React.FC<ImageGeneratorProps> = ({ productName, onImageGenerated, initialImageUrl, isLoadingExternally }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(initialImageUrl || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [abortController, setAbortController] = useState<boolean>(false);

  useEffect(() => {
    setImageUrl(initialImageUrl || null);
  }, [initialImageUrl]);

  const handleGenerate = async () => {
    if (!productName) return;
    setLoading(true);
    setAbortController(false);
    setError(null);
    
    try {
      const url = await generateProductVisual(productName);
      // We check if it was manually stopped by user
      setImageUrl(prev => {
         if (abortController) return prev;
         if (onImageGenerated) onImageGenerated(url);
         return url;
      });
    } catch (e: any) {
      setError("ပုံထုတ်ရန် အခက်အခဲရှိနေပါသည်။ နောက်တစ်ကြိမ် ပြန်ကြိုးစားကြည့်ပါ။");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setAbortController(true);
    setLoading(false);
    setError(null);
  };

  const isAnyLoading = (loading || isLoadingExternally) && !abortController;

  return (
    <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-xl mt-6 relative overflow-hidden">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-black text-xl flex items-center gap-3">
          <span className="bg-indigo-100 p-2 rounded-xl text-indigo-600">🎬</span>
          AI Product Visual
        </h3>
        {imageUrl && !isAnyLoading && (
          <button 
            onClick={handleGenerate} 
            className="text-[10px] font-black text-indigo-600 uppercase hover:bg-indigo-50 px-4 py-2 rounded-xl transition-all"
          >
            Regenerate New
          </button>
        )}
      </div>

      {isAnyLoading ? (
        <div className="py-20 text-center bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200 animate-pulse">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
          <p className="font-black text-slate-900 text-lg">AI က ပုံဖော်နေပါသည်...</p>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-2">High-Resolution Studio Render</p>
          
          <button 
            onClick={handleCancel}
            className="mt-8 bg-white border-2 border-slate-200 text-slate-500 hover:text-red-500 hover:border-red-200 px-6 py-2.5 rounded-xl text-xs font-black transition-all shadow-sm active:scale-95 flex items-center gap-2 mx-auto"
          >
            ရပ်ဆိုင်းမည် (Cancel)
          </button>
        </div>
      ) : imageUrl ? (
        <div className="animate-in fade-in zoom-in-95 duration-500">
          <div className="relative rounded-[2rem] overflow-hidden border-4 border-white shadow-2xl group ring-1 ring-slate-100">
            <img src={imageUrl} className="w-full h-auto transition-transform duration-1000 group-hover:scale-105" alt="AI Visual" />
            <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
               <p className="text-white font-black text-lg">{productName}</p>
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            <a 
              href={imageUrl} 
              download={`${productName.replace(/\s+/g, '_')}.png`} 
              className="bg-slate-900 text-white px-10 py-4 rounded-2xl text-xs font-black shadow-2xl hover:bg-indigo-600 transition-all flex items-center gap-3"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              DOWNLOAD PNG
            </a>
          </div>
        </div>
      ) : (
        <div className="py-16 text-center bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg text-slate-300">🖼️</div>
          <p className="text-slate-400 text-xs font-bold mb-6 uppercase tracking-widest">No Visual Generated</p>
          <button 
            onClick={handleGenerate} 
            disabled={!productName} 
            className="bg-indigo-600 text-white px-10 py-4 rounded-2xl text-xs font-black disabled:opacity-50 shadow-xl hover:bg-indigo-700 transition-all"
          >
            Create Visual Now
          </button>
        </div>
      )}
      
      {error && <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-bold text-center border border-red-100 animate-bounce">⚠️ {error}</div>}
    </div>
  );
};

export default ImageGenerator;