import { type EventStatus } from "@features/events/models/event-api.model";

export const getEventStatusAnalysis = (startDateStr: string, endDateStr: string, status: EventStatus) => {
  const start = new Date(startDateStr);
  const end = new Date(endDateStr);
  const now = new Date();
  
  start.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const diffTime = start.getTime() - today.getTime();
  const diffDays = Math.round(diffTime / (1000 * 3600 * 24));
  
  const isPastEnd = now > end;
  const isDuring = now >= start && now <= end;

  if (isPastEnd) {
    if (status === 'PLANNING') {
      return {
        type: 'error',
        title: 'Evento caducado',
        message: 'La fecha de finalización ha excedido el cronograma y el evento nunca fue activado. Se recomienda actualizar las fechas para evitar inconvenientes en el sistema.',
        color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20'
      };
    }
    return {
      type: 'neutral',
      title: 'Evento concretado',
      message: 'Este evento ha finalizado satisfactoriamente según el calendario. Todas las estadísticas han sido archivadas en el historial de la organización.',
      color: 'text-gray/60', bg: 'bg-white/5', border: 'border-white/10'
    };
  }

  if (isDuring || diffDays <= 0) {
    if (status === 'PLANNING') {
      return {
        type: 'error',
        title: diffDays === 0 ? 'Hoy inicia el evento' : 'Evento con retraso',
        message: 'El evento ya debería estar operativo según su fecha de comienzo. Es imperativo activarlo ahora para habilitar la gestión de torneos y visualización de resultados.',
        color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20'
      };
    }
    return {
      type: 'success',
      title: 'Evento en ejecución',
      message: 'La competencia se está desarrollando de forma óptima. Los sistemas de arbitraje, cronometraje y tablas de posiciones están activos y sincronizados.',
      color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20'
    };
  }

  if (status === 'PLANNING' && diffDays <= 1) {
    return {
      type: 'warning',
      title: 'Mañana inicia el evento',
      message: 'Te aconsejamos activar el evento en las próximas horas. Esto permitirá que los clubes afiliados y el público general puedan consultar el fixture y sedes.',
      color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/20'
    };
  }

  return {
    type: 'success',
    title: `A ${diffDays} días del evento`,
    message: 'El cronograma se encuentra en orden y bajo control. Puedes continuar con la fase de inscripciones, creación de torneos y configuración de reglamentos.',
    color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20'
  };
};