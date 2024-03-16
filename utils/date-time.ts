export function formatTime(input: Date | number | string) {
  const date = new Date(input);

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

function getMonthName(monthIndex: number) {
  const monthNames = [
    "січ.",
    "лют.",
    "бер.",
    "квіт.",
    "трав.",
    "черв.",
    "лип.",
    "серп.",
    "вер.",
    "жовт.",
    "лист.",
    "груд.",
  ];
  return monthNames[monthIndex];
}

export function formatDate(input: Date | number | string) {
  const date = new Date(input);
  const today = new Date();

  if (date.toDateString() === today.toDateString()) {
    return "Сьогодні";
  }

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === yesterday.toDateString()) {
    return "Вчора";
  }

  if (date.getFullYear() === today.getFullYear()) {
    return `${date.getDate()} ${getMonthName(date.getMonth())}`;
  }

  return `${date.getDate()} ${getMonthName(date.getMonth())}, ${date.getFullYear()}`;
}
