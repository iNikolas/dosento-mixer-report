const links = {
  uploadData: "/",
  report: "/reports",
} as const;

export const routes = [
  { label: "Завантажити звіт", path: links.uploadData },
  { label: "Звіти", path: links.report },
] as const;
