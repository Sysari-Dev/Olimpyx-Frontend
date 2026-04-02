import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import Sidebar from "@organisms/Sidebar";

const AdminLayout = () => {
  // Estado para controlar si el menú está abierto en celular
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#f4f7ff] overflow-hidden font-sans relative">
      
      {/* OVERLAY OSCURO PARA MÓVIL */}
      {/* Si el menú está abierto, oscurecemos el fondo. Si haces clic afuera, se cierra. */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-dark/40 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* CONTENEDOR DEL SIDEBAR */}
      {/* En celular: fijo, oculto a la izquierda y con alta prioridad (z-50) */}
      {/* En PC: relativo, siempre visible (md:translate-x-0) */}
      <div className={`
        fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out 
        md:relative md:translate-x-0
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        {/* Le pasamos la función onClose por si quieres cerrar el menú desde dentro del sidebar */}
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* ÁREA DE CONTENIDO PRINCIPAL */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        
        {/* HEADER MÓVIL (Solo se ve en celulares: md:hidden) */}
        <header className="md:hidden bg-white h-16 border-b border-light flex items-center px-4 shrink-0 shadow-sm z-30">
          <button 
            onClick={() => setIsSidebarOpen(true)} 
            className="p-2 -ml-2 text-dark hover:bg-light/50 rounded-lg transition-colors cursor-pointer"
          >
            <Menu size={24} />
          </button>
          <span className="ml-3 font-black italic text-dark tracking-tighter text-lg">OLIMPYX</span>
        </header>

        {/* CONTENIDO DE LAS PANTALLAS */}
        <div className="flex-1 p-4 md:p-8 overflow-y-auto custom-scrollbar">
          <div className="max-w-7xl mx-auto h-full">
            <Outlet />
          </div>
        </div>
        
      </main>
    </div>
  );
};

export default AdminLayout;