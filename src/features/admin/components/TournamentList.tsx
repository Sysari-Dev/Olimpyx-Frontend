import type { Tournament } from "src/shared/models/tournament.model";
import { Trophy } from "lucide-react";
import TournamentCard from "@molecules/TournamentCard";

interface TournamentListProps {
  tournaments: Tournament[];
  onSelectTournament: (id: string) => void;
}

const TournamentList = ({ tournaments, onSelectTournament }: TournamentListProps) => {
  if (tournaments.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-white/40 border-2 border-dashed border-light rounded-2xl p-10 text-center animate-fade-in">
        <div className="w-20 h-20 bg-light/50 rounded-full flex items-center justify-center mb-4">
          <Trophy size={40} className="text-dark/10" />
        </div>
        <h3 className="text-lg font-black text-dark/40 uppercase">No hay torneos</h3>
        <p className="text-sm text-dark/30 max-w-62.5">
          Aún no se han creado disciplinas para este evento. ¡Empieza creando una!
        </p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto pr-2 custom-scrollbar">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-6">
        {tournaments.map((t) => (
          <TournamentCard key={t.id} tournament={t} onClick={onSelectTournament} />
        ))}
      </div>
    </div>
  );
};

export default TournamentList;