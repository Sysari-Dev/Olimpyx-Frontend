import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  buttonLabel?: string;
  buttonIcon?: React.ReactNode;
  onButtonClick?: () => void;
}

const PageHeader = ({ 
  title, 
  subtitle, 
  buttonLabel, 
  buttonIcon, 
  onButtonClick 
}: PageHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 animate-fade-in">
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-black text-dark tracking-tighter leading-none">
          {title}
        </h1>
        <p className="text-dark/50 font-medium text-sm md:text-base">
          {subtitle}
        </p>
      </div>
      {buttonLabel && (
        <button 
          onClick={onButtonClick}
          className="bg-accent text-white px-6 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 
                     hover:scale-105 active:scale-95 transition-all shadow-lg shadow-accent/20 cursor-pointer 
                     w-full md:w-auto"
        >
          {buttonIcon && <span className="shrink-0">{buttonIcon}</span>}
          <span className="whitespace-nowrap">{buttonLabel}</span>
        </button>
      )}
    </div>
  );
};

export default PageHeader;