import { NavLink } from 'react-router-dom';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  badge?: number;
  end?: boolean;
}

const NavItem = ({ icon, label, to, badge, end }: NavItemProps) => {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) => `
        flex items-center justify-between px-4 py-3 rounded-xl transition-all
        ${isActive 
          ? 'bg-white text-dark shadow-lg' 
          : 'text-white/80 hover:bg-white/10 hover:text-white'
        }
      `}
    >
      <div className="flex items-center gap-4">
        {icon}
        <span className="text-sm font-medium">{label}</span>
      </div>
      {badge && (
        <span className="bg-tertiary text-black text-[10px] font-bold px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </NavLink>
  );
};

export default NavItem;