interface NavActionProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  badge?: number;
  variant?: 'default' | 'danger';
}

const NavAction = ({ icon, label, onClick, badge, variant = 'default' }: NavActionProps) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all cursor-pointer
        text-white/80 hover:bg-white/10 hover:text-white group
        ${variant === 'danger' ? 'hover:text-red-400' : ''}
      `}
    >
      <div className="flex items-center gap-4">
        <div className={`transition-transform group-active:scale-90`}>
          {icon}
        </div>
        <span className="text-sm font-medium">{label}</span>
      </div>
      {badge && (
        <span className="bg-tertiary text-black text-[10px] font-black px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </button>
  );
};

export default NavAction;