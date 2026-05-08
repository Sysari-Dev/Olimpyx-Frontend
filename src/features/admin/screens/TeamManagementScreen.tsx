import { useState, useEffect } from "react";
import { Plus, Shield, Loader2, AlertCircle, X, Save, Edit2 } from "lucide-react"; // <-- Agregamos Edit2
import { isAxiosError } from "axios";
import PageHeader from "../components/PageHeader"; 
import { TeamService } from "src/core/services/team.service";
import { useAuthStore } from "src/core/store/slices/auth.slice"; 

interface Team {
  id: string;
  name: string;
  organizationId: string;
}

const TeamManagementScreen = () => {
  // Estados de la lista
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estados del modal de creación
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTeamName, setNewTeamName] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  // NUEVO: Estados del modal de edición
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);
  const [editTeamName, setEditTeamName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const activeOrg = useAuthStore(state => state.activeOrg);

  const fetchTeams = async () => {
    if (!activeOrg?.id) {
      setTeams([]);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const response = await TeamService.getAll(activeOrg.id);
      
      let teamsArray: Team[] = [];

      if (Array.isArray(response.data)) {
        teamsArray = response.data;
      } else if (Array.isArray(response.data?.data)) {
        teamsArray = response.data.data;
      } else if (Array.isArray(response.data?.data?.data)) {
        teamsArray = response.data.data.data;
      } else if (Array.isArray(response.data?.data?.items)) {
        teamsArray = response.data.data.items;
      }

      setTeams(teamsArray);

    } catch (err) {
      console.error("Error al cargar equipos:", err);
      setError("No se pudieron cargar los equipos.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, [activeOrg]);

  // --- CREAR EQUIPO ---
  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeOrg?.id || !newTeamName.trim()) return;

    try {
      setIsCreating(true);
      setError(null);
      
      await TeamService.create({
        organizationId: activeOrg.id,
        name: newTeamName.trim()
      });

      setIsModalOpen(false);
      setNewTeamName("");
      await fetchTeams(); 

    } catch (err: unknown) {
      console.error("Error al crear equipo:", err);
      handleAxiosError(err, "Error al crear el equipo.");
    } finally {
      setIsCreating(false);
    }
  };

  // --- EDITAR EQUIPO ---
  const openEditModal = (team: Team) => {
    setEditingTeam(team);
    setEditTeamName(team.name);
  };

  const handleUpdateTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTeam || !editTeamName.trim()) return;

    try {
      setIsUpdating(true);
      setError(null);
      
      // Llamamos al PATCH con el ID y el nuevo nombre
      await TeamService.update(editingTeam.id, { name: editTeamName.trim() });

      setEditingTeam(null);
      setEditTeamName("");
      await fetchTeams(); // Recargamos la lista para ver el cambio

    } catch (err: unknown) {
      console.error("Error al actualizar equipo:", err);
      handleAxiosError(err, "Error al actualizar el equipo.");
    } finally {
      setIsUpdating(false);
    }
  };

  // Función reutilizable para errores de Axios
  const handleAxiosError = (err: unknown, defaultMsg: string) => {
    if (isAxiosError(err)) {
      const backendMessage = err.response?.data?.message;
      let errorMessage = defaultMsg;
      if (Array.isArray(backendMessage) && backendMessage.length > 0) {
          errorMessage = backendMessage[0].content || errorMessage;
      } else if (backendMessage && typeof backendMessage === 'object' && backendMessage.content) {
          errorMessage = backendMessage.content;
      } else if (typeof backendMessage === 'string') {
          errorMessage = backendMessage;
      }
      setError(errorMessage);
    }
  };

  return (
    <div className="h-full flex flex-col gap-6 animate-fade-in relative">
      <div className="shrink-0">
        <PageHeader
          title="Gestión de Equipos"
          subtitle={
            activeOrg 
              ? `Equipos registrados en: ${activeOrg.name}` 
              : "Selecciona una organización para administrar sus equipos."
          }
          buttonLabel="Nuevo equipo"
          buttonIcon={<Plus size={20} />}
          onButtonClick={() => activeOrg ? setIsModalOpen(true) : null} 
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl flex items-center gap-3 text-sm font-bold shrink-0">
          <AlertCircle size={18} className="shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {/* ÁREA DE LISTADO */}
      <div className="flex-1 min-h-0 relative overflow-y-auto pr-2 custom-scrollbar">
        {isLoading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-dark/40 bg-light/10 rounded-2xl">
            <Loader2 size={32} className="animate-spin mb-4 text-accent" />
            <p className="font-bold">Cargando equipos...</p>
          </div>
        ) : !activeOrg ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-dark/40 bg-light/10 rounded-2xl border-2 border-dashed border-light">
            <p className="font-bold">Ninguna organización seleccionada</p>
          </div>
        ) : teams.length === 0 ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-dark/40 bg-light/10 rounded-2xl border-2 border-dashed border-light">
            <div className="w-16 h-16 bg-dark/5 rounded-full flex items-center justify-center mb-4">
              <Shield size={32} className="text-dark/20" />
            </div>
            <p className="font-bold text-lg mb-2">No hay equipos registrados</p>
            <p className="text-sm mb-6">Añade los clubes o equipos que participarán en tus torneos.</p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-dark text-white px-6 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-accent transition-colors cursor-pointer"
            >
              <Plus size={18} /> Registrar Equipo
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 pb-10">
            {teams.map((team) => (
              <div key={team.id} className="bg-white border border-light p-5 rounded-2xl hover:border-accent/30 hover:shadow-md transition-all flex items-center gap-4 group">
                <div className="w-12 h-12 bg-light/50 rounded-xl flex items-center justify-center text-dark/40 group-hover:bg-accent/10 group-hover:text-accent transition-colors shrink-0">
                  <Shield size={24} />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-dark text-lg leading-tight truncate">{team.name}</h3>
                  <p className="text-xs text-dark/40 font-medium">ID: {team.id.substring(0,8)}...</p>
                </div>
                {/* BOTÓN DE EDITAR */}
                <button 
                  onClick={() => openEditModal(team)}
                  className="p-2 text-dark/30 hover:text-accent hover:bg-accent/10 rounded-xl transition-colors shrink-0 cursor-pointer"
                  title="Editar equipo"
                >
                  <Edit2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL DE CREACIÓN DE EQUIPO */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-slide-up">
            <div className="flex items-center justify-between p-6 border-b border-light">
              <h3 className="text-xl font-black text-dark tracking-tighter">Registrar Nuevo Equipo</h3>
              <button 
                onClick={() => !isCreating && setIsModalOpen(false)}
                className="p-2 text-dark/40 hover:bg-light hover:text-dark rounded-xl transition-colors disabled:opacity-50"
                disabled={isCreating}
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleCreateTeam} className="p-6">
              <div className="space-y-2 mb-8">
                <label className="text-[11px] font-black text-dark/50 uppercase tracking-[0.15em] ml-1">
                  Nombre del Equipo <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <Shield className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/30 group-focus-within:text-accent transition-colors" size={18} />
                  <input
                    type="text" required autoFocus disabled={isCreating}
                    value={newTeamName} onChange={(e) => setNewTeamName(e.target.value)}
                    placeholder="Ej. Club Los Chankas..."
                    className="w-full bg-light/10 border border-light p-4 pl-12 rounded-2xl outline-none focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/5 transition-all text-sm font-medium text-dark disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button" onClick={() => setIsModalOpen(false)} disabled={isCreating}
                  className="px-6 py-3 rounded-xl font-bold text-sm text-dark/60 hover:bg-light transition-all disabled:opacity-50 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit" disabled={isCreating || !newTeamName.trim()}
                  className="flex items-center gap-2 bg-accent text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-primary transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                >
                  {isCreating ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                  {isCreating ? "Guardando..." : "Registrar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL DE EDICIÓN DE EQUIPO */}
      {editingTeam && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-slide-up">
            <div className="flex items-center justify-between p-6 border-b border-light">
              <h3 className="text-xl font-black text-dark tracking-tighter">Editar Equipo</h3>
              <button 
                onClick={() => !isUpdating && setEditingTeam(null)}
                className="p-2 text-dark/40 hover:bg-light hover:text-dark rounded-xl transition-colors disabled:opacity-50"
                disabled={isUpdating}
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleUpdateTeam} className="p-6">
              <div className="space-y-2 mb-8">
                <label className="text-[11px] font-black text-dark/50 uppercase tracking-[0.15em] ml-1">
                  Nombre del Equipo <span className="text-red-500">*</span>
                </label>
                <div className="relative group">
                  <Edit2 className="absolute left-4 top-1/2 -translate-y-1/2 text-dark/30 group-focus-within:text-accent transition-colors" size={18} />
                  <input
                    type="text" required autoFocus disabled={isUpdating}
                    value={editTeamName} onChange={(e) => setEditTeamName(e.target.value)}
                    placeholder="Ej. Club Los Chankas..."
                    className="w-full bg-light/10 border border-light p-4 pl-12 rounded-2xl outline-none focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/5 transition-all text-sm font-medium text-dark disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button" onClick={() => setEditingTeam(null)} disabled={isUpdating}
                  className="px-6 py-3 rounded-xl font-bold text-sm text-dark/60 hover:bg-light transition-all disabled:opacity-50 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit" disabled={isUpdating || !editTeamName.trim() || editTeamName === editingTeam.name}
                  className="flex items-center gap-2 bg-accent text-white px-8 py-3 rounded-xl font-bold text-sm hover:bg-primary transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                >
                  {isUpdating ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                  {isUpdating ? "Actualizando..." : "Guardar Cambios"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamManagementScreen;