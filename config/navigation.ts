export const links = {
  uploadData: "/",
  report: "/reports",
  login: "/login",
  register: "/register",
  notAuthorized: "/not-authorized",
  passwordReset: "/password-reset",
  profile: "/profile",
} as const;

export const api = {
  login: "/api/login",
} as const;

export const routes = [
  { label: "Завантажити звіт", path: links.uploadData },
  { label: "Звіти", path: links.report },
] as const;
