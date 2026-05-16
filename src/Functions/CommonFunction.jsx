export const addDays = (days) => {
  if (days === undefined) return "-";

  const d = new Date();
  d.setDate(d.getDate() + days);

  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  return `${day}-${month}-${year}`;
};