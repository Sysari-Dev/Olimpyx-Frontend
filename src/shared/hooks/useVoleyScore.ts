// src/hooks/useVoleyScore.ts
import { useMemo } from "react";

interface SetData {
  pointsTeam1: number;
  pointsTeam2: number;
}

export const useVoleyScore = (sets: SetData[] | undefined) => {
  return useMemo(() => {
    // Si no hay sets, ambos tienen 0
    if (!sets || sets.length === 0) return { setsTeam1: 0, setsTeam2: 0 };
    
    let setsTeam1 = 0;
    let setsTeam2 = 0;

    sets.forEach(set => {
      // Evaluamos quién ganó este set específico
      if (set.pointsTeam1 > set.pointsTeam2) {
        setsTeam1++;
      } else if (set.pointsTeam2 > set.pointsTeam1) {
        setsTeam2++;
      }
      // Si hay empate de puntos en un set (ej. se suspendió), no suma a ninguno
    });

    return { setsTeam1, setsTeam2 };
  }, [sets]);
};