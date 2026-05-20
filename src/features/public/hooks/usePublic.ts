import { useState, useEffect } from "react";
import { PublicService } from "../services/public.service";
import { type PublicEvent } from "../models/public-api.model";

export const usePublic = () => {
  const [events, setEvents] = useState<PublicEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const response = await PublicService.getEvents();
      // 👇 Ya usamos el 'success' estándar de tu backend
      if (response.success && response.data) {
        setEvents(response.data);
      }
    } catch (error) {
      console.error("Error al obtener los eventos públicos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return {
    events,
    isLoading,
    fetchEvents
  };
};