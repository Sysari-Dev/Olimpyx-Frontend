import { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import type { WizardFormData, PreviewTeam, PreviewGroup, GeneratedPreview } from "../components/wizard/wizard.types";
import { Step1BasicData } from "../components/wizard/Step1BasicData";
import { Step2Format } from "../components/wizard/Step2Format";
import { Step3Teams } from "../components/wizard/Step3Teams";
import { Step4Preview } from "../components/wizard/Step4Preview";
const shuffleArray = <T,>(array: T[]): T[] => [...array].sort(() => Math.random() - 0.5);

const AdminCreateTournamentScreen = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const [reshuffleTrigger, setReshuffleTrigger] = useState(0);
  
  const [dbTeams, setDbTeams] = useState<PreviewTeam[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTeamsFromApi = async () => {
      setTimeout(() => {
        setDbTeams([
          { id: "eq-1", name: "Ing. Sistemas" }, { id: "eq-2", name: "Administración" },
          { id: "eq-3", name: "Contabilidad" }, { id: "eq-4", name: "Ing. Civil" },
          { id: "eq-5", name: "Ing. Minas" }, { id: "eq-6", name: "Educación" },
          { id: "eq-7", name: "Derecho" }, { id: "eq-8", name: "Medicina" },
          { id: "eq-9", name: "Enfermería" }, { id: "eq-10", name: "Veterinaria" },
          { id: "eq-11", name: "Odontología" } 
        ]);
        setIsLoading(false);
      }, 1000); 
    };
    fetchTeamsFromApi();
  }, [eventId]);

  const [formData, setFormData] = useState<WizardFormData>({
    name: "", sport: "", format: "",
    isHomeAway: false, groupsCount: 2, advancingPerGroup: 2,
    selectedTeams: []
  });

  const updateFormData = (updates: Partial<WizardFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const handleNext = () => { if (currentStep < totalSteps) setCurrentStep(prev => prev + 1); };
  const handlePrev = () => { if (currentStep > 1) setCurrentStep(prev => prev - 1); };

  const handleSave = async () => {
    console.log("Enviando a NestJS:", { eventId, ...formData });
    navigate(`/admin/evento/${eventId}`); 
  };

  const generatedPreview = useMemo<GeneratedPreview | null>(() => {
    if (currentStep !== 4) return null;

    const selected = dbTeams.filter(t => formData.selectedTeams.includes(t.id));
    const teams = shuffleArray(selected);
    
    if (formData.format === "Fase de Grupos") {
      const groups: PreviewGroup[] = Array.from({ length: formData.groupsCount }, (_, i) => ({
        name: `Grupo ${String.fromCharCode(65 + i)}`, teams: [], fixtures: []
      }));
      teams.forEach((team, index) => { groups[index % formData.groupsCount].teams.push(team); });
      groups.forEach(g => {
        if(g.teams.length >= 2) g.fixtures.push([g.teams[0], g.teams[1]]);
        if(g.teams.length >= 4) g.fixtures.push([g.teams[2], g.teams[3]]);
      });
      return { type: "groups", data: groups };
    } 
    
    if (formData.format === "Liga (Todos vs Todos)") {
      const fixtures: PreviewTeam[][] = [];
      for(let i=0; i < teams.length - 1; i+=2) {
        fixtures.push([teams[i], teams[i+1]]);
      }
      return { type: "league", data: teams, fixtures };
    }

    if (formData.format === "Eliminación Directa") {
      const matches: PreviewTeam[][] = [];
      for (let i = 0; i < teams.length; i += 2) {
        matches.push([teams[i], teams[i + 1] || { id: "bye", name: "Pasa Directo (Bye)" }]);
      }
      return { type: "knockout", data: matches };
    }

    return null;

  }, [currentStep, formData, reshuffleTrigger, dbTeams]); 

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-dark/40 font-black animate-pulse">
          <div className="w-8 h-8 border-4 border-light border-t-accent rounded-full animate-spin"></div>
          Cargando equipos del evento...
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-light/10 rounded-3xl animate-fade-in relative">
      <div className="bg-white px-8 py-6 rounded-t-3xl border-b border-light shrink-0">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="w-10 h-10 bg-light/50 rounded-full flex items-center justify-center hover:text-accent transition-colors">
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-black text-dark tracking-tight">Asistente de Torneos</h1>
              <p className="text-xs font-bold text-dark/40 uppercase tracking-widest mt-1">Evento ID: {eventId}</p>
            </div>
          </div>
          <span className="bg-accent/10 text-accent font-black px-4 py-2 rounded-xl">Paso {currentStep} de {totalSteps}</span>
        </div>
        <div className="flex gap-2">
          {[1, 2, 3, 4].map(step => (
            <div key={step} className={`h-2 rounded-full flex-1 transition-colors duration-500 ${step <= currentStep ? 'bg-accent' : 'bg-light'}`} />
          ))}
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
        <div className="max-w-4xl mx-auto">
          {currentStep === 1 && <Step1BasicData data={formData} updateData={updateFormData} />}
          {currentStep === 2 && <Step2Format data={formData} updateData={updateFormData} />}
          {currentStep === 3 && <Step3Teams data={formData} updateData={updateFormData} availableTeams={dbTeams} />}
          {currentStep === 4 && <Step4Preview data={formData} preview={generatedPreview} onReshuffle={() => setReshuffleTrigger(p => p + 1)} />}
        </div>
      </div>
      <div className="bg-white px-8 py-6 rounded-b-3xl border-t border-light shrink-0 flex justify-between items-center">
        <button 
          onClick={handlePrev} 
          disabled={currentStep === 1} 
          className={`font-bold px-6 py-3 rounded-xl transition-colors ${currentStep === 1 ? 'text-light cursor-not-allowed' : 'text-dark/60 hover:bg-light hover:text-dark'}`}
        >
          Anterior
        </button>

        {currentStep < totalSteps ? (
          <button 
            onClick={handleNext}
            disabled={
              (currentStep === 1 && (!formData.name || !formData.sport)) || 
              (currentStep === 2 && !formData.format) || 
              (currentStep === 3 && formData.selectedTeams.length === 0)
            }
            className="bg-dark text-white font-black px-8 py-3 rounded-xl hover:bg-accent transition-colors disabled:bg-light disabled:text-dark/30"
          >
            Siguiente
          </button>
        ) : (
          <button 
            onClick={handleSave} 
            className="bg-accent text-white font-black px-8 py-3 rounded-xl hover:bg-accent/90 shadow-lg shadow-accent/20 active:scale-95 transition-all"
          >
            Guardar Torneo
          </button>
        )}
      </div>

    </div>
  );
};

export default AdminCreateTournamentScreen;