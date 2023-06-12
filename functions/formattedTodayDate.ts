export const todayDate = () => {
  const inputDate = new Date().toISOString().slice(0, 10);
  const formattedDate = inputDate.split("-").join("-");
  return formattedDate;
};
