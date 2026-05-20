import { useState, useEffect } from "react";
import { Plus, Shield, Pencil, Power, Search, LayoutGrid, List } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@store/hooks";
import { LoadingState } from "@atoms/LoadingState";
import { Button } from "@atoms/Button";
import { InputText } from "@atoms/InputText";
import { TeamEditModal } from "../components/TeamEditModal";
import { TeamStatusModal } from "../components/TeamStatusModal";
import { useTeam } from "../hooks/useTeam";
import { useSearchTeam } from "../hooks/useSearchTeam";
import { type Team } from "@models/team.model";

const TeamsManagementPage = () => {
  const navigate = useNavigate();
  const { activeOrg } = useAppSelector((state) => state.auth);
  const { teams, isLoading, fetchTeams, updateTeam, toggleStatus } = useTeam();
  
  const { searchQuery, setSearchQuery, filteredTeams } = useSearchTeam(teams);
  
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [modalMode, setModalMode] = useState<"edit" | "status" | null>(null);

  useEffect(() => {
    if (activeOrg?.id) {
      fetchTeams(activeOrg.id);
    }
  }, [activeOrg?.id, fetchTeams]);

  const getAcronym = (name: string) => {
    return name.split(" ").map((w) => w[0]).join("").toUpperCase().substring(0, 3);
  };

  const handleEditClick = (team: Team) => {
    setSelectedTeam(team);
    setModalMode("edit");
  };

  const handleStatusClick = (team: Team) => {
    setSelectedTeam(team);
    setModalMode("status");
  };

  const closeModals = () => {
    setModalMode(null);
    setSelectedTeam(null);
  };

  const onConfirmUpdate = async (data: { name: string }) => {
    if (selectedTeam) await updateTeam(selectedTeam.id, data.name);
  };

  const onConfirmToggleStatus = async () => {
    if (selectedTeam) await toggleStatus(selectedTeam.id, selectedTeam.status);
  };

  if (isLoading && teams.length === 0) {
    return <LoadingState text="Cargando equipos" variant="secondary" />;
  }

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-700">
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-secondary">
            <Shield size={16} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Competición</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-light tracking-tighter">Gestión de Equipos</h2>
          <p className="text-sm text-gray/60">
            {activeOrg ? `Equipos en ${activeOrg.name}` : "Selecciona una organización"}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="hidden md:flex bg-white/5 p-1 rounded-xl border border-white/5">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition-all ${viewMode === "grid" ? "bg-white/10 text-secondary" : "text-gray/40 hover:text-light"}`}
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition-all ${viewMode === "list" ? "bg-white/10 text-secondary" : "text-gray/40 hover:text-light"}`}
            >
              <List size={16} />
            </button>
          </div>
          <Button icon={Plus} showShadow onClick={() => navigate("crear")} className="w-full sm:w-auto">
            Nuevo Equipo
          </Button>
        </div>
      </header>
      {activeOrg && (
        <div className="relative w-full md:max-w-md">
          <InputText
            placeholder="Buscar equipo..."
            icon={Search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={isLoading}
          />
        </div>
      )}
      {!activeOrg ? (
        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-white/5 rounded-3xl bg-white/2">
          <Shield size={48} className="text-gray/10 mb-4" />
          <p className="text-[10px] font-black text-gray/40 uppercase tracking-widest">Sin contexto de organización</p>
        </div>
      ) : (
        <div className="min-h-[40vh]">
          {filteredTeams.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-white/5 rounded-3xl bg-white/2">
              <Shield size={32} className="text-secondary/40 mb-4" />
              <h3 className="text-light font-bold text-center px-4">No se encontraron resultados</h3>
              <Button variant="outline" icon={Plus} onClick={() => navigate("crear")} className="mt-6">
                Registrar Equipo
              </Button>
            </div>
          ) : (
            <div className={`grid gap-4 ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}>
              {filteredTeams.map((team) => (
                <div
                  key={team.id}
                  className={`bg-[#1A1A1A] border p-4 md:p-5 rounded-2xl flex items-center gap-4 shadow-xl shadow-black/20 transition-all ${isLoading ? "opacity-50" : "opacity-100"} ${team.status === "ACTIVE" ? "border-white/5" : "border-red-500/20"}`}
                >
                  <div className={`shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center font-black text-[10px] md:text-xs ${team.status === "ACTIVE" ? "bg-secondary/10 text-secondary" : "bg-red-500/10 text-red-500"}`}>
                    {getAcronym(team.name)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-light font-bold truncate text-sm md:text-base">{team.name}</h4>
                    <p className={`text-[9px] md:text-[10px] font-semibold ${team.status === "ACTIVE" ? "text-emerald-500/60" : "text-red-500/60"}`}>
                      {team.status === "ACTIVE" ? "Activado" : "Desactivado"}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 md:gap-2">
                    {team.status === "ACTIVE" && (
                      <button onClick={() => handleEditClick(team)} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray hover:text-light transition-all">
                        <Pencil size={14} />
                      </button>
                    )}
                    <button onClick={() => handleStatusClick(team)} className={`p-2 rounded-lg transition-all ${team.status === "ACTIVE" ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"}`}>
                      <Power size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      <TeamEditModal key={selectedTeam?.id || 'edit-modal'} isOpen={modalMode === "edit"} onClose={closeModals} team={selectedTeam} onConfirm={onConfirmUpdate} />
      <TeamStatusModal isOpen={modalMode === "status"} onClose={closeModals} team={selectedTeam} onConfirm={onConfirmToggleStatus} />
    </div>
  );
};

export default TeamsManagementPage;