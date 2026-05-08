import React from 'react';
import { EventDetailSection } from '../components/EventDetailSection';
import type { SportEvent } from 'src/shared/models/event.model';
import type { Tournament } from 'src/shared/models/tournament.model';
import { useParams } from 'react-router-dom';

const EVENTS_MOCK: SportEvent[] = [
  { id: "evt-1", name: "Intercarreras UNAMBA", description: "Olimpiadas generales de la Universidad. Todas las facultades compiten por la copa general.", startDate: "15 Mar", endDate: "30 Mar", status: "ACTIVE" },
  { id: "evt-2", name: "Intercódigos Ing Sistemas 26-1", description: "Campeonato interno de confraternidad.", startDate: "10 Abr", endDate: "15 Abr", status: "PLANNED" }
];

const TOURNAMENTS_MOCK: Tournament[] = [
  { 
    id: "t1", 
    event: EVENTS_MOCK[0],
    sport: { id: "s1", name: "Vóley" },
    name: "Vóley Femenino", 
    format: "Fase de Grupos", 
    teamsCount: 8, 
    pointsPerWin: 3, pointsPerDraw: 1, pointsPerLoss: 0, createdAt: "2026-03-01" 
  },
  { 
    id: "t2", 
    event: EVENTS_MOCK[0], 
    sport: { id: "s2", name: "Futsal" }, 
    name: "Futsal Varones", 
    format: "Eliminación Directa", 
    teamsCount: 16, 
    pointsPerWin: 3, pointsPerDraw: 1, pointsPerLoss: 0, createdAt: "2026-03-01" 
  },
  { 
    id: "t3", 
    event: EVENTS_MOCK[0], 
    sport: { id: "s3", name: "Básquet" }, 
    name: "Básquet Mixto", 
    format: "Todos contra Todos", 
    teamsCount: 6, 
    pointsPerWin: 3, pointsPerDraw: 1, pointsPerLoss: 0, createdAt: "2026-03-01" 
  },
  { 
    id: "t4", 
    event: EVENTS_MOCK[1], 
    sport: { id: "s2", name: "Futsal" }, 
    name: "Futsal Libre", 
    format: "Fase de Grupos", 
    teamsCount: 12, 
    pointsPerWin: 3, pointsPerDraw: 1, pointsPerLoss: 0, createdAt: "2026-03-01" 
  },
];
function EventDetailScreen() {
  const { id } = useParams();
  const currentEvent = EVENTS_MOCK.find(e => e.id === id);
  const currentTournaments = TOURNAMENTS_MOCK.filter(t => t.event?.id === id);
  return (
    <div className="animate-fade-in">
      <EventDetailSection
      event={currentEvent} 
      tournaments={currentTournaments}/>
    </div>
  )
}

export default EventDetailScreen