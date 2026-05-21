import { useState, useEffect } from "react";
import { PublicService } from "../services/public.service";
import type { LiveMatch } from "../models/public-api.model";

export const useLiveMatches = () => {
  const [matches, setMatches] = useState<LiveMatch[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isSubscribed = true;

    PublicService.getLiveMatches().then((res) => {
      if (isSubscribed) {
        setMatches(res.data);
        setIsLoading(false);
      }
    });

    return () => {
      isSubscribed = false;
    };
  }, []);

  return { matches, isLoading };
};