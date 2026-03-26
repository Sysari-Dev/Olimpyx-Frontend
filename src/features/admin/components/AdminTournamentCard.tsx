import { Edit2, Trash2, ArrowRight, Activity, Swords } from "lucide-react";

interface AdminTournamentCardProps {
  id: string;
  name: string;
  sport: string;
  format: string;
  status: string;
  onClick: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const statusStyles: Record<string, string> = {
  ACTIVE: "text-tertiary bg-tertiary/10",
  PLANNED: "text-accent bg-accent/10",
  FINISHED: "text-dark/40 bg-dark/5",
};

const statusLabels: Record<string, string> = {
  ACTIVE: "En Curso",
  PLANNED: "Planificado",
  FINISHED: "Finalizado",
};

export const AdminTournamentCard = ({ id, name, sport, format, status, onClick, onEdit, onDelete }: AdminTournamentCardProps) => {
  // Un pequeño detalle visual: icono diferente según el deporte
  const isVoley = sport.toLowerCase().includes("vóley");

  return (
    <div 
      onClick={() => onClick(id)}
      className="bg-white border border-light p-5 rounded-3xl shadow-sm hover:shadow-xl hover:border-accent/30 transition-all duration-300 cursor-pointer group flex flex-col justify-between"
    >
      {/* Cabecera de la Tarjeta */}
      <div className="flex justify-between items-start mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isVoley ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent'} group-hover:scale-110 transition-transform`}>
          {isVoley ? <Activity size={20} /> : <Swords size={20} />}
        </div>
        <span className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${statusStyles[status] || statusStyles.PLANNED}`}>
          {statusLabels[status] || "Desconocido"}
        </span>
      </div>

      {/* Info Principal */}
      <div className="mb-6 mt-2">
        <p className="text-[10px] font-black uppercase tracking-widest text-dark/40 mb-1">{sport}</p>
        <h4 className="text-lg font-black text-dark leading-tight group-hover:text-accent transition-colors flex items-center gap-2">
          {name}
          <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
        </h4>
        <p className="text-xs font-bold text-dark/50 mt-1 uppercase tracking-tighter">Formato: {format}</p>
      </div>

      {/* Botones de Gestión (Ocultos hasta hacer hover o siempre visibles, tú decides. Los dejaremos visibles por ahora) */}
      <div className="pt-4 border-t border-light/50 flex justify-end gap-2">
        <button 
          onClick={(e) => { e.stopPropagation(); onEdit(id); }}
          className="w-8 h-8 rounded-lg bg-light/50 text-dark/60 flex items-center justify-center hover:bg-accent hover:text-white transition-colors"
          title="Editar torneo"
        >
          <Edit2 size={14} strokeWidth={2.5} />
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); onDelete(id); }}
          className="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
          title="Eliminar torneo"
        >
          <Trash2 size={14} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};