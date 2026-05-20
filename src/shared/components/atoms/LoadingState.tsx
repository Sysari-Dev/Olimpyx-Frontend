import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  text?: string;
  variant?: "primary" | "secondary" | "tertiary";
  minHeight?: string;
}

export const LoadingState = ({ 
  text = "Cargando", 
  variant = "primary",
  minHeight = "60vh" 
}: LoadingStateProps) => {

  const spinnerColors = {
    primary: "text-primary",
    secondary: "text-secondary",
    tertiary: "text-tertiary"
  };

  const textColors = {
    primary: "text-gray/40",
    secondary: "text-gray/40",
    tertiary: "text-dark/90"
  };

  return (
    <div 
      className="flex flex-col items-center justify-center space-y-4 animate-in fade-in duration-500"
      style={{ minHeight }}
    >
      <div className="relative flex items-center justify-center">
        <Loader2 className={`w-12 h-12 animate-spin ${spinnerColors[variant]}`} />
      </div>
      <p className={`text-[10px] font-black uppercase tracking-widest ${textColors[variant]}`}>
        {text}
      </p>
    </div>
  );
};