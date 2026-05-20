import React from 'react';
import { InfoItem } from '@atoms/InfoItem';
import { TeamDisplay } from '@molecules/TeamDisplay';
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, MapPin, Activity } from "lucide-react";
import LiveBadge from "@atoms/LiveBadge";

const PARTIDOS_MOCK = [
  { id: "1", event: "Intercodigos Ing Minas", sport: "Vóley Femenino", team1: "Sistemas", team2: "Derecho", score1: 2, score2: 1, currentPeriod: "Set 3" },
  { id: "2", event: "Intercodigos Administración", sport: "Futsal Varones", team1: "Minas", team2: "Contabilidad", score1: 4, score2: 2, currentPeriod: "2do Tiempo" },
  { id: "3", event: "Intercodigos Educación Inicial", sport: "Básquet", team1: "Administración", team2: "Turismo", score1: 56, score2: 54, currentPeriod: "4to Cuarto" },
  { id: "4", event: "Intercarreras UNAMBA", sport: "Vóley Femenino", team1: "Sistemas", team2: "Derecho", score1: 2, score2: 1, currentPeriod: "Set 3" },
  { id: "5", event: "Intercarreras UTEA", sport: "Futsal Varones", team1: "Ciencia Política", team2: "Educación Inicial", score1: 2, score2: 2, currentPeriod: "1er Tiempo" },
  { id: "6", event: "Intercarreras UNAJMA", sport: "Básquet", team1: "Ing Ambiental", team2: "Ing Sistemas", score1: 36, score2: 44, currentPeriod: "4to Cuarto" },
];

const MatchDetailSection = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const match = PARTIDOS_MOCK.find(p => p.id === id);

  if (!match) {
    return (
      <div className="p-20 text-center">
        <h1 className="text-2xl font-bold text-dark">Partido no encontrado</h1>
        <button onClick={() => navigate('/en-vivo')} className="mt-4 text-accent font-bold underline">
          Volver al inicio
        </button>
      </div>
    );
  }

  const getMockDetails = (sport: string) => {
    if (sport.includes("Vóley")) {
      return [
        { id: "d1", label: "Set 1", p1: 25, p2: 18 },
        { id: "d2", label: "Set 2", p1: 22, p2: 25 },
        { id: "d3", label: "Set 3", p1: 15, p2: 10 },
      ];
    }
    if (sport.includes("Futsal")) {
      return [
        { id: "d1", label: "1er Tiempo", p1: 2, p2: 1 },
        { id: "d2", label: "2do Tiempo", p1: match.score1 - 2, p2: match.score2 - 1 },
      ];
    }
    return [{ id: "d1", label: "Puntuación Final", p1: match.score1, p2: match.score2 }];
  };

  const details = getMockDetails(match.sport);

  return (
    <div className="max-w-4xl mx-auto px-6 pt-8">
      <div className="mb-6 flex">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-dark/60 hover:text-accent transition-colors font-bold text-sm">
          <ArrowLeft size={18} /> Volver
        </button>
      </div>
      <div className="bg-dark rounded-3xl p-8 text-white shadow-2xl mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6">
          <LiveBadge />
        </div>
        <div className="text-center mb-8">
          <span className="text-accent text-[10px] font-black uppercase tracking-[0.3em]">{match.event}</span>
          <h2 className="text-white/40 text-xs font-bold uppercase mt-1 italic">{match.sport}</h2>
        </div>
        <div className="flex items-center justify-between gap-4 max-w-2xl mx-auto">
          <TeamDisplay name={match.team1} score={match.score1} />
          <div className="text-white/10 font-black text-4xl italic">VS</div>
          <TeamDisplay name={match.team2} score={match.score2} reverse />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h3 className="text-dark font-black text-lg mb-4 flex items-center gap-2">
            <Activity size={20} className="text-tertiary" /> Desglose por periodos
          </h3>
          <div className="bg-white rounded-2xl border border-light shadow-sm overflow-hidden text-dark">
            <table className="w-full">
              <thead className="bg-light/50 border-b border-light">
                <tr className="text-[10px] font-black text-dark/40 uppercase">
                  <th className="px-6 py-4 text-left">Periodo</th>
                  <th className="px-6 py-4 text-center">{match.team1}</th>
                  <th className="px-6 py-4 text-center">{match.team2}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-light">
                {details.map((d) => (
                  <tr key={d.id}>
                    <td className="px-6 py-4 text-xs font-bold text-dark/60">{d.label}</td>
                    <td className={`px-6 py-4 text-center font-black text-lg ${d.p1 > d.p2 ? 'text-accent' : 'text-dark/20'}`}>{d.p1}</td>
                    <td className={`px-6 py-4 text-center font-black text-lg ${d.p2 > d.p1 ? 'text-accent' : 'text-dark/20'}`}>{d.p2}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-light p-6 h-fit text-dark shadow-sm">
          <h3 className="font-black text-lg mb-4">Información</h3>
          <div className="space-y-4">
             <InfoItem icon={<MapPin size={16}/>} label="Ubicación" value="Coliseo Universitario" />
             <InfoItem icon={<Calendar size={16}/>} label="Fase" value="Etapa Eliminatoria" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchDetailSection;