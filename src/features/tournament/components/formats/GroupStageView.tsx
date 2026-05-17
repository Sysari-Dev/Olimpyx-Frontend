import { LeagueTable } from "./LeagueTable"; 

export const GroupStageView = ({ tournamentId }: { tournamentId: string }) => {
  const groups = ["Grupo A", "Grupo B", "Grupo C"];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
      {groups.map((groupName, index) => (
        <div key={index} className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-black">
              {groupName.split(" ")[1]}
            </div>
            <h4 className="text-lg font-black text-light tracking-tight">{groupName}</h4>
          </div>
          <LeagueTable tournamentId={`${tournamentId}-${index}`} />
        </div>
      ))}
    </div>
  );
};