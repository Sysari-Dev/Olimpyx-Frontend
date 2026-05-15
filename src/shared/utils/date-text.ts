export const DateParser = {
  toLongDate: (dateString: string): string => {
    if (!dateString) return "---";
    const date = new Date(dateString);
    
    return new Intl.DateTimeFormat('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  },

  toShortDate: (dateString: string): string => {
    if (!dateString) return "---";
    const date = new Date(dateString);
    
    return new Intl.DateTimeFormat('es-ES', {
      day: 'numeric',
      month: 'short',
    }).format(date);
  },

  toInputDate: (dateString: string): string => {
    if (!dateString) return "";
    return new Date(dateString).toISOString().split('T')[0];
  },

  toSpacedDate: (dateString: string): string => {
    if (!dateString) return "---";
    const date = new Date(dateString);
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day} - ${month} - ${year}`;
  },
  toNumericDate: (dateString: string): string => {
    if (!dateString) return "---";
    const date = new Date(dateString);
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  },
};