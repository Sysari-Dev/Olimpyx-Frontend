import { useState, useRef, useEffect } from "react";
import { ChevronDown, type LucideIcon } from "lucide-react";

interface Option {
  id: string;
  name: string;
}

interface Props {
  options: Option[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  label?: string;
  placeholder?: string;
  icon: LucideIcon;
  disabled?: boolean;
}

export const SelectCustom = ({ 
  options, 
  selectedId, 
  onSelect, 
  label, 
  placeholder = "Seleccionar...", 
  icon: Icon,
  disabled = false 
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find((opt) => opt.id === selectedId);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (id: string) => {
    onSelect(id);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full md:w-72" ref={menuRef}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-white/5 border border-white/5 p-3 rounded-lg flex items-center justify-between transition-all group
          ${disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-white/10 cursor-pointer hover:border-primary/40"}`}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors
            ${isOpen ? "bg-primary text-white" : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white"}`}>
            <Icon size={16} />
          </div>
          <div className="text-left min-w-0">
            {label && (
              <p className="text-[9px] font-black uppercase text-gray/40 tracking-widest leading-none mb-1">
                {label}
              </p>
            )}
            <p className="text-sm font-bold text-light truncate">
              {selectedOption?.name || placeholder}
            </p>
          </div>
        </div>
        <ChevronDown
          size={14}
          className={`text-gray transition-transform duration-300 ${isOpen ? "rotate-180 text-primary" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-2 bg-[#1A1A1A] border border-white/10 rounded-lg p-2 shadow-2xl z-100 animate-in fade-in zoom-in-95 duration-200">
          <div className="max-h-60 overflow-y-auto custom-scrollbar space-y-1">
            {options.length === 0 ? (
              <p className="text-[10px] text-gray/40 text-center py-4 uppercase font-bold">Sin opciones</p>
            ) : (
              options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleSelect(opt.id)}
                  className={`w-full flex items-center gap-3 p-2 rounded-md transition-colors cursor-pointer text-left
                    ${selectedId === opt.id ? "bg-primary/10" : "hover:bg-white/5"}`}
                >
                  <div className={`w-2 h-2 rounded-full shrink-0 ${selectedId === opt.id ? "bg-primary" : "bg-white/10"}`} />
                  <span className={`text-xs font-medium truncate ${selectedId === opt.id ? "text-primary" : "text-gray hover:text-light"}`}>
                    {opt.name}
                  </span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};