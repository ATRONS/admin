export const getFormattedDate = (date) => {
  if (typeof date === 'string') {
    return date.split('T')[0];
  }
  return date.toDateString();
};
