import { links } from "./navigation";

export const cookieExpirationDays = 5;
export const authCookieKey = "session";
export const userCookieKey = "user";

export const authCookies = [userCookieKey, authCookieKey];

export const protectedRoutes = [links.report, links.profile];
export const authRoutes = [links.login, links.register, links.passwordReset];
