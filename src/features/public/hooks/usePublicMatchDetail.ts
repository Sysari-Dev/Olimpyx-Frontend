import { useState, useEffect } from "react";
import { PublicService } from "../services/public.service";
import { type PublicMatchDetailResponse } from "../models/public-api.model";

export const usePublicMatchDetail = (matchId: string) => {
  const [match, setMatch] = useState<PublicMatchDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(!!matchId);
  const [prevMatchId, setPrevMatchId] = useState<string>(matchId);

  if (matchId !== prevMatchId) {
    setPrevMatchId(matchId);
    setIsLoading(!!matchId);
    setMatch(null);
  }

  useEffect(() => {
    if (!matchId) return;

    let isSubscribed = true;

    PublicService.getMatchDetail(matchId).then((res) => {
      if (isSubscribed) {
        if (res && res.success) {
          setMatch(res.data);
        }
        setIsLoading(false);
      }
    });

    return () => {
      isSubscribed = false;
    };
  }, [matchId]);

  return { match, isLoading };
};