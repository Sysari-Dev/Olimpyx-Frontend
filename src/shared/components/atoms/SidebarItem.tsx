import type { LucideIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface SidebarItemProps {
  to: string;
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
  onClose?: () => void;
}

export const SidebarItem = ({ to, icon: Icon, label, isActive, onClose }: SidebarItemProps) => {
  const location = useLocation();
  const finalIsActive = isActive ?? location.pathname === to;

  return (
    <Link
      to={to}
      onClick={onClose}
      className={`
        flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group cursor-pointer
        ${finalIsActive 
          ? "bg-primary text-light shadow-lg shadow-primary/20 font-bold" 
          : "text-gray hover:bg-white/5 hover:text-light"
        }
      `}
    >
      <Icon size={20} className={`${finalIsActive ? "text-light" : "group-hover:text-light transition-colors"}`} />
      <span className="text-sm tracking-wide">{label}</span>
    </Link>
  );
};