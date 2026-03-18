import { Outlet } from "react-router-dom";
import Sidebar from "@organisms/Sidebar";

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-[#f4f7ff] overflow-hidden"> 
      <Sidebar />
      <main className="grow flex flex-col min-w-0">
        <div className="flex-1 p-4 md:p-8 overflow-hidden">
          <div className="max-w-7xl mx-auto h-full">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;