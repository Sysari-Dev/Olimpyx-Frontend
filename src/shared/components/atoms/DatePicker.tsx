import { useState, useRef, useEffect } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { formatDateShort, getDaysInMonth, getFirstDayOfMonth } from "@utils/date";

interface DatePickerProps {
  date: Date;
  onChange: (date: Date) => void;
}

const DatePicker = ({ date, onChange }: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(new Date(date));
  const containerRef = useRef<HTMLDivElement>(null);

  const daysOfWeek = ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"];
  const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block w-full lg:w-auto font-sans" ref={containerRef}>
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
          <CalendarIcon size={18} />
        </div>
        <div className="flex flex-col grow min-w-0">
          <span className="text-[9px] md:text-[10px] uppercase font-black text-dark/40 leading-none tracking-widest mb-0.5 truncate">
            Fecha Seleccionada
          </span>
          <span className="text-xs md:text-sm font-bold text-dark truncate">
            {formatDateShort(date)}
          </span>
        </div>
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 lg:left-auto lg:right-0 mt-2 w-70 bg-white border border-light rounded-2xl shadow-2xl z-50 p-4 animate-in fade-in zoom-in-95 duration-200 origin-top">
          <div className="flex items-center justify-between mb-4 px-1">
            <button onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))} className="p-1.5 hover:bg-light rounded-lg text-dark/40 cursor-pointer transition-colors">
              <ChevronLeft size={18} />
            </button>
            <span className="text-sm font-black text-dark tracking-tight">
              {months[viewDate.getMonth()]} {viewDate.getFullYear()}
            </span>
            <button onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))} className="p-1.5 hover:bg-light rounded-lg text-dark/40 cursor-pointer transition-colors">
              <ChevronRight size={18} />
            </button>
          </div>
          
          <div className="grid grid-cols-7 gap-1 mb-2">
            {daysOfWeek.map(day => (
              <div key={day} className="text-[10px] font-black text-dark/30 text-center uppercase tracking-widest">{day}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: getFirstDayOfMonth(viewDate.getFullYear(), viewDate.getMonth()) }).map((_, i) => (
              <div key={`empty-${i}`} className="h-8 w-8" />
            ))}
            {Array.from({ length: getDaysInMonth(viewDate.getFullYear(), viewDate.getMonth()) }).map((_, i) => {
              const d = i + 1;
              const isSelected = d === date.getDate() && viewDate.getMonth() === date.getMonth() && viewDate.getFullYear() === date.getFullYear();
              return (
                <button
                  key={d}
                  onClick={() => { onChange(new Date(viewDate.getFullYear(), viewDate.getMonth(), d)); setIsOpen(false); }}
                  className={`h-8 w-8 text-[11px] font-bold rounded-lg transition-all cursor-pointer
                    ${isSelected ? "bg-accent text-white shadow-md shadow-accent/30" : "text-dark/70 hover:bg-light hover:text-dark"}`}
                >
                  {d}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default DatePicker;