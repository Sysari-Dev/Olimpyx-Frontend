import { useState } from "react";
import { ArrowLeft, Settings, Flag } from "lucide-react";
import { type MatchStatus } from "@models/match.model";
import { MatchMetadataModal } from "./MatchMetadataModal";

interface ScoringHeaderProps {
  matchId: string;
  sportLabel: string;
  status: MatchStatus;
  matchDate: string | null;
  onNavigateBack: () => void;
  onFinalizeTrigger: () => void;
  onMetadataUpdate: (payload: { matchDate: string | null; status: MatchStatus }) => Promise<void>;
}

export const ScoringHeader = ({
  sportLabel,
  status,
  matchDate,
  onNavigateBack,
  onFinalizeTrigger,
  onMetadataUpdate,
}: ScoringHeaderProps) => {
  const [isMetaModalOpen, setIsMetaModalOpen] = useState(false);

  return (
    <>
      <header className="bg-white/5 border-b border-white/10 p-4 md:rounded-2xl flex justify-between items-center shrink-0 gap-4">
        <button
          onClick={onNavigateBack}
          className="flex items-center gap-2 text-white/60 hover:text-white font-bold text-sm px-3 py-2 rounded-xl hover:bg-white/5 transition-all cursor-pointer"
        >
          <ArrowLeft size={18} />
          <span className="hidden sm:inline">Salir</span>
        </button>
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="text-xs font-black uppercase tracking-widest text-gray/40">
            {sportLabel}
          </span>
          <button
            onClick={() => setIsMetaModalOpen(true)}
            className="p-2 rounded-xl border bg-white/5 border-white/10 text-white/60 hover:text-white transition-all cursor-pointer"
          >
            <Settings size={16} />
          </button>
        </div>
        <button
          onClick={onFinalizeTrigger}
          className="flex items-center gap-2 bg-emerald-600 text-white font-black text-xs md:text-sm px-4 py-2.5 rounded-xl hover:bg-emerald-500 shadow-lg shadow-emerald-900/20 active:scale-95 transition-all cursor-pointer"
        >
          <Flag size={16} />
          <span>Finalizar</span>
        </button>
      </header>
      <MatchMetadataModal
        isOpen={isMetaModalOpen}
        onClose={() => setIsMetaModalOpen(false)}
        currentStatus={status}
        currentDate={matchDate}
        onSave={onMetadataUpdate}
      />
    </>
  );
};