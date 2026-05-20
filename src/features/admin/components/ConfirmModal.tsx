import { AlertTriangle, X } from "lucide-react";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel }: ConfirmModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden relative animate-slide-up">
        <button 
          onClick={onCancel}
          className="absolute top-4 right-4 p-2 text-dark/40 hover:text-dark hover:bg-light/50 rounded-full transition-colors"
        >
          <X size={20} />
        </button>

        <div className="p-8 text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6">
            <AlertTriangle size={32} />
          </div>
          <h3 className="text-2xl font-black text-dark tracking-tight mb-2">
            {title}
          </h3>
          <p className="text-dark/60 font-medium mb-8 leading-relaxed">
            {message}
          </p>
          <div className="flex w-full gap-3">
            <button
              onClick={onCancel}
              className="flex-1 px-4 py-3 rounded-xl font-bold text-dark bg-light/50 hover:bg-light transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-3 rounded-xl font-black text-white bg-red-500 hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20 active:scale-95"
            >
              Sí, eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};