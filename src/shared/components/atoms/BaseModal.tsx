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
}

const BaseModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Aceptar",
  cancelText = "Cancelar",
  children
}: BaseModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose} 
      />
      <div className="relative bg-white w-full max-w-md rounded-2xl p-8 shadow-2xl border border-light animate-in zoom-in-95 duration-300 flex flex-col gap-6">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-dark/20 hover:text-dark transition-colors"
        >
          <X size={20} />
        </button>
        <div className="space-y-2">
          <h3 className="text-2xl font-black text-dark tracking-tighter leading-tight">
            {title}
          </h3>
          <p className="text-sm font-medium text-dark/40 leading-relaxed">
            {description}
          </p>
        </div>
        {children && <div className="py-2">{children}</div>}
        <div className="flex items-center gap-3 w-full mt-2">
          <button
            onClick={onClose}
            className="flex-1 h-12 px-6 rounded-xl border-2 border-light text-dark/40 font-bold text-xs uppercase tracking-widest hover:border-accent hover:text-accent transition-all active:scale-95 cursor-pointer"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              if (onConfirm) onConfirm();
              onClose();
            }}
            className="flex-1 h-12 px-6 rounded-xl bg-dark text-white font-bold text-xs uppercase tracking-widest shadow-lg shadow-dark/20 transition-all active:scale-95 cursor-pointer"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BaseModal;