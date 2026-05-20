import { type LucideIcon, Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'filled' | 'outline';
  isLoading?: boolean;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  showShadow?: boolean;
  fullWidth?: boolean;
}

export const Button = ({
  children,
  variant = 'filled',
  isLoading = false,
  icon: Icon,
  iconPosition = 'left',
  showShadow = false,
  fullWidth = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) => {
  
  const baseStyles = "relative h-12 px-6 rounded-lg font-bold cursor-pointer text-[11px] uppercase transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100";
  
  const variants = {
    filled: "bg-white text-black hover:bg-gray-200",
    outline: "bg-transparent border border-white/20 text-white hover:bg-white/5 hover:border-white/40"
  };

  const shadowStyles = showShadow && variant === 'filled' 
    ? "shadow-xl shadow-white/10" 
    : "";

  const widthStyles = fullWidth ? "w-full" : "w-max";

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${shadowStyles} ${widthStyles} ${className}`}
      disabled={isLoading || disabled}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center animate-in fade-in duration-300">
          <Loader2 size={18} className="animate-spin" />
        </div>
      ) : (
        <>
          {Icon && iconPosition === 'left' && (
            <Icon size={16} className="transition-transform group-hover:scale-110" />
          )}
          <span className="relative z-10">{children}</span>
          {Icon && iconPosition === 'right' && (
            <Icon size={16} className="transition-transform group-hover:scale-110" />
          )}
        </>
      )}
    </button>
  );
};