interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: number;
}

const NavItem = ({ icon, label, active = false, badge }: NavItemProps) => (
  <div className={`
    flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all
    ${active ? 'bg-white text-[#3b59f6] shadow-lg' : 'hover:bg-white/10 text-white/80'}
  `}>
    <div className="flex items-center gap-4">
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </div>
    {badge && (
      <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
        {badge}
      </span>
    )}
  </div>
);

export default NavItem