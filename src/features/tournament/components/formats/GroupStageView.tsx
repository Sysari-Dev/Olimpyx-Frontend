import { useMemo, useState, useEffect } from "react";
import { type Match } from "@models/match.model";
import { type GroupDTO, type GroupLeaderboardEntryDTO } from "@features/match/models/competition-api.model";
import { LeagueTable } from "./LeagueTable";
import { MoveHorizontal } from "lucide-react";

interface GroupStageViewProps {
  tournamentId: string;
  matches: Match[];
  groups?: GroupDTO[];            
  onGroupSwap?: (payload: { teamAId: string; groupAId: string; teamBId: string; groupBId: string }) => void;
}

interface FormattedLeaderboardEntry {
  teamName: string;
  played: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
}

interface GroupData {
  id: string;
  name: string;
  teams: { id: string; name: string }[];
  formattedLeaderboard?: FormattedLeaderboardEntry[]; 
}

export const GroupStageView = ({ tournamentId, matches, groups, onGroupSwap }: GroupStageViewProps) => {
  
  const computedGroups = useMemo<GroupData[]>(() => {
    if (groups && groups.length > 0) {
      return groups.map((g) => {
        const getTeamName = (entry: GroupLeaderboardEntryDTO) => 
          entry.teamName || entry.team?.name || "Equipo Desconocido";

        return {
          id: g.id,
          name: g.name,
          teams: g.leaderboard.map((entry: GroupLeaderboardEntryDTO) => ({
            id: entry.teamId,
            name: getTeamName(entry), 
          })),
          formattedLeaderboard: g.leaderboard.map((entry: GroupLeaderboardEntryDTO) => ({
            teamName: getTeamName(entry),
            played: entry.played,
            wins: entry.wins,
            draws: entry.draws,
            losses: entry.losses,
            goalsFor: entry.goalsFor,
            goalsAgainst: entry.goalsAgainst,
            points: entry.points,
          }))
        };
      });
    }

    if (matches.length === 0) return [];

    const groupsMap: { [groupId: string]: { name: string; teamMap: Map<string, string> } } = {};

    matches.forEach((match) => {
      const groupId = match.group?.id || "default-group";
      const groupName = match.roundName?.includes("Grupo")
        ? match.roundName.split("-")[0].trim()
        : `Grupo ${groupId.substring(0, 4).toUpperCase()}`;

      if (!groupsMap[groupId]) {
        groupsMap[groupId] = { name: groupName, teamMap: new Map<string, string>() };
      }

      if (match.team1?.id && match.team1?.name && match.team1.id !== "bye") {
        groupsMap[groupId].teamMap.set(match.team1.id, match.team1.name);
      }
      if (match.team2?.id && match.team2?.name && match.team2.id !== "bye") {
        groupsMap[groupId].teamMap.set(match.team2.id, match.team2.name);
      }
    });

    return Object.keys(groupsMap).map((groupId) => ({
      id: groupId,
      name: groupsMap[groupId].name,
      teams: Array.from(groupsMap[groupId].teamMap.entries()).map(([id, name]) => ({ id, name })),
      formattedLeaderboard: undefined 
    }));
  }, [matches, groups]);

  const [bracketGroups, setBracketGroups] = useState<GroupData[]>([]);

  useEffect(() => {
    setBracketGroups(computedGroups);
  }, [computedGroups]);

  const handleDragStart = (e: React.DragEvent, sourceGroupId: string, teamId: string, teamName: string) => {
    e.dataTransfer.setData("application/json", JSON.stringify({ sourceGroupId, teamId, teamName }));
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDropOnTeam = (
    e: React.DragEvent,
    targetGroupId: string,
    targetTeamId: string,
    targetTeamName: string
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const origin = JSON.parse(e.dataTransfer.getData("application/json")) as {
      sourceGroupId: string;
      teamId: string;
      teamName: string;
    };

    if (origin.sourceGroupId === targetGroupId || origin.teamId === targetTeamId) return;

    const updatedGroups = JSON.parse(JSON.stringify(bracketGroups)) as GroupData[];
    const sourceGroup = updatedGroups.find((g) => g.id === origin.sourceGroupId);
    const targetGroup = updatedGroups.find((g) => g.id === targetGroupId);

    if (!sourceGroup || !targetGroup) return;

    sourceGroup.teams = sourceGroup.teams.map((t) =>
      t.id === origin.teamId ? { id: targetTeamId, name: targetTeamName } : t
    );
    targetGroup.teams = targetGroup.teams.map((t) =>
      t.id === targetTeamId ? { id: origin.teamId, name: origin.teamName } : t
    );

    setBracketGroups(updatedGroups);

    if (onGroupSwap) {
      onGroupSwap({
        teamAId: origin.teamId,
        groupAId: origin.sourceGroupId,
        teamBId: targetTeamId,
        groupBId: targetGroupId,
      });
    }
  };

  if (groups?.length === 0 && matches.length === 0) {
    return (
      <div className="py-16 px-4 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-xl bg-white/1 text-center">
        <p className="text-gray/40 text-sm font-medium max-w-sm leading-relaxed">
          Los grupos de la competición aún no han sido generados. Haz clic en{" "}
          <strong>Realizar Sorteo</strong> para distribuir los clubes y armar el fixture.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-8 animate-in fade-in duration-500">
      {bracketGroups.map((group) => (
        <div key={group.id} className="space-y-4 p-4 sm:p-5 rounded-2xl bg-[#141414] border border-white/5 shadow-xl flex flex-col min-w-0">
          <div className="flex items-center justify-between select-none gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-black text-xs uppercase shrink-0">
                {group.name.replace("Grupo", "").trim() || "G"}
              </div>
              <h4 className="text-base sm:text-lg font-black text-light tracking-tight truncate">{group.name}</h4>
            </div>
            
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-1 text-gray/30 text-[10px] font-bold uppercase tracking-wider bg-white/5 px-2 py-1 rounded md:hidden">
                <MoveHorizontal size={12} />
                <span>Deslizar puntos</span>
              </div>
              <span className="text-[10px] font-black text-gray/30 uppercase tracking-widest bg-white/2 px-2 py-1 rounded">
                {group.teams.length} Clubes
              </span>
            </div>
          </div>

          <div className="w-full overflow-x-auto custom-scrollbar rounded-xl border border-white/[0.02] touch-pan-x">
            <div className="relative min-w-[700px] w-full">
              <LeagueTable
                tournamentId={`${tournamentId}-${group.id}`}
                teams={group.teams}
                leaderboard={group.formattedLeaderboard} 
              />
              
              {/* Capa de control reducida a la izquierda (Zona de nombres) para liberar el scroll en los números */}
              <div className="absolute inset-y-0 left-0 w-60 pointer-events-none flex flex-col pt-13.25">
                {group.teams.map((team) => (
                  <div
                    key={team.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, group.id, team.id, team.name)}
                    onDragOver={handleDragOver}
                    onDragEnter={handleDragEnter}
                    onDrop={(e) => handleDropOnTeam(e, group.id, team.id, team.name)}
                    style={{ touchAction: "none" }}
                    className="h-13.25 pointer-events-auto cursor-grab active:cursor-grabbing bg-transparent hover:bg-primary/5 rounded border border-transparent hover:border-primary/20 transition-all flex items-center"
                    title="Arrastra desde aquí para intercambiar este equipo de grupo"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};