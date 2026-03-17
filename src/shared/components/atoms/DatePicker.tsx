import { Calendar as CalendarIcon } from "lucide-react";

interface DatePickerProps {
  date?: Date;
  onChange?: (date: Date) => void;
}

const DatePicker = ({ date = new Date(), onChange }: DatePickerProps) => {
  // Formateador simple para obtener "17 Mar"
  const formattedDate = date.toLocaleDateString('es-ES', { 
    day: 'numeric', 
    month: 'short' 
  }).replace('.', '');

  return (
    <div className="relative">
      <label className="flex items-center gap-2 bg-white border border-light px-4 py-3 rounded-2xl text-sm font-bold text-dark/70 hover:bg-light transition-all cursor-pointer active:scale-95">
        <CalendarIcon size={18} className="text-accent" />
        <span className="capitalize">
          {date.toDateString() === new Date().toDateString() ? 'Hoy, ' : ''}
          {formattedDate}
        </span>
        <input 
          type="date" 
          className="absolute inset-0 opacity-0 cursor-pointer"
          onChange={(e) => onChange?.(new Date(e.target.value))}
        />
      </label>
    </div>
  );
};

export default DatePicker;