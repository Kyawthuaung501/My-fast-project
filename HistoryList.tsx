
import React from 'react';
import { HistoryItem } from '../types';

interface HistoryListProps {
  history: HistoryItem[];
  onSelectItem: (item: HistoryItem) => void;
  onClear: () => void;
}

const HistoryList: React.FC<HistoryListProps> = ({ history, onSelectItem, onClear }) => {
  if (history.length === 0) return <div className="py-20 text-center opacity-40">No history found.</div>;
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center mb-4">
        <span className="text-[10px] font-bold uppercase text-slate-400">Records</span>
        <button onClick={onClear} className="text-[10px] text-red-500">Clear</button>
      </div>
      {history.map((item) => (
        <div key={item.id} onClick={() => onSelectItem(item)} className="p-3 bg-slate-50 rounded-xl border hover:border-orange-400 cursor-pointer transition-all">
          <h4 className="text-xs font-black truncate">{item.productName}</h4>
          <span className="text-[9px] text-slate-400">{new Date(item.timestamp).toLocaleDateString()}</span>
        </div>
      ))}
    </div>
  );
};

export default HistoryList;
