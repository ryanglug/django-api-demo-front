export const formatDate = (date: string) => {
  const dateObj = new Date(date);

  return dateObj.toLocaleString("en-GB", {
    day: "2-digit",
    hour: "2-digit",
    month: "long",
    minute: "2-digit",
    year: "2-digit",
  });
};
