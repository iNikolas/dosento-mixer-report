export const links = {
  uploadData: "/",
  report: "/reports",
  login: "/login",
  register: "/register",
} as const;

export const routes = [
  { label: "Завантажити звіт", path: links.uploadData },
  { label: "Звіти", path: links.report },
] as const;
