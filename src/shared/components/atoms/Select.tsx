import { ChevronDown, type LucideIcon } from "lucide-react";

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
  return (
    <div className="relative group min-w-[180px]">
      <div className="flex items-center gap-3 bg-light/30 px-4 py-2 rounded-2xl border border-light cursor-pointer hover:bg-white transition-all group-active:scale-95">
        <Icon size={18} className="text-primary" />
        <div className="flex flex-col">
          <span className="text-[10px] uppercase font-black text-dark/40 leading-none tracking-wider">
            {title}
          </span>
          <span className="text-sm font-bold text-dark truncate max-w-[120px]">
            {value}
          </span>
        </div>
        <ChevronDown size={16} className="text-dark/30 ml-auto group-hover:text-accent transition-colors" />
      </div>
      
      {/* El desplegable se manejaría aquí con un estado o librería de Popover para mayor limpieza */}
    </div>
  );
};

export default Select;