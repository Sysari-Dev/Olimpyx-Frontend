import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  text?: string;
  variant?: "primary" | "secondary";
  minHeight?: string;
}

export const LoadingState = ({ 
  text = "Cargando", 
  variant = "primary",
  minHeight = "60vh" 
}: LoadingStateProps) => {
  const colorClass = variant === "primary" ? "text-primary" : "text-secondary";

  return (
    <div 
      className="flex flex-col items-center justify-center space-y-4 animate-in fade-in duration-500"
      style={{ minHeight }}
    >
      <div className="relative flex items-center justify-center">
        <Loader2 className={`w-12 h-12 animate-spin ${colorClass}`} />
      </div>
      <p className="text-[10px] font-semibold text-gray/40 uppercase tracking-widest">
        {text}
      </p>
    </div>
  );
};