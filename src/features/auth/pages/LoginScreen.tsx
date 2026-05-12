import { Link } from "react-router-dom";
import { User } from "lucide-react";
import { LoginForm } from "../components/LoginForm";
import { useAuth } from "../hooks/useAuth";

const LoginScreen = () => {
  const { login, isLoading, error } = useAuth();

  return (
    <div className="min-h-screen w-full flex bg-background font-sans overflow-hidden">
      <div className="hidden lg:flex lg:flex-1 relative items-center justify-center m-2 rounded-lg overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#3D5BF1_0%,#3D5BF1_35%,#0D0D0D_65%)] opacity-30" />
        <div className="relative z-10 px-16 w-full max-w-xl flex flex-col items-center mt-42">
          <div className="flex flex-col gap-12">
            <div className="flex items-center justify-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary shadow-2xl shadow-primary" />
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/90">Olimpyx</h2>
            </div>
            <div className="space-y-6 text-center">
              <h3 className="text-4xl font-bold text-light tracking-tighter leading-tight">Bienvenido al centro de <br /> gestión deportiva.</h3>
              <p className="text-xs font-medium text-gray leading-relaxed tracking-wide max-w-sm opacity-80 mx-auto">Ingresa a nuestra plataforma para gestionar tus eventos deportivos y que tus usuarios vean resultados en tiempo real.</p>
            </div>
            <div className="pt-4 text-center">
              <p className="text-[10px] font-bold text-gray/50 uppercase tracking-widest">¿No tienes una cuenta? <Link to="/contact" className="text-secondary transition-colors underline underline-offset-4 decoration-secondary/30">Contacta con nosotros</Link></p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-16 bg-background relative overflow-y-auto">
        <div className="absolute inset-0 lg:hidden bg-[radial-gradient(circle_at_top_right,#3D5BF1_0%,#0D0D0D_40%)] opacity-10 pointer-events-none" />
        <div className="w-full max-w-85 z-10">
          <div className="mb-8 text-center lg:text-left">
            <User size={28} className="text-light mx-auto lg:mx-0" />
          </div>
          <LoginForm 
            onSubmit={login} 
            isLoading={isLoading} 
            error={error} 
          />
          <footer className="pt-10 text-center">
            <p className="text-[10px] font-medium text-gray/30 uppercase tracking-widest">
              Un producto desarrollado por <a href="https://sysari.net" target="_blank" rel="noopener noreferrer" className="text-gray/50 hover:text-primary transition-colors font-black border-b border-transparent hover:border-primary/30">Sysari</a>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;