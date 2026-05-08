import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { isAxiosError } from "axios";
import PageHeader from "../components/PageHeader";
import { AdminEventForm, type EventFormData } from "../components/AdminEventForm"; 
import { EventService } from "src/core/services/event.service";
// 1. Importamos la memoria global
import { useAuthStore } from "src/core/store/slices/auth.slice"; 

const CreateEventScreen = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 2. Traemos la organización activa del Sidebar
  const activeOrg = useAuthStore((state) => state.activeOrg);

  const handleSaveToDatabase = async (formData: EventFormData) => {
    setError(null);
    setIsLoading(true);

    // 3. Validación de seguridad: Nos aseguramos de que haya una organización seleccionada
    if (!activeOrg?.id) {
      setError("Debes seleccionar una organización en el menú lateral antes de crear un evento.");
      setIsLoading(false);
      return;
    }

    try {
      const payload = {
        organizationId: activeOrg.id, // <-- ¡Ahora es 100% dinámico!
        name: formData.name,
        description: formData.description || undefined,
        location: formData.location || undefined,
        start_date: new Date(formData.startDate).toISOString(), 
        end_date: new Date(formData.endDate).toISOString()
      };

      console.log("Enviando a NestJS:", payload);

      await EventService.create(payload);

      // Éxito, redirigimos
      navigate("/admin/eventos");
      
    } catch (err: unknown) {
      console.error("Error al crear evento:", err);
      
      if (isAxiosError(err)) {
        const backendMessage = err.response?.data?.message;
        let errorMessage = "Error al crear el evento.";
        
        if (Array.isArray(backendMessage) && backendMessage.length > 0) {
            errorMessage = backendMessage[0].content || errorMessage;
        } else if (backendMessage && typeof backendMessage === 'object' && backendMessage.content) {
            errorMessage = backendMessage.content;
        } else if (typeof backendMessage === 'string') {
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
    <div className="h-full flex flex-col gap-6 animate-fade-in pb-10 overflow-y-auto pr-2 custom-scrollbar">
      
      <div className="shrink-0">
        <button 
          onClick={() => navigate(-1)} 
          disabled={isLoading}
          className="flex items-center gap-2 text-dark/60 hover:text-accent transition-colors font-bold text-sm disabled:opacity-50 cursor-pointer"
        >
          <ArrowLeft size={16} /> Volver a Eventos
        </button>
      </div>

      <div className="shrink-0">
        <PageHeader
          title="Crear Nuevo Evento"
          subtitle={
            activeOrg 
              ? `Creando evento para: ${activeOrg.name}` 
              : "Selecciona una organización en el menú lateral para continuar."
          }
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl flex items-center gap-3 text-sm font-bold animate-fade-in">
          <AlertCircle size={18} className="shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {/* Si no hay org activa, podemos deshabilitar el formulario o mostrar un mensaje claro */}
      {activeOrg ? (
        <AdminEventForm 
          onSubmit={handleSaveToDatabase} 
          onCancel={() => navigate(-1)} 
          isLoading={isLoading}
        />
      ) : (
        <div className="bg-light/50 border border-light rounded-2xl p-8 text-center">
          <p className="text-dark/60 font-medium">Por favor, selecciona una organización en el menú lateral para poder crear un evento.</p>
        </div>
      )}
      
    </div>
  );
};

export default CreateEventScreen;