import { Outlet } from "react-router-dom";
import Navbar from "@organisms/Navbar";
import Footer from "@organisms/Footer";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AuthLayout;
