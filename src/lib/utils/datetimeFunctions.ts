export const getNowDateString = () => {
  return new Date().toISOString().split("T")[0].toString();
};
