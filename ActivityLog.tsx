
import React from 'react';

interface ActivityLogProps {
  logs: string[];
}

const ActivityLog: React.FC<ActivityLogProps> = ({ logs }) => {
  return (
    <div className="bg-slate-900 rounded-3xl p-5 text-slate-300 border border-slate-800 shadow-xl overflow-hidden">
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-[10px] font-black uppercase tracking-widest text-orange-500 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
          Activity Console
        </h3>
      </div>
      <div className="h-32 overflow-y-auto space-y-1.5 font-mono text-[9px] scrollbar-hide">
        {logs.length === 0 ? (
          <p className="opacity-20 italic">Awaiting tasks...</p>
        ) : (
          logs.map((log, i) => (
            <div key={i} className="flex gap-2 border-l border-slate-700 pl-2 py-0.5 hover:bg-white/5 transition-colors">
              <span className="text-orange-500 opacity-50">›</span>
              <span className="leading-tight">{log}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ActivityLog;
