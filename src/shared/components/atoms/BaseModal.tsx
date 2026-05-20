import { useEffect } from "react";
import { X } from "lucide-react";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  children?: React.ReactNode;
  variant?: "danger" | "primary";
}

const BaseModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Aceptar",
  cancelText = "Cancelar",
  children,
  variant = "primary"
}: BaseModalProps) => {
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-dark-black/90 backdrop-blur-md transition-opacity duration-300 ease-out animate-fade-in" 
        onClick={onClose} 
      />
      <div className={`
        relative bg-background w-full max-w-md rounded-3xl p-10 
        shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] border border-white/5 
        flex flex-col gap-8 transform transition-all duration-300
        animate-modal-pop
      `}>
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 p-2 text-gray hover:text-light transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        <div className="space-y-3">
          <h3 className="text-3xl font-black text-light tracking-tighter leading-none">
            {title}
          </h3>
          <p className="text-sm font-medium text-gray leading-relaxed">
            {description}
          </p>
        </div>
        {children && <div className="py-2">{children}</div>}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
          <button
            onClick={onClose}
            className="w-full sm:flex-1 h-14 px-6 rounded-xl border border-white/10 text-gray font-bold text-xs uppercase tracking-widest hover:bg-white/5 transition-all active:scale-95 cursor-pointer"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              if (onConfirm) onConfirm();
              onClose();
            }}
            className={`w-full sm:flex-1 h-14 px-6 rounded-xl font-bold text-xs uppercase tracking-widest transition-all active:scale-95 cursor-pointer ${
              variant === "danger" 
                ? "bg-red-500 text-white hover:bg-red-600" 
                : "bg-secondary text-dark-black hover:opacity-90 shadow-lg shadow-secondary/10"
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BaseModal;