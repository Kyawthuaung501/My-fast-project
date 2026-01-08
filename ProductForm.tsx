import React, { useState, useRef } from 'react';

interface ProductFormProps {
  onSubmit: (data: { link?: string; image?: { data: string; mimeType: string }; price?: string; phone?: string; }) => void;
  isLoading: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, isLoading }) => {
  const [link, setLink] = useState('');
  const [price, setPrice] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedImage, setSelectedImage] = useState<{ data: string; mimeType: string; name: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    if (!link && !selectedImage) return;
    onSubmit({ link, image: selectedImage ? { data: selectedImage.data, mimeType: selectedImage.mimeType } : undefined, price, phone });
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage({ data: (reader.result as string).split(',')[1], mimeType: file.type, name: file.name });
        setLink('');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-white p-2.5 rounded-2xl text-indigo-600 shadow-xl">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
           </svg>
        </div>
        <h2 className="text-2xl font-black text-white drop-shadow-md tracking-tight">Sales Lab</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-[10px] font-black text-indigo-100 uppercase tracking-[0.2em] ml-1 mb-2 block opacity-80">Product Input</label>
          {selectedImage ? (
            <div className="p-4 bg-white rounded-2xl flex items-center gap-4 border-2 border-indigo-400 shadow-xl animate-in zoom-in-95">
              <img src={`data:${selectedImage.mimeType};base64,${selectedImage.data}`} className="w-12 h-12 rounded-xl object-cover border" alt="Preview" />
              <div className="flex-1 min-w-0">
                <span className="text-xs text-slate-900 font-black truncate block">{selectedImage.name}</span>
                <span className="text-[10px] text-green-500 uppercase font-bold">Image Attached</span>
              </div>
              <button type="button" onClick={() => setSelectedImage(null)} className="text-slate-400 hover:text-red-500 p-2">✕</button>
            </div>
          ) : (
            <div className="flex gap-2">
              <input 
                value={link} 
                onChange={(e) => setLink(e.target.value)} 
                placeholder="လင့်ခ် ထည့်ပါ..." 
                className="flex-1 px-5 py-4 rounded-2xl border-2 border-transparent bg-white/10 text-white placeholder:text-white/40 text-sm font-bold focus:bg-white focus:text-slate-900 focus:placeholder:text-slate-400 outline-none transition-all shadow-inner" 
              />
              <button 
                type="button" 
                onClick={() => fileInputRef.current?.click()} 
                className="w-16 bg-white rounded-2xl text-indigo-600 flex items-center justify-center hover:bg-indigo-50 transition-all shadow-xl text-xl active:scale-95"
              >
                📷
              </button>
            </div>
          )}
          <input type="file" ref={fileInputRef} onChange={handleFile} className="hidden" accept="image/*" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black text-indigo-100 uppercase tracking-widest ml-1 block opacity-80">Price</label>
            <input 
              value={price} 
              onChange={(e) => setPrice(e.target.value)} 
              placeholder="၅၅၀၀ ကျပ်" 
              className="w-full px-5 py-3.5 rounded-2xl bg-white/10 text-white placeholder:text-white/40 border-2 border-transparent focus:bg-white focus:text-slate-900 outline-none transition-all text-sm font-bold" 
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black text-indigo-100 uppercase tracking-widest ml-1 block opacity-80">Phone</label>
            <input 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              placeholder="၀၉-...." 
              className="w-full px-5 py-3.5 rounded-2xl bg-white/10 text-white placeholder:text-white/40 border-2 border-transparent focus:bg-white focus:text-slate-900 outline-none transition-all text-sm font-bold" 
            />
          </div>
        </div>
      </div>

      <button 
        type="submit" 
        disabled={isLoading} 
        className="w-full py-5 bg-white text-indigo-600 font-black rounded-2xl shadow-2xl transition-all hover:bg-slate-50 active:scale-[0.98] disabled:opacity-50 uppercase text-xs tracking-[0.2em]"
      >
        {isLoading ? 'ဖန်တီးနေသည်...' : 'Generate Content'}
      </button>
      
      <p className="text-[9px] text-center text-white/50 font-bold uppercase tracking-widest">
        AI will analyze and craft a perfect post.
      </p>
    </form>
  );
};

export default ProductForm;