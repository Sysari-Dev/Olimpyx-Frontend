import { useState, useMemo } from "react";
import { type Event } from "@models/event.model";

export const useSearchEvents = (events: Event[]) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEvents = useMemo(() => {
    return events.filter((event) =>
      event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [events, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    filteredEvents
  };
};