import { useState, useMemo } from "react";
import { type Team } from "@models/team.model";

export const useSearchTeam = (teams: Team[]) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTeams = useMemo(() => {
    return teams.filter((team) =>
      team.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [teams, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    filteredTeams
  };
};