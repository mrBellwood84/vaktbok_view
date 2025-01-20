export const formatTimestamp = (timestamp: Date): string => {
  const dateString = timestamp.toLocaleString().split(",");
  const time = dateString[1].trim();
  const date = dateString[0].split(".");
  const day = date[0].length === 1 ? `0${date[0]}` : date[0];
  const month = date[1].length === 1 ? `0${date[1]}` : date[1];
  return `${day}.${month}.${date[2]} ${time}`;
};
