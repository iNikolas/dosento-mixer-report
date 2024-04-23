import { combine, createStore, sample } from "effector";
import { createGate } from "effector-react";
import { createForm } from "effector-forms";
import { passwordResetFx, showErrorMessageFx } from "@/effects";

import { authErrors } from "@/firebase";
import { rules } from "@/utils";
import { PasswordResetCredentials } from "@/entities";

export const Gate = createGate();

export const form = createForm<PasswordResetCredentials>({
  fields: {
    email: {
      init: "",
      rules: [rules.required(), rules.email()],
      validateOn: ["blur"],
    },
  },
});

export const $loading = combine([passwordResetFx.pending], (tuple) =>
  tuple.some(Boolean),
);

export const $isSubmitted = createStore(false);

$isSubmitted.on(passwordResetFx.done, () => true).reset(Gate.close);

sample({ clock: form.formValidated, target: passwordResetFx });

sample({ clock: Gate.close, target: form.reset });

sample({
  clock: passwordResetFx.failData,
  filter: ({ message }) => !authErrors.email[message],
  fn: ({ message }) => new Error(authErrors.login[message] ?? message),
  target: showErrorMessageFx,
});

sample({
  clock: passwordResetFx.failData,
  filter: ({ message }) => Boolean(authErrors.email[message]),
  fn: ({ message }) => ({
    rule: "api-email-error",
    errorText: authErrors.email[message],
  }),
  target: form.fields.email.addError,
});
