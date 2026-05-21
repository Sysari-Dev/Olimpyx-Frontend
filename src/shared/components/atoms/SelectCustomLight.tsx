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

export const SelectCustomLight = ({ 
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
        className={`w-full bg-white border border-dark/10 p-3 rounded-xl flex items-center justify-between transition-all group shadow-2xs
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:border-primary"}`}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors
            ${isOpen ? "bg-primary text-white" : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white"}`}>
            <Icon size={16} />
          </div>
          <div className="text-left min-w-0">
            {label && (
              <p className="text-[9px] font-black uppercase text-dark/40 tracking-widest leading-none mb-1">
                {label}
              </p>
            )}
            <p className="text-sm font-bold text-dark truncate">
              {selectedOption?.name || placeholder}
            </p>
          </div>
        </div>
        <ChevronDown
          size={14}
          className={`text-dark/40 transition-transform duration-300 ${isOpen ? "rotate-180 text-primary" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white border border-dark/10 rounded-xl p-2 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-200">
          <div className="max-h-60 overflow-y-auto custom-scrollbar space-y-1">
            {options.length === 0 ? (
              <p className="text-[10px] text-dark/40 text-center py-4 uppercase font-bold">Sin opciones</p>
            ) : (
              options.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleSelect(opt.id)}
                  className={`w-full flex items-center gap-3 p-2.5 rounded-lg transition-colors cursor-pointer text-left
                    ${selectedId === opt.id ? "bg-primary/5" : "hover:bg-dark/[0.02]"}`}
                >
                  <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${selectedId === opt.id ? "bg-primary" : "bg-dark/10"}`} />
                  <span className={`text-xs font-bold truncate ${selectedId === opt.id ? "text-primary" : "text-dark/70"}`}>
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