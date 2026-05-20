export const formatDateShort = (date: Date, includeToday = true): string => {
  const today = new Date();
  const isToday = 
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  const formatted = date.toLocaleDateString('es-ES', { 
    day: 'numeric', 
    month: 'short' 
  }).replace('.', '');

  if (includeToday && isToday) {
    return `Hoy, ${formatted}`;
  }

  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

export const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
export const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();