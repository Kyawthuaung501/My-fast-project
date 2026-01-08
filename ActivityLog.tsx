
import React, { useRef, useEffect } from 'react';

const ActivityLog: React.FC<{ logs: string[] }> = ({ logs }) => {
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className="bg-slate-900 rounded-3xl p-5 text-slate-400 mt-6 shadow-2xl border border-slate-800">
      <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
        <h3 className="text-[10px] font-black uppercase tracking-widest text-orange-500 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
          Live Console
        </h3>
        <span className="text-[9px] font-mono text-slate-600">v4.0.1</span>
      </div>
      <div className="h-44 overflow-y-auto font-mono text-[10px] space-y-2 scrollbar-hide pr-2">
        {logs.length === 0 ? (
          <div className="opacity-30 italic flex items-center gap-2">
            <span className="text-slate-700">_</span>
            Awaiting input...
          </div>
        ) : (
          logs.map((log, i) => (
            <div key={i} className="flex gap-2 animate-in fade-in duration-300">
              <span className="text-orange-500 shrink-0">➜</span>
              <span className="leading-normal break-words">{log}</span>
            </div>
          ))
        )}
        <div ref={logEndRef} />
      </div>
    </div>
  );
};

export default ActivityLog;
