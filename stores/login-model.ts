import { combine, sample } from "effector";
import { createGate } from "effector-react";
import { createForm } from "effector-forms";
import { loginFx, redirectFx, showErrorMessageFx } from "@/effects";

import { authErrors } from "@/firebase";
import { fields } from "@/utils";
import { links } from "@/config";
import { LoginCredentials } from "@/entities";

export const Gate = createGate();

export const form = createForm<LoginCredentials>({
  fields: {
    email: fields.email(),
    password: fields.password(),
  },
});

export const $loading = combine([loginFx.pending], (tuple) =>
  tuple.some(Boolean),
);

sample({ clock: form.formValidated, target: loginFx });

sample({ clock: Gate.close, target: form.reset });

sample({ clock: loginFx.done, fn: () => links.report, target: redirectFx });

sample({
  clock: loginFx.failData,
  filter: ({ message }) =>
    !authErrors.email[message] && !authErrors.password[message],
  fn: ({ message }) => new Error(authErrors.login[message] ?? message),
  target: showErrorMessageFx,
});

sample({
  clock: loginFx.failData,
  filter: ({ message }) => Boolean(authErrors.email[message]),
  fn: ({ message }) => ({
    rule: "api-email-error",
    errorText: authErrors.email[message],
  }),
  target: form.fields.email.addError,
});

sample({
  clock: loginFx.failData,
  filter: ({ message }) => Boolean(authErrors.password[message]),
  fn: ({ message }) => ({
    rule: "api-password-error",
    errorText: authErrors.password[message],
  }),
  target: form.fields.password.addError,
});
