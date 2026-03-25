import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { AdminEventForm } from "../components/AdminEventForm"; 

const CreateEventScreen = () => {
  const navigate = useNavigate();
  const handleSaveToDatabase = (dataToSave: unknown) => {
    console.log("Enviando a NestJS:", dataToSave);
    navigate("/admin/eventos");
  };

  return (
    <div className="h-full flex flex-col gap-6 animate-fade-in pb-10 overflow-y-auto pr-2 custom-scrollbar">
      
      <div className="shrink-0">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-dark/60 hover:text-accent transition-colors font-bold text-sm"
        >
          <ArrowLeft size={16} /> Volver a Eventos
        </button>
      </div>

      <div className="shrink-0">
        <PageHeader
          title="Crear Nuevo Evento"
          subtitle="Configura los detalles principales del contenedor. Luego podrás agregarle torneos y deportes."
        />
      </div>
      <AdminEventForm 
        onSubmit={handleSaveToDatabase} 
        onCancel={() => navigate(-1)} 
      />
      
    </div>
  );
};

export default CreateEventScreen;