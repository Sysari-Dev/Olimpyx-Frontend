import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail, ArrowLeft } from "lucide-react";

const LoginScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate("/admin");
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-linear-to-br from-primary via-light to-secondary relative overflow-hidden font-sans p-4">
      <header className="absolute top-0 left-0 w-full p-6 md:p-10 flex items-center z-20">
        <Link
          to="/"
          className="flex items-center gap-2 text-dark/60 hover:text-accent transition-all group font-bold text-sm bg-white/70 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-sm"
        >
          <ArrowLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Inicio
        </Link>
      </header>
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-tertiary/30 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-80 h-80 bg-white/20 rounded-full blur-[80px]" />
      <div className="bg-white w-full max-w-112.5 p-8 md:p-12 rounded-2xl shadow-2xl shadow-dark-black/10 relative z-10 border border-light/50">
        <div className="flex flex-col items-center mb-10">
          <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center shadow-lg shadow-accent/20 mb-6"></div>
          <h1 className="text-3xl font-black text-dark tracking-tighter">
            ¡Bienvenido!
          </h1>
          <p className="text-dark/40 font-medium text-sm mt-2 text-center">
            Ingresa tus credenciales para acceder a{" "}
            <span className="font-bold text-dark/60">OLIMPYX</span>
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-[11px] font-black text-dark/50 uppercase tracking-[0.15em] ml-1">
              Email
            </label>
            <div className="relative group">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/30 group-focus-within:text-accent transition-colors"
                size={18}
              />
              <input
                type="email"
                placeholder="admin@sysari.net"
                className="w-full bg-light/10 border border-light p-4 pl-12 rounded-2xl outline-hidden focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/5 transition-all text-sm font-medium text-dark"
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-[11px] font-black text-dark/50 uppercase tracking-[0.15em]">
                Password
              </label>
              <button
                type="button"
                className="text-[11px] font-bold text-accent hover:underline cursor-pointer"
              >
                ¿La olvidaste?
              </button>
            </div>
            <div className="relative group">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/30 group-focus-within:text-accent transition-colors"
                size={18}
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="w-full bg-light/10 border border-light p-4 pl-12 pr-12 rounded-2xl outline-hidden focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/5 transition-all text-sm font-medium text-dark"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-dark/30 hover:text-dark/60 transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-accent text-white p-4 rounded-2xl font-bold text-sm shadow-xl shadow-accent/20 cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:bg-primary"
          >
            Iniciar Sesión
          </button>
        </form>
        <div className="mt-10 text-center">
          <p className="text-xs font-medium text-dark/40">
            ¿No tienes una cuenta? <br />
            <Link
              to="/"
              className="text-accent font-black hover:underline inline-block mt-1"
            >
              Contáctanos en SYSARI
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
