import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trophy, Sparkles } from "lucide-react";
import { Button } from "@atoms/Button";
import { useTournamentForm } from "../hooks/useTournamentForm";
import { useTournament } from "../hooks/useTournament";
import { StepTournamentData } from "../components/StepTournamentData";
import { StepCompetitionSystem } from "../components/StepCompetitionSystem";
import { StepParticipants } from "../components/StepParticipants";
import { StepPreview } from "../components/StepPreview";

const TournamentCreatePage = () => {
  const navigate = useNavigate();
  const { createTournament, isLoading } = useTournament();
  const { currentStep, formData, nextStep, prevStep, updateData, eventId } = useTournamentForm();

  const handleSave = async () => {
    const success = await createTournament(formData);
    if (success) {
      navigate(`/admin/torneos?eventId=${eventId}`);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#1A1A1A] border border-white/5 p-6 rounded-lg shadow-2xl">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-white/5 rounded-lg transition-colors text-gray hover:text-primary cursor-pointer"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-xl font-bold text-light flex items-center gap-2">
              <Trophy size={18} className="text-primary" />
              Asistente de configuración
            </h1>
          </div>
        </div>        
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] font-black text-gray/40 uppercase">Progreso</p>
            <p className="text-xs font-bold text-primary">Paso {currentStep} de 4</p>
          </div>
          <div className="w-12 h-12 rounded-full border-2 border-white/5 flex items-center justify-center relative">
             <span className="text-xs font-black text-light">{Math.round((currentStep / 4) * 100)}%</span>
             <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle 
                  cx="24" cy="24" r="22" fill="transparent" stroke="currentColor" strokeWidth="2"
                  className="text-primary transition-all duration-500"
                  style={{ strokeDasharray: 138, strokeDashoffset: 138 - (138 * currentStep) / 4 }}
                />
             </svg>
          </div>
        </div>
      </header>
      <main className="bg-[#1A1A1A] border border-white/5 rounded-lg overflow-hidden shadow-2xl min-h-125 flex flex-col">
        <div className="h-1 w-full bg-white/5 flex">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className={`flex-1 transition-all duration-700 ${s <= currentStep ? "bg-primary" : "bg-transparent"}`} />
          ))}
        </div>
        <div className="flex-1 p-8 md:p-12">
          {currentStep === 1 && <StepTournamentData data={formData} onUpdate={updateData} />}
          {currentStep === 2 && <StepCompetitionSystem data={formData} onUpdate={updateData} />}
          {currentStep === 3 && <StepParticipants data={formData} onUpdate={updateData} />}
          {currentStep === 4 && <StepPreview data={formData} />}
        </div>
        <footer className="p-6 bg-white/2 border-t border-white/5 flex justify-between items-center">
          <button
            onClick={prevStep}
            disabled={currentStep === 1 || isLoading}
            className="text-xs font-black uppercase tracking-widest text-gray/40 hover:text-light disabled:opacity-0 transition-all cursor-pointer"
          >
            Anterior
          </button>
          <div className="flex gap-4">
            {currentStep < 4 ? (
              <Button onClick={nextStep} icon={Sparkles} showShadow>
                Siguiente Paso
              </Button>
            ) : (
              <Button onClick={handleSave} isLoading={isLoading} showShadow>
                Finalizar y Crear Torneo
              </Button>
            )}
          </div>
        </footer>
      </main>
    </div>
  );
};

export default TournamentCreatePage;