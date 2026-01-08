
import React, { useState, useEffect } from 'react';
import { generateProductVisual } from '../services/geminiService';

interface ImageGeneratorProps {
  productName: string;
  onImageGenerated?: (url: string) => void;
  initialImageUrl?: string;
}

const ImageGenerator: React.FC<ImageGeneratorProps> = ({ productName, onImageGenerated, initialImageUrl }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(initialImageUrl || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setImageUrl(initialImageUrl || null);
  }, [initialImageUrl, productName]);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    try {
      const url = await generateProductVisual(productName);
      setImageUrl(url);
      if (onImageGenerated) onImageGenerated(url);
    } catch (e) {
      setError("AI Image Service Error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 bg-white rounded-[2.5rem] shadow-xl border border-slate-200 p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
          <div className="bg-purple-100 p-2 rounded-xl text-purple-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          AI Creative Visual
        </h3>
        {imageUrl && !loading && (
           <button onClick={handleGenerate} className="text-xs font-black text-purple-600 hover:bg-purple-50 px-4 py-2 rounded-xl transition-all">GENERATE NEW</button>
        )}
      </div>

      {!imageUrl && !loading && (
        <div className="text-center py-16 bg-slate-50 rounded-[2rem] border-4 border-dashed border-slate-200 group hover:border-purple-300 transition-all">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg text-slate-300 group-hover:text-purple-400 transition-colors">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
             </svg>
          </div>
          <p className="text-slate-500 font-bold mb-6">Create copyright-free product visual</p>
          <button
            onClick={handleGenerate}
            className="bg-purple-600 hover:bg-purple-700 text-white font-black py-4 px-10 rounded-2xl transition shadow-xl shadow-purple-200 active:scale-95"
          >
            Start Image Generation
          </button>
        </div>
      )}

      {loading && (
        <div className="text-center py-24 bg-slate-50 rounded-[2rem] animate-pulse">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-100 border-t-purple-600 mb-6"></div>
          <p className="text-slate-900 font-black text-xl italic">AI Artist is painting...</p>
        </div>
      )}

      {imageUrl && (
        <div className="animate-fade-in">
          <div className="relative group overflow-hidden rounded-[2rem] shadow-2xl border-4 border-white">
            <img 
              src={imageUrl} 
              alt="Generated Ad" 
              className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
               <a 
                href={imageUrl} 
                download={`${productName}_ad.png`}
                className="bg-white text-slate-900 px-6 py-3 rounded-xl font-black text-sm flex items-center gap-2 shadow-xl hover:bg-orange-500 hover:text-white transition-all"
               >
                  DOWNLOAD PNG
               </a>
            </div>
          </div>
        </div>
      )}
      
      {error && (
        <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-bold text-center border border-red-100">
          {error}
        </div>
      )}
    </div>
  );
};

export default ImageGenerator;
