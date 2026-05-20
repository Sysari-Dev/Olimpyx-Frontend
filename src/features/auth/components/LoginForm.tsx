import { useState, type FormEvent } from "react";
import { Eye, EyeOff, Mail, Lock, ChevronRight, AlertCircle, Loader2 } from "lucide-react";
import { type LoginRequestDTO } from "../models/auth-api.model";

interface LoginFormProps {
  error?: string | null;
  onSubmit: (data: LoginRequestDTO) => void;
  isLoading?: boolean;
}

export const LoginForm = ({ error, onSubmit, isLoading }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <div className="w-full space-y-12">
      <div className="space-y-3 text-center lg:text-left">
        <h1 className="text-2xl font-bold text-light tracking-tight">Iniciar Sesión</h1>
        <p className="text-[9px] font-medium text-gray uppercase tracking-[0.3em] opacity-40">Panel administrativo</p>
      </div>
      <form className="space-y-6" onSubmit={handleFormSubmit}>
        <div className="space-y-5">
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 animate-in fade-in duration-300">
              <AlertCircle size={14} />
              <p className="text-[10px] font-bold uppercase tracking-wider">{error}</p>
            </div>
          )}
          <div className="space-y-2 text-left">
            <label className="text-sm font-black text-light ml-1">Correo</label>
            <div className="relative group mt-2">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray/20 group-focus-within:text-secondary transition-colors" size={16} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@sysari.com" 
                disabled={isLoading}
                required
                className="w-full bg-[#292929] p-4 pl-12 rounded-lg outline-none border border-[#292929] focus:border-secondary transition-all text-sm text-light placeholder:text-gray/40 disabled:opacity-50" 
              />
            </div>
          </div>
          <div className="space-y-2 text-left">
            <label className="text-sm font-black text-light ml-1">Contraseña</label>
            <div className="relative group mt-2">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray/20 group-focus-within:text-secondary transition-colors" size={16} />
              <input 
                type={showPassword ? "text" : "password"} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••" 
                disabled={isLoading}
                required
                className="w-full bg-[#292929] p-4 pl-12 pr-12 rounded-lg outline-none border border-[#292929] focus:border-secondary transition-all text-sm text-light placeholder:text-gray/40 disabled:opacity-50" 
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)} 
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray/20 hover:text-light transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
        </div>
        <button 
          type="submit" 
          disabled={isLoading || !email || !password}
          className="w-full bg-white text-black h-14 rounded-lg font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-white/5 hover:bg-gray-200 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <>Ingresar <ChevronRight size={16} /></>
          )}
        </button>
      </form>
    </div>
  );
};