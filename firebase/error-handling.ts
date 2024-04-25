export const authErrors: {
  email: Record<string, string>;
  password: Record<string, string>;
  login: Record<string, string>;
  update: Record<string, string>;
} = {
  email: {
    "auth/email-already-in-use":
      "Ця електронна пошта вже використовується іншим користувачем",
    "auth/invalid-email": "Це недійсна електронна пошта",
  },
  password: { "auth/invalid-password": "Цей пароль недійсний" },
  login: {
    "auth/invalid-credential": "Облікові дані для входу недійсні",
  },
  update: {
    "auth/operation-not-allowed":
      "Операція заборонена. Ймовірно, така електронна адреса вже використовується",
  },
};
