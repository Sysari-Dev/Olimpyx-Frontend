import { Search } from "lucide-react";

interface SearchInputProps {
  placeholder?: string;
  value: string;
  onChange: (val: string) => void;
  onSearch?: (val: string) => void;
  showButton?: boolean;
}

const SearchInput = ({ 
  placeholder = "Buscar...", 
  value, 
  onChange, 
  onSearch, 
  showButton = false 
}: SearchInputProps) => {

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className="flex items-center gap-3 w-full font-sans">
      <div className={`
        relative grow h-12 flex items-center rounded-xl border transition-all duration-200
        ${value 
          ? "bg-white border-accent/40 shadow-sm" 
          : "bg-light/30 border-light hover:bg-white hover:border-accent/30"}
        focus-within:bg-white focus-within:border-accent focus-within:ring-4 focus-within:ring-accent/5
      `}>
        <div className="pl-4 pr-2 transition-colors">
          <Search 
            size={18} 
            className={`${value ? "text-accent" : "text-dark/30"}`} 
          />
        </div>
        <input 
          type="text" 
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full h-full bg-transparent border-none outline-none text-xs md:text-sm font-bold text-dark placeholder:text-dark/30 placeholder:font-medium pr-4"
        />
      </div>
      {showButton && (
        <button 
          onClick={() => onSearch?.(value)}
          className="h-12 px-6 bg-accent text-white rounded-xl font-bold text-sm shadow-lg shadow-accent/20 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer shrink-0 flex items-center justify-center"
        >
          Buscar
        </button>
      )}
    </div>
  );
};

export default SearchInput;