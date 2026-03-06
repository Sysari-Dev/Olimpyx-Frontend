import { Outlet } from "react-router-dom";
import Sidebar from "@organisms/Sidebar";

const AdminLayout = () => {
  return (
    // Usamos flex-row para que el Sidebar y el Contenido estén uno al lado del otro
    <div className="flex min-h-screen bg-[#f4f7ff]"> 
      
      {/* Lado Izquierdo: Sidebar Fijo */}
      <Sidebar />

      {/* Lado Derecho: Contenido dinámico */}
      <main className="grow p-8 overflow-y-auto">
        {/* Aquí puedes agregar un Header interno pequeño si lo necesitas después */}
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
      
    </div>
  );
};

export default AdminLayout;