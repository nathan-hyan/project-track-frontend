export type DateStyle = 'full' | 'long' | 'medium' | 'short'

export const formatTime = (time: Date, dateStyle: DateStyle = 'medium') => {
  const newTime = new Intl.DateTimeFormat('en-US', { dateStyle, timeStyle: 'medium' }).format(new Date(time));

  return newTime;
};
