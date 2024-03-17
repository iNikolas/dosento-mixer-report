import { zonedTimeToUtc, format } from "date-fns-tz";
import { uk } from "date-fns/locale";

export function formatTime(input: Date | number | string) {
  const utcDate = zonedTimeToUtc(input, "utc");

  return format(utcDate, "HH:mm", { timeZone: "Europe/Kiev" });
}

export function formatDate(input: Date | number | string) {
  const utcDate = zonedTimeToUtc(input, "utc");
  const localDate = zonedTimeToUtc(utcDate, "Europe/Kiev");

  const oneDayInMs = 86400000;
  const today = zonedTimeToUtc(new Date(), "Europe/Kiev");
  const yesterday = zonedTimeToUtc(
    new Date(Date.now() - oneDayInMs),
    "Europe/Kiev",
  );

  if (localDate.toDateString() === today.toDateString()) {
    return "Сьогодні";
  }

  if (localDate.toDateString() === yesterday.toDateString()) {
    return "Вчора";
  }

  if (localDate.getFullYear() !== today.getFullYear()) {
    return format(localDate, "dd LLL yyyy", {
      locale: uk,
      timeZone: "Europe/Kiev",
    });
  }

  return format(localDate, "dd LLL", { locale: uk, timeZone: "Europe/Kiev" });
}
