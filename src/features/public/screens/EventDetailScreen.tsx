import { useParams } from 'react-router-dom';
import { EventDetailSection } from '../components/EventDetailSection';
import { usePublic } from '../hooks/usePublic';
import { LoadingState } from '@atoms/LoadingState'; 

function EventDetailScreen() {
  const { id } = useParams<{ id: string }>();
  const { events, isLoading } = usePublic();
  if (isLoading) return <LoadingState text="Cargando información del evento..." />;
  const currentEvent = events.find(e => e.id === id);
  if (!currentEvent && !isLoading) {
    return <div className="text-center p-20 text-gray/50 font-bold uppercase tracking-widest">Evento no encontrado</div>;
  }

  return (
    <div className="animate-in fade-in duration-700">
      <EventDetailSection
        event={currentEvent} 
        tournaments={currentEvent?.tournaments || []}
      />
    </div>
  );
}

export default EventDetailScreen;