import { useState, useEffect } from "react";
import { PublicService, type TournamentResultsData } from "../services/public.service";
export const useTournamentResults = (tournamentId: string) => {
  const [data, setData] = useState<TournamentResultsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!tournamentId) return;

    // Creamos una variable local para controlar el "montaje" de esta llamada
    let isSubscribed = true;

    // Función asíncrona dentro del efecto
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