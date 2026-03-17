import { Outlet } from "react-router-dom";
import Sidebar from "@organisms/Sidebar";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-[#f4f7ff]"> 
      <Sidebar />
      <main className="grow p-8 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
      
    </div>
  );
};

export default AdminLayout;