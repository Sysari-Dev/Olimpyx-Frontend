import React from 'react';

const LiveBadge = () => {
  return (
    <div className="inline-flex items-center gap-1.5 bg-red-50 border border-red-100 px-2 py-1 rounded-lg">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
      </span>
      <span className="text-[10px] font-black text-red-600 uppercase tracking-tighter">
        En Vivo
      </span>
    </div>
  );
};

export default LiveBadge;