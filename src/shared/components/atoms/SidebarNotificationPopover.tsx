import { useState, useRef, useEffect } from "react";
import { Bell, BellOff, Check } from "lucide-react";

interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
}

interface Props {
  onCloseSidebar?: () => void;
}

export const SidebarNotificationPopover = ({ onCloseSidebar }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [notifications] = useState<Notification[]>([]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (onCloseSidebar && !isOpen) {
      // Mantiene consistencia si hay lógica móvil externa
    }
  };

  return (
    <div className="relative w-full" ref={popoverRef}>
      <button
        type="button"
        onClick={handleToggle}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all group cursor-pointer
          ${
            isOpen
              ? "bg-primary text-light shadow-lg shadow-primary/20 font-bold"
              : "text-gray hover:bg-white/5 hover:text-light"
          }`}
      >
        <Bell
          size={20}
          className={`${isOpen ? "text-light" : "group-hover:text-light transition-colors"}`}
        />
        <span className="text-sm tracking-wide">Notificaciones</span>
      </button>
      {isOpen && (
        <div className="absolute left-full bottom-0 ml-3 w-80 bg-[#1A1A1A] border border-white/10 rounded-xl shadow-2xl p-4 flex flex-col gap-4 z-100 animate-in fade-in slide-in-from-left-2">
          <header className="flex items-center justify-between border-b border-white/5 pb-2">
            <h4 className="text-xs font-black uppercase text-light tracking-widest">
              Notificaciones
            </h4>
            <span className="text-[9px] font-black uppercase tracking-wider text-gray/40 bg-white/5 px-2 py-0.5 rounded">
              {notifications.length} Nuevas
            </span>
          </header>
          <main className="max-h-64 overflow-y-auto custom-scrollbar flex flex-col justify-center min-h-30">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center gap-2 py-4">
                <BellOff size={24} className="text-gray/20 animate-bounce" />
                <p className="text-[10px] text-gray/40 font-black uppercase tracking-widest">
                  Sin notificaciones
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className="p-3 bg-white/1 border border-white/5 rounded-lg space-y-1"
                  >
                    <p className="text-xs font-bold text-light">{n.title}</p>
                    <p className="text-[11px] text-gray leading-tight">
                      {n.message}
                    </p>
                    <p className="text-[9px] text-gray/30 font-medium text-right">
                      {n.date}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </main>
          <footer className="border-t border-white/5 pt-2">
            <button
              type="button"
              disabled={notifications.length === 0}
              onClick={() => setIsOpen(false)}
              className="w-full h-10 px-4 rounded-lg border border-white/5 text-gray font-black text-[10px] uppercase tracking-widest hover:bg-white/5 transition-all flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent cursor-pointer"
            >
              <Check size={12} />
              <span>Marcar todo como leído</span>
            </button>
          </footer>
        </div>
      )}
    </div>
  );
};
