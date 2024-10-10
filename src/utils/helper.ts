export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const calculateDaysBetween = (start: Date, end: Date): number => {
  const millisecondsInADay = 1000 * 60 * 60 * 24;
  const differenceInMilliseconds = end.getTime() - start.getTime();
  return Math.floor(differenceInMilliseconds / millisecondsInADay);
};
