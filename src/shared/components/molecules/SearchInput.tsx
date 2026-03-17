import { Search } from "lucide-react";

interface SearchInputProps {
  placeholder?: string;
  value: string;
  onChange: (val: string) => void;
  onSearch?: (val: string) => void;
  showButton?: boolean;
}

const SearchInput = ({ 
  placeholder, 
  value, 
  onChange, 
  onSearch, 
  showButton 
}: SearchInputProps) => {
  return (
    <div className="relative flex items-center gap-2">
      <div className="relative w-full">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/30" size={18} />
        <input 
          type="text" 
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-light/30 border border-light p-3 pl-12 rounded-2xl outline-none focus:bg-white focus:border-accent transition-all text-sm font-medium"
        />
      </div>
      {showButton && (
        <button 
          onClick={() => onSearch?.(value)}
          className="bg-dark text-white px-5 py-3 rounded-2xl text-sm font-bold hover:bg-accent transition-all cursor-pointer"
        >
          Buscar
        </button>
      )}
    </div>
  );
};

export default SearchInput;