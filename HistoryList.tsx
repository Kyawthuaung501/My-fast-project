
import React from 'react';
import { HistoryItem } from '../types';

interface HistoryListProps {
  history: HistoryItem[];
  onSelectItem: (item: HistoryItem) => void;
  onClear: () => void;
}

const HistoryList: React.FC<HistoryListProps> = ({ history, onSelectItem, onClear }) => {
  if (history.length === 0) {
    return (
      <div className="py-20 text-center opacity-40">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="font-bold">No tasks yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-10">
      <div className="flex justify-between items-center px-1">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{history.length} Tasks Recorded</span>
        <button onClick={onClear} className="text-[10px] font-black text-red-500 hover:underline">Clear All</button>
      </div>
      
      {history.map((item) => (
        <div 
          key={item.id}
          onClick={() => onSelectItem(item)}
          className="bg-white border border-slate-200 rounded-2xl p-3 hover:border-orange-400 hover:shadow-md cursor-pointer transition-all flex items-center gap-3 group active:scale-[0.98]"
        >
          <div className="w-12 h-12 bg-slate-50 rounded-xl overflow-hidden shrink-0 border border-slate-100">
            {item.imageUrl ? (
              <img src={item.imageUrl} alt="" className="w-full h-full object-cover group-hover:scale-110 transition" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="font-black text-slate-800 group-hover:text-orange-600 transition truncate text-sm leading-tight">
              {item.productName}
            </h4>
            <div className="flex items-center justify-between mt-1">
              <span className="text-[9px] font-bold text-slate-400">{new Date(item.timestamp).toLocaleDateString()}</span>
              <span className={`text-[8px] font-black px-1.5 py-0.5 rounded uppercase ${
                item.status === 'APPROVED' ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-500'
              }`}>{item.status}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HistoryList;
