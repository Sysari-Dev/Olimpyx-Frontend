import { type TournamentFormat } from "@features/tournament/models/tournament-api.model";

export const TournamentParser = {
  formatToLabel: (format: TournamentFormat | string): string => {
    const formats: Record<string, string> = {
      ROUND_ROBIN: "Liga (Todos vs Todos)",
      ELIMINATION: "Eliminación Directa",
      GROUP_STAGE: "Fase de Grupos",
    };

    return formats[format] ?? format;
  }
};