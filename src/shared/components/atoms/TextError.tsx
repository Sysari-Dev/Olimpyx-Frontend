interface TextErrorProps {
  children: React.ReactNode;
}

export const TextError = ({ children }: TextErrorProps) => {
  if (!children) return null;
  
  return (
    <span className="text-xs font-medium text-red-500 mt-1 ml-1 animate-in fade-in duration-300">
      {children}
    </span>
  );
};