import { combine, sample } from "effector";
import { createGate } from "effector-react";
import { createForm } from "effector-forms";
import { loginFx, registerFx, showErrorMessageFx } from "@/effects";

import { rules } from "@/utils";
import { links, minimumPasswordLength } from "@/config";
import { navigate } from "@/app/actions";
import { authErrors } from "@/firebase";

import { $currentUser } from "./user-model";

export const Gate = createGate();

export const form = createForm({
  fields: {
    email: {
      init: "",
      rules: [rules.required(), rules.email()],
      validateOn: ["blur"],
    },
    fullname: {
      init: "",
      rules: [rules.required(), rules.minLength(2)],
      validateOn: ["blur"],
    },
    password: {
      init: "",
      rules: [rules.required(), rules.minLength(minimumPasswordLength)],
      validateOn: ["blur"],
    },
    confirmation: {
      init: "",
      rules: [rules.confirmation()],
      validateOn: ["blur"],
    },
  },
});

export const $loading = combine([loginFx.pending], (tuple) =>
  tuple.some(Boolean),
);

sample({ clock: form.formValidated, target: registerFx });

sample({ clock: Gate.close, target: form.reset });

sample({
  clock: registerFx.done,
  fn: async () => {
    await navigate(links.report);
  },
});

sample({
  clock: registerFx.failData,
  filter: ({ message }) =>
    !authErrors.email[message] && !authErrors.password[message],
  target: showErrorMessageFx,
});

sample({
  clock: registerFx.failData,
  filter: ({ message }) => Boolean(authErrors.email[message]),
  fn: ({ message }) => ({
    rule: "api-email-error",
    errorText: authErrors.email[message],
  }),
  target: form.fields.email.addError,
});

sample({
  clock: registerFx.failData,
  filter: ({ message }) => Boolean(authErrors.password[message]),
  fn: ({ message }) => ({
    rule: "api-password-error",
    errorText: authErrors.password[message],
  }),
  target: form.fields.password.addError,
});

sample({
  clock: [Gate.open, $currentUser],
  source: $currentUser,
  filter: Boolean,
  fn: async () => {
    await navigate(links.report);
  },
});
