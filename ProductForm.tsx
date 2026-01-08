
import React, { useState } from 'react';

interface ProductFormProps {
  onSubmit: (link: string) => void;
  isLoading: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, isLoading }) => {
  const [link, setLink] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (link && !isLoading) {
      onSubmit(link);
    }
  };

  return (
    <div className={`transition-all duration-500 ${isLoading ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
      <h2 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.828a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
        Analyze Amazon Link
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <div className="relative">
            <input
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="Paste Amazon link here..."
              className="w-full px-4 py-3.5 rounded-xl border-2 border-slate-100 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-orange-400 focus:ring-0 outline-none transition-all text-sm font-medium"
              required
              disabled={isLoading}
            />
          </div>
          <p className="mt-2 text-[10px] text-slate-400 font-bold uppercase tracking-tight ml-1">
            * AI uses real-time search for product data
          </p>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3.5 rounded-xl font-black text-white text-sm transition-all active:scale-[0.98] shadow-lg ${
            isLoading 
              ? 'bg-slate-300' 
              : 'bg-slate-900 hover:bg-orange-600 shadow-slate-200'
          }`}
        >
          {isLoading ? 'Processing Task...' : 'Generate Content'}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
