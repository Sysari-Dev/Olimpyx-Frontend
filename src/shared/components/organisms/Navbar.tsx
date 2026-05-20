import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Trophy, Activity, Building2, Rocket } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handleLogoClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setTimeout(() => window.location.reload(), 300);
    }
  };

  const navLinks = [
    { label: "En Vivo", to: "/en-vivo", icon: <Activity size={18} /> },
    { label: "Organizaciones", to: "/organizaciones", icon: <Building2 size={18} /> },
    { label: "Explorar", to: "/explorar", icon: <Trophy size={18} /> },
  ];

  return (
    <nav className="bg-white border-b border-light sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link 
            to="/" 
            onClick={handleLogoClick}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center transition-transform group-hover:scale-105"></div>
            <span className="text-dark font-bold text-xl tracking-tighter">
              OLIMPYX
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => `
                  flex items-center gap-2 text-sm font-medium transition-colors
                  ${isActive ? "text-accent" : "text-dark/70 hover:text-accent"}
                `}
              >
                {link.icon}
                {link.label}
              </NavLink>
            ))}
            <NavLink
              to="/login"
              className="bg-accent text-white px-5 py-2 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-primary transition-all shadow-lg shadow-accent/20"
            >
              <Rocket size={16} />
              Crea tu evento
            </NavLink>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-dark p-2"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>
      <div
        className={`
        md:hidden absolute w-full bg-white border-b border-light transition-all duration-300 ease-in-out
        ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"}
      `}
      >
        <div className="px-4 pt-2 pb-6 space-y-2 shadow-xl">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-4 p-3 text-dark font-medium hover:bg-light/50 rounded-xl"
            >
              <span className="text-accent">{link.icon}</span>
              {link.label}
            </NavLink>
          ))}
          <div className="pt-4">
            <NavLink
              to="/login"
              onClick={() => setIsOpen(false)}
              className="w-full bg-accent text-white p-4 rounded-xl font-bold flex items-center justify-center gap-2"
            >
              <Rocket size={18} />
              Crea tu Evento
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;