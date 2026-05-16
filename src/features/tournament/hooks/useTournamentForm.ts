import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { type CreateTournamentRequestDTO } from "../models/tournament-api.model";

export const useTournamentForm = () => {
  const [searchParams] = useSearchParams();
  const eventId = searchParams.get("eventId") || "";
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<CreateTournamentRequestDTO>({
    eventId: eventId,
    sportId: "",
    name: "",
    format: "GROUP_STAGE",
    isHomeAndAway: false,
    groupsCount: 2,
    qualifiersPerGroup: 2,
    pointsPerWin: 3,
    pointsPerDraw: 1,
    pointsPerLoss: 0,
    teamIds: []
  });

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const updateData = (newData: Partial<CreateTournamentRequestDTO>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  return {
    currentStep,
    formData,
    nextStep,
    prevStep,
    updateData,
    eventId
  };
};