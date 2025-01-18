export const getNowDateString = () => {
  const date = new Date();
  const y = date.getFullYear(),
    m = date.getMonth() + 1,
    d = date.getDate();
  const result = `${y}-${m < 10 ? "0" : ""}${m}-${d < 10 ? "0" : ""}${d}`;
  return result;
};
