import { useState, useEffect } from "react";
import { PublicService } from "../services/public.service";
import type { TournamentResultsData } from "../models/public-api.model";
export const useTournamentResults = (tournamentId: string) => {
  const [data, setData] = useState<TournamentResultsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!tournamentId) return;
    let isSubscribed = true;
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await PublicService.getResults(tournamentId);
        if (isSubscribed) {
          setData(res.data);
        }
      } catch (err) {
        console.error("Error al traer resultados:", err);
      } finally {
        if (isSubscribed) {
          setIsLoading(false);
        }
      }
    };

    fetchData();
    return () => {
      isSubscribed = false;
    };
  }, [tournamentId]); 

  return { data, isLoading };
};