import { useState, useEffect } from "react";
import { PublicService, type LiveMatch } from "../services/public.service";

export const useLiveMatches = () => {
  const [matches, setMatches] = useState <LiveMatch[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isSubscribed = true;
    PublicService.getLiveMatches().then(res => {
      if (isSubscribed) {
        setMatches(res.data);
        setIsLoading(false);
      }
    });
    return () => { isSubscribed = false; };
  }, []);

  return { matches, isLoading };
};