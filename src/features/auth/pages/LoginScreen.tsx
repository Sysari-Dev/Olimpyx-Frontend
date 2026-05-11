import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, ChevronRight, User } from "lucide-react";

const LoginScreen = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen w-full flex bg-background font-sans overflow-hidden">
      <div className="hidden lg:flex lg:flex-1 relative items-center justify-center border-r border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#3D5BF1_0%,#3D5BF1_35%,#0D0D0D_65%)] opacity-30" />
        <div className="relative z-10 px-16 w-full max-w-xl flex flex-col items-center mt-42">
          <div className="flex flex-col gap-12">
            <div className="flex items-center justify-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary shadow-2xl shadow-primary" />
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/90">Olimpyx</h2>
            </div>
            <div className="space-y-6">
              <h3 className="text-4xl font-bold text-light tracking-tighter leading-tight text-center">Bienvenido al centro de <br /> gestión deportiva.</h3>
              <p className="text-xs font-medium text-gray leading-relaxed tracking-wide max-w-sm opacity-80 text-center">Ingresa a nuestra plataforma para gestionar tus eventos deportivos y que tus usuarios vean resultados en tiempo real. La precisión técnica al servicio del deporte.</p>
            </div>
            <div className="pt-4">
              <p className="text-[10px] font-bold text-gray/50 uppercase tracking-widest text-center">¿No tienes una cuenta? <Link to="/contact" className="text-secondary transition-colors underline underline-offset-4 decoration-secondary/30">Contacta con nosotros</Link></p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-16 bg-background relative overflow-y-auto">
        <div className="absolute inset-0 lg:hidden bg-[radial-gradient(circle_at_top_right,#3D5BF1_0%,#0D0D0D_40%)] opacity-10 pointer-events-none" />
        <div className="w-full max-w-85 space-y-12 z-10">
          <div className="space-y-3 text-center lg:text-left">
            <User size={28} className="text-light mx-auto lg:mx-0" />
            <h1 className="text-2xl font-bold text-light tracking-tight">Iniciar Sesión</h1>
            <p className="text-[9px] font-medium text-gray uppercase tracking-[0.3em] opacity-40">Panel administrativo</p>
          </div>
          <form className="space-y-6">
            <div className="space-y-5">
              <div className="space-y-2 text-left">
                <label className="text-sm font-black text-light ml-1">Correo</label>
                <div className="relative group mt-2">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray/20 group-focus-within:text-secondary transition-colors" size={16} />
                  <input type="email" placeholder="admin@sysari.com" className="w-full bg-[#292929] p-4 pl-12 rounded-lg outline-none border border-[#292929] focus:border-secondary transition-all text-sm text-light placeholder:text-gray/40" />
                </div>
              </div>
              <div className="space-y-2 text-left">
                <label className="text-sm font-black text-light ml-1">Contraseña</label>
                <div className="relative group mt-2">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray/20 group-focus-within:text-secondary transition-colors" size={16} />
                  <input type={showPassword ? "text" : "password"} placeholder="••••••••••••" className="w-full bg-[#292929] p-4 pl-12 pr-12 rounded-lg outline-none border border-[#292929] focus:border-secondary transition-all text-sm text-light placeholder:text-gray/40" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray/20 hover:text-light transition-colors cursor-pointer">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>
            <button type="submit" className="w-full bg-white text-black h-14 rounded-lg font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-white/5 hover:bg-gray-200 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2 mt-4">
              Ingresar <ChevronRight size={16} />
            </button>
          </form>
          <footer className="pt-10 text-center">
            <p className="text-[10px] font-medium text-gray/30 uppercase tracking-widest">Un producto desarrollado por <a href="https://sysari.net" target="_blank" rel="noopener noreferrer" className="text-gray/50 hover:text-primary transition-colors font-black border-b border-transparent hover:border-primary/30">Sysari</a></p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;