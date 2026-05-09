import { useState } from 'react';
import type { Tournament } from '../models/tournament.interface';

export const useTournamentForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Tournament>({
    name: '',
    sport: '',
    system: '',
    isDoubleMatch: false,
    groupCount: 2,
    qualifiersPerGroup: 2,
    teams: []
  });

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const updateData = (newData: Partial<Tournament>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const saveTournament = () => {
    console.log("Datos del Torneo Recibidos:", formData);
  };

  return {
    currentStep,
    formData,
    nextStep,
    prevStep,
    updateData,
    saveTournament
  };
};