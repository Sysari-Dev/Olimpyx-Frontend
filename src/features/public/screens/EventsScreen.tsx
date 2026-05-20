import { EventsSection } from '../components/EventsSection';
import { usePublic } from '../hooks/usePublic';
import { LoadingState } from '@atoms/LoadingState';

function EventsScreen() {
  const { events, isLoading } = usePublic();

  if (isLoading) return <LoadingState text="Cargando eventos..." />;

  return (
    <div className="animate-in fade-in duration-700">
      <EventsSection events={events} />
    </div>
  );
}

export default EventsScreen;