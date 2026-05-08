import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail, ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import { isAxiosError } from "axios";

// Importamos el servicio y el estado global (Ajusta las rutas si es necesario)
import { AuthService } from "src/core/services/auth.service";
import { useAuthStore } from "src/core/store/slices/auth.slice";

const LoginScreen = () => {
  const navigate = useNavigate();
  
  // Estados visuales
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Estados del formulario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Traemos la función para guardar los datos en nuestra "Memoria Global"
  const setAuth = useAuthStore((state) => state.setAuth);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Limpiamos errores previos y activamos el loader
    setError(null);
    setIsLoading(true);

    try {
      // 1. Enviamos el paquete al backend
      const response = await AuthService.login(email, password);
      
      // 2. Extraemos la data (NestJS devuelve success, message y data)
      const authData = response.data.data; 

      // 3. Guardamos en el cerebro global usando tu modelo (auth.model.ts)
      setAuth(
        { 
          id: authData.id, 
          username: authData.username, 
          email: authData.email, 
          role: authData.roles, // El backend lo manda como 'roles', el modelo lo pide como 'role'
          status: 'ACTIVE', // Lo ponemos por defecto porque el backend no lo envía en el login
          createdAt: new Date().toISOString() // Lo ponemos por defecto
        },
        authData.accessToken,
        authData.refreshToken
      );

      // 4. ¡Éxito! Redirigimos al panel de administración
      navigate("/admin");

    } catch (err: unknown) {
      console.error("Error en login:", err);
      
      if (isAxiosError(err)) {
        // EXTRAEMOS DE FORMA SEGURA EL MENSAJE
        const backendMessage = err.response?.data?.message;
        
        let errorMessage = "Credenciales incorrectas o error de conexión.";
        
        // Si el backend mandó el mensaje como un objeto con { content: "..." }
        if (backendMessage && typeof backendMessage === 'object' && backendMessage.content) {
            errorMessage = backendMessage.content;
        } 
        // Si el backend lo mandó como un texto simple
        else if (typeof backendMessage === 'string') {
            errorMessage = backendMessage;
        }

        setError(errorMessage);
        
      } else {
        setError("Ocurrió un error inesperado.");
      }
    } finally {
      setIsLoading(false);
    } 
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-linear-to-br from-primary via-light to-secondary relative overflow-hidden font-sans p-4">
      
      {/* HEADER */}
      <header className="absolute top-0 left-0 w-full p-6 md:p-10 flex items-center z-20">
        <Link
          to="/"
          className="flex items-center gap-2 text-dark/60 hover:text-accent transition-all group font-bold text-sm bg-white/70 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-sm"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Inicio
        </Link>
      </header>

      {/* FONDOS ANIMADOS */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-tertiary/30 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-80 h-80 bg-white/20 rounded-full blur-[80px]" />
      
      {/* CAJA PRINCIPAL */}
      <div className="bg-white w-full max-w-112.5 p-8 md:p-12 rounded-2xl shadow-2xl shadow-dark-black/10 relative z-10 border border-light/50">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center shadow-lg shadow-accent/20 mb-6"></div>
          <h1 className="text-3xl font-black text-dark tracking-tighter">
            ¡Bienvenido!
          </h1>
          <p className="text-dark/40 font-medium text-sm mt-2 text-center">
            Ingresa tus credenciales para acceder a <span className="font-bold text-dark/60">OLIMPYX</span>
          </p>
        </div>

        {/* ALERTA DE ERROR */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl flex items-center gap-3 text-sm font-bold animate-fade-in">
            <AlertCircle size={18} className="shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          
          {/* INPUT EMAIL */}
          <div className="space-y-2">
            <label className="text-[11px] font-black text-dark/50 uppercase tracking-[0.15em] ml-1">
              Email
            </label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/30 group-focus-within:text-accent transition-colors" size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@sysari.net"
                required
                disabled={isLoading}
                className="w-full bg-light/10 border border-light p-4 pl-12 rounded-2xl outline-none focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/5 transition-all text-sm font-medium text-dark disabled:opacity-50"
              />
            </div>
          </div>

          {/* INPUT PASSWORD */}
          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-[11px] font-black text-dark/50 uppercase tracking-[0.15em]">
                Password
              </label>
              <button type="button" className="text-[11px] font-bold text-accent hover:underline cursor-pointer">
                ¿La olvidaste?
              </button>
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/30 group-focus-within:text-accent transition-colors" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={isLoading}
                className="w-full bg-light/10 border border-light p-4 pl-12 pr-12 rounded-2xl outline-none focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/5 transition-all text-sm font-medium text-dark disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-dark/30 hover:text-dark/60 transition-colors cursor-pointer disabled:opacity-50"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* BOTÓN SUBMIT */}
          <button
            type="submit"
            disabled={isLoading || !email || !password}
            className="w-full bg-accent text-white p-4 rounded-2xl font-bold text-sm shadow-xl shadow-accent/20 cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] hover:bg-primary disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Iniciando Sesión...
              </>
            ) : (
              "Iniciar Sesión"
            )}
          </button>
        </form>

        {/* FOOTER TEXT */}
        <div className="mt-10 text-center">
          <p className="text-xs font-medium text-dark/40">
            ¿No tienes una cuenta? <br />
            <Link to="/" className="text-accent font-black hover:underline inline-block mt-1">
              Contáctanos en SYSARI
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;