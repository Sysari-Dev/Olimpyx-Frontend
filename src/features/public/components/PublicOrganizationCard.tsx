import { Shield, Trophy, Users } from "lucide-react";
import { type PublicOrganizationDTO } from "../models/public-api.model";

interface Props {
  organization: PublicOrganizationDTO;
}

export const PublicOrganizationCard = ({ organization }: Props) => {
  return (
    <div className="bg-white border border-dark/10 p-6 rounded-2xl flex flex-col justify-between gap-6 shadow-xs hover:shadow-md hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-300">
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
            <Shield size={24} />
          </div>
          <span className="text-[10px] font-black text-dark/40 uppercase tracking-widest">
            Reg: {new Date(organization.createdAt).toLocaleDateString()}
          </span>
        </div>
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-dark tracking-tight line-clamp-1">
            {organization.name}
          </h3>
          <p className="text-xs text-dark/60 font-medium leading-relaxed line-clamp-2 min-h-8">
            {organization.description}
          </p>
        </div>
      </div>
      <div className="pt-4 border-t border-dark/5 flex items-center gap-6">
        <div className="flex items-center gap-1.5">
          <Trophy size={14} className="text-primary" />
          <span className="text-xs font-black text-dark">{organization.totalEvents}</span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-dark/40">Eventos</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Users size={14} className="text-accent" />
          <span className="text-xs font-black text-dark">{organization.totalTeams}</span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-dark/40">Equipos</span>
        </div>
      </div>
    </div>
  );
};