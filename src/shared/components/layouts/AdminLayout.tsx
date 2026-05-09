import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import Sidebar from "@organisms/Sidebar";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-background text-light font-sans overflow-hidden relative">
      
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-dark-black/60 backdrop-blur-sm z-[60] md:hidden transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-[70] w-64 transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0 bg-background
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="flex flex-col h-full border-r border-white/5">
          <Sidebar onClose={() => setIsSidebarOpen(false)} />
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 h-screen">
        
        <header className="h-16 bg-background flex items-center justify-between px-6 shrink-0 z-40">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)} 
              className="p-2 text-light hover:bg-white/5 rounded-lg transition-colors cursor-pointer md:hidden"
            >
              <Menu size={22} />
            </button>
            <div className="flex items-center gap-2">
               <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
               <h1 className="text-sm font-bold tracking-tight text-gray uppercase">Panel de control</h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-[11px] font-black text-light leading-none">Luis Chumbes</p>
              <p className="text-[9px] text-primary font-bold uppercase tracking-tighter">Systems Engineer</p>
            </div>
            <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
              <span className="text-[10px] font-black text-primary">LC</span>
            </div>
          </div>
        </header>

        <div className="flex-1 p-2 pb-0 overflow-hidden flex flex-col">
          <main className="flex-1 bg-dark rounded-tl-3xl overflow-y-auto custom-scrollbar relative shadow-2xl shadow-black/50">
            <div className="p-6 md:p-10 max-w-[1400px] mx-auto min-h-full">
              <Outlet />
            </div>
          </main>

          <footer className="h-8 bg-background flex items-center justify-center px-6 shrink-0">
          </footer>
        </div>

      </div>
    </div>
  );
};

export default AdminLayout;