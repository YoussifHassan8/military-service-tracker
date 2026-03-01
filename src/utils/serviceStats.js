import dayjs from "dayjs";

export const getServiceStats = (startDate, endDate) => {
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  const today = dayjs();

  const totalDays = end.diff(start, "day");
  const passedDays =
    today.diff(start, "day") < 0
      ? 0
      : Math.min(today.diff(start, "day"), totalDays);

  const remainingDays = totalDays - passedDays;

  const progress = Math.floor((passedDays / totalDays) * 100);

  return {
    totalDays,
    passedDays,
    remainingDays,
    progress,
  };
};
