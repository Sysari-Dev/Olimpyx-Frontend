import { useParams } from "react-router-dom";
import { ArrowLeftIcon } from "lucide-react";
import { useTournamentForm } from "../hooks/useTournamentForm";
import { StepTournamentData } from "../components/StepTournamentData";
import { StepCompetitionSystem } from "../components/StepCompetitionSystem";
import { StepParticipants } from "../components/StepParticipants";
import { StepPreview } from "../components/StepPreview";

export const CreateTournamentPage = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const {
    currentStep,
    formData,
    nextStep,
    prevStep,
    updateData,
    saveTournament,
  } = useTournamentForm();

  const handlePrimaryAction = () => {
    if (currentStep === 4) {
      saveTournament();
    } else {
      nextStep();
    }
  };

  return (
    <div className="mx-auto bg-background rounded-xl overflow-hidden border border-light">
      <header className="p-6 border-b border-light flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-light rounded-full transition-colors text-dark cursor-pointer">
            <ArrowLeftIcon />
          </button>
          <div>
            <h1 className="text-xl font-bold text-dark">
              Asistente de Torneos
            </h1>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest">
              EVENTO ID: {eventId}
            </p>
          </div>
        </div>
        <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-lg text-sm font-bold">
          Paso {currentStep} de 4
        </span>
      </header>

      <div className="flex w-full h-1.5 bg-light">
        {[1, 2, 3, 4].map((step) => (
          <div
            key={step}
            className={`flex-1 transition-all duration-500 ${step <= currentStep ? "bg-primary" : "bg-transparent"}`}
          />
        ))}
      </div>

      <main className="p-8 min-h-100">
        {currentStep === 1 && (
          <StepTournamentData data={formData} onUpdate={updateData} />
        )}
        {currentStep === 2 && (
          <StepCompetitionSystem data={formData} onUpdate={updateData} />
        )}
        {currentStep === 3 && (
          <StepParticipants data={formData} onUpdate={updateData} />
        )}
        {currentStep === 4 && (
          <StepPreview data={formData} />
        )}
      </main>

      <footer className="p-6 bg-light/20 border-t border-light flex justify-between items-center">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className="text-dark font-bold opacity-40 hover:opacity-100 disabled:opacity-20 transition-opacity cursor-pointer disabled:cursor-not-allowed"
        >
          Anterior
        </button>
        <button
          onClick={handlePrimaryAction}
          className="bg-primary text-white px-10 py-3 rounded-xl font-bold shadow-lg shadow-primary/30 hover:bg-accent transition-all active:scale-95 cursor-pointer"
        >
          {currentStep === 4 ? "Guardar Torneo" : "Siguiente"}
        </button>
      </footer>
    </div>
  );
};
