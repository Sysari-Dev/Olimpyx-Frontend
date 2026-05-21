import { Shield, Trophy, Users } from "lucide-react";
import { type PublicOrganizationDTO } from "../models/public-api.model";

interface Props {
  organization: PublicOrganizationDTO;
}

export const PublicOrganizationCard = ({ organization }: Props) => {
  return (
    <div className="bg-white border border-dark/10 p-6 rounded-2xl flex flex-col justify-between h-auto hover:shadow-md hover:border-primary/40 transition-all duration-300 text-dark group">
      <div className="space-y-4">
        <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0 shadow-2xs">
          <Shield size={22} />
        </div>
        
        <div className="space-y-1.5">
          <h3 className="text-lg font-black tracking-tight leading-tight line-clamp-3 group-hover:text-primary transition-colors">
            {organization.name}
          </h3>
          <p className="text-xs text-dark/50 font-medium leading-relaxed line-clamp-2">
            {organization.description || "Sin descripción detallada disponible para esta organización."}
          </p>
        </div>
      </div>

      <div className="pt-4 mt-6 border-t border-dark/5 flex items-center gap-6 select-none">
        <div className="flex items-center gap-1.5">
          <Trophy size={14} className="text-primary" />
          <span className="text-xs font-black">{organization.totalEvents}</span>
          <span className="text-[10px] font-black uppercase tracking-wider text-dark/40">Eventos</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Users size={14} className="text-accent" />
          <span className="text-xs font-black">{organization.totalTeams}</span>
          <span className="text-[10px] font-black uppercase tracking-wider text-dark/40">Equipos</span>
        </div>
      </div>
    </div>
  );
};

export default PublicOrganizationCard;