interface FormSectionProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  footer?: React.ReactNode;
}

export const FormSection = ({ title, description, children, onSubmit, footer }: FormSectionProps) => {
  return (
    <div className="bg-[#1A1A1A] border border-white/5 rounded-lg overflow-hidden shadow-2xl">
      {(title || description) && (
        <div className="p-6">
          {title && <h3 className="text-xl font-bold text-light tracking-tight">{title}</h3>}
          {description && <p className="text-xs text-gray mt-1 font-medium">{description}</p>}
        </div>
      )}      
      <form onSubmit={onSubmit} className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {children}
        </div>        
        {footer && (
          <div className="pt-6 flex justify-end gap-4">
            {footer}
          </div>
        )}
      </form>
    </div>
  );
};