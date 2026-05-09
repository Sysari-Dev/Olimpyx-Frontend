import { TextError } from './TextError';

interface InputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export const InputText = ({ 
  label, 
  error, 
  disabled, 
  fullWidth = true, 
  className = "", 
  ...props 
}: InputTextProps) => {
  const baseInputStyles = "px-4 py-3 rounded-xl border-2 transition-all duration-200 outline-none text-dark font-medium";
  const stateStyles = error 
    ? "border-red-400 bg-red-50 focus:border-red-500" 
    : "border-light bg-background focus:border-primary focus:ring-1 focus:ring-primary/20";
  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed bg-gray-100 border-gray-200" : "";
  const widthStyles = fullWidth ? "w-full" : "w-auto";

  return (
    <div className={`flex flex-col ${widthStyles} ${className}`}>
      {label && (
        <label className="text-sm font-bold text-dark mb-1.5 ml-1">
          {label} {props.required && <span className="text-primary">*</span>}
        </label>
      )}      
      <input
        className={`${baseInputStyles} ${stateStyles} ${disabledStyles}`}
        disabled={disabled}
        {...props}
      />
      <TextError>{error}</TextError>
    </div>
  );
};