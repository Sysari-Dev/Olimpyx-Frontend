import { useState, useMemo } from "react";
import { useLiveMatches } from "../hooks/useLiveMatches";
import { LiveMatchesSection } from "../components/LiveMatchesSection";
import { LoadingState } from "@atoms/LoadingState";
import { ShieldAlert, Trophy } from "lucide-react";
import { SelectCustomLight } from "@atoms/SelectCustomLight";

export const MatchLivePage = () => {
  const { matches, isLoading } = useLiveMatches();
  const [selectedSportId, setSelectedSportId] = useState<string>("");

  const dropdownOptions = useMemo(() => {
    if (!matches) return [{ id: "", name: "Todos los deportes" }];
    
    const uniqueSports = new Map<string, string>();
    matches.forEach((m) => {
      if (m.tournament.sport) {
        uniqueSports.set(m.tournament.sport.id, m.tournament.sport.name);
      }
    });

    return [
      { id: "", name: "Todos los deportes" },
      ...Array.from(uniqueSports.entries()).map(([id, name]) => ({ id, name }))
    ];
  }, [matches]);

  const filteredMatches = useMemo(() => {
    if (!matches) return [];
    if (!selectedSportId) return matches;
    return matches.filter((m) => m.tournament.sport.id === selectedSportId);
  }, [selectedSportId, matches]);

  if (isLoading) {
    return <LoadingState variant="tertiary" text="Sincronizando señales en vivo..." />;
  }

  return (
    <div className="w-full min-h-screen bg-[#FBFBFB] text-dark font-sans antialiased pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 space-y-8">
        <header className="bg-tertiary border border-dark/10 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5 flex-1 min-w-0">
            <div className="flex items-center gap-2 select-none">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary" />
              </span>
              <span className="text-[10px] font-black uppercase text-secondary tracking-widest">
                Monitoreo en Tiempo Real
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tighter text-light mt-10">
              Tablero de Control en Vivo
            </h1>
            <p className="text-xs text-light font-medium max-w-xl leading-relaxed">
              Resultados instantáneos de los encuentros en disputa, actualizados al segundo por los comisarios de la mesa de control oficial.
            </p>
          </div>

          <div className="shrink-0 w-full md:w-auto">
            <SelectCustomLight
              options={dropdownOptions}
              selectedId={selectedSportId}
              onSelect={(id) => setSelectedSportId(id)}
              label="Filtrar disciplina"
              placeholder="Todos los deportes"
              icon={Trophy}
            />
          </div>
        </header>

        <main>
          {filteredMatches.length > 0 ? (
            <div className="animate-in fade-in duration-500">
              <LiveMatchesSection matches={filteredMatches} />
            </div>
          ) : (
            <div className="py-24 flex flex-col items-center justify-center bg-white rounded-2xl border border-dark/10 max-w-xl mx-auto px-6 text-center shadow-xs animate-in fade-in duration-300">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 mb-4">
                <ShieldAlert size={22} />
              </div>
              <h3 className="text-sm font-black uppercase tracking-wider text-dark mb-1">
                No hay partidos en vivo en este momento
              </h3>
              <p className="text-xs text-dark/40 font-medium leading-relaxed">
                {matches && matches.length > 0 
                  ? "No se registran encuentros oficiales en disputa para el deporte seleccionado en este instante."
                  : "No hay partidos activos en ninguna de las disciplinas deportivas de la plataforma actualmente."}
              </p>
            </div>
          )}
        </main>
        
      </div>
    </div>
  );
};

export default MatchLivePage;