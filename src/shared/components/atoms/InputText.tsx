import type { LucideIcon } from "lucide-react";
import { TextError } from "./TextError";

interface InputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: LucideIcon;
  rightElement?: React.ReactNode;
  fullWidth?: boolean;
}

export const InputText = ({
  label,
  error,
  icon: Icon,
  rightElement,
  disabled,
  fullWidth = true,
  className = "",
  ...props
}: InputTextProps) => {
  const widthStyles = fullWidth ? "w-full" : "w-auto";

  return (
    <div className={`flex flex-col ${widthStyles} ${className}`}>
      {label && (
        <label className="text-sm font-black text-light ml-1 mb-2">
          {label} {props.required && <span className="text-secondary">*</span>}
        </label>
      )}
      <div className="relative group">
        {Icon && (
          <Icon
            className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 
              ${error ? "text-red-400" : "text-gray/20 group-focus-within:text-secondary"}`}
            size={16}
          />
        )}
        <input
          disabled={disabled}
          className={`
            w-full bg-[#292929] p-4 rounded-lg outline-none border transition-all duration-200 text-sm text-light placeholder:text-gray/40
            ${Icon ? "pl-12" : "pl-4"}
            ${rightElement ? "pr-12" : "pr-4"}
            ${error 
              ? "border-red-500/50 bg-red-500/5 focus:border-red-500" 
              : "border-[#292929] focus:border-secondary"}
            ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          `}
          {...props}
        />
        {rightElement && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray/20 hover:text-light transition-colors">
            {rightElement}
          </div>
        )}
      </div>
      <TextError>{error}</TextError>
    </div>
  );
};