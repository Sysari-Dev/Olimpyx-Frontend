import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check, type LucideIcon } from "lucide-react";

interface Option {
  id: string | number;
  label: string;
}

interface SelectProps {
  icon: LucideIcon;
  title: string;
  value: string;
  options: Option[];
  onChange: (id: string | number) => void;
}

const Select = ({ icon: Icon, title, value, options, onChange }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block w-full lg:w-auto font-sans" ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-3 h-12 px-4 rounded-xl border transition-all duration-200 cursor-pointer select-none
          ${isOpen 
            ? "bg-white border-accent shadow-lg shadow-accent/5 ring-4 ring-accent/5" 
            : "bg-light/30 border-light hover:bg-white hover:border-accent/30"}
        `}
      >
        <div className={`p-1.5 rounded-lg transition-colors ${isOpen ? "bg-accent/10 text-accent" : "text-primary"}`}>
          <Icon size={18} />
        </div>

        <div className="flex flex-col grow min-w-0">
          <span className="text-[9px] md:text-[10px] uppercase font-black text-dark/40 leading-none tracking-widest mb-0.5 truncate">
            {title}
          </span>
          <span className="text-xs md:text-sm font-bold text-dark truncate max-w-30 md:max-w-35">
            {value}
          </span>
        </div>
        <ChevronDown 
          size={16} 
          className={`text-dark/30 transition-transform duration-300 ${isOpen ? "rotate-180 text-accent" : ""}`} 
        />
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full min-w-55 bg-white border border-light rounded-2xl shadow-2xl z-50 py-2 animate-in fade-in zoom-in-95 duration-200 origin-top">
          <div className="px-4 pb-2 pt-1 border-b border-light/50 mb-1">
            <span className="text-[10px] font-black text-dark/30 uppercase tracking-widest">Opciones</span>
          </div>
          <div className="max-h-60 overflow-y-auto custom-scrollbar">
            {options.map((option) => (
              <div
                key={option.id}
                onClick={() => { onChange(option.id); setIsOpen(false); }}
                className={`flex items-center justify-between px-4 py-2.5 mx-2 rounded-xl text-sm font-semibold transition-all cursor-pointer mb-0.5
                  ${value === option.label ? "bg-accent/5 text-accent" : "text-dark/70 hover:bg-light/50 hover:text-dark"}`}
              >
                <span className="truncate">{option.label}</span>
                {value === option.label && <Check size={14} />}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Select;