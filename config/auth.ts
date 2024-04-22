import { links } from "./navigation";

export const cookieExpirationDays = 5;
export const authCookieKey = "session";
export const userCookieKey = "user";

export const protectedRoutes = [links.report];
export const authRoutes = [links.login, links.register];
