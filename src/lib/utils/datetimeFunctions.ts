export const getNowDateString = () => {
  return new Date().toISOString().split("T")[0].toString();
};

export const getCurrentWeek = () => {
  const MSMOD = 1000 * 60 * 60 * 24;

  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const yearStart = new Date(now.getFullYear(), 0, 1);
  const days = (now.getTime() - yearStart.getTime()) / MSMOD - 2;
  const week = Math.ceil(days / 7);

  return week;
};

export const getCurrentYear = () => {
  const now = new Date();
  return now.getFullYear();
};

export const formatTimestamp = (timestamp: Date): string => {
  const dateString = timestamp.toLocaleString().split(",");

  const time = dateString[1].trim();
  const date = dateString[0].split(".");
  const day = date[0].length === 1 ? `0${date[0]}` : date[0];

  const month = date[1].length === 1 ? `0${date[1]}` : date[1];
  return `${date[2]}.${month}.${day} ${time}`;
};
