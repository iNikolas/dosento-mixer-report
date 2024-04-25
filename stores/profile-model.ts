import { combine, sample } from "effector";
import { createGate } from "effector-react";
import { createForm } from "effector-forms";

import {
  showErrorMessageFx,
  showSuccessfullMessageFx,
  updateProfileFx,
} from "@/effects";
import { fields, rules } from "@/utils";
import { fullnameMinLength, minimumPasswordLength } from "@/config";
import { authErrors } from "@/firebase";

import { $currentUser, fetchUserDataRequested } from "./user-model";

export const Gate = createGate();

export const form = createForm({
  fields: {
    email: fields.email(),
    fullname: {
      init: "",
      rules: [rules.minLength(fullnameMinLength)],
      validateOn: ["blur"],
    },
    password: fields.password(),
    newPassword: {
      init: "",
      rules: [rules.minLength(minimumPasswordLength)],
      validateOn: ["blur"],
    },
    confirmation: fields.confirmation("newPassword"),
  },
});

export const $loading = combine([updateProfileFx.pending], (tuple) =>
  tuple.some(Boolean),
);

sample({ clock: updateProfileFx.done, target: fetchUserDataRequested });

sample({
  clock: updateProfileFx.done,
  fn: () => "Успішно збережено",
  target: showSuccessfullMessageFx,
});

sample({
  clock: [$currentUser, Gate.open],
  source: $currentUser,
  filter: (user) => Boolean(user),
  fn: (user) => ({
    email: user?.email,
    fullname: user?.displayName,
  }),
  target: form.setForm,
});

sample({
  clock: form.formValidated,
  source: $currentUser,
  filter: (user) => Boolean(user),
  fn: (user, { email, password, newPassword, fullname }) => {
    if (!user) {
      throw new Error("User have to be defined");
    }
    return {
      email: user.email,
      password,
      ...(user.displayName !== fullname && { newDisplayName: fullname }),
      ...(!!newPassword && { newPassword }),
      ...(email !== user.email && { newEmail: email }),
    };
  },
  target: updateProfileFx,
});

sample({
  clock: Gate.close,
  source: $currentUser,
  fn: (user) => ({ email: user?.email, fullname: user?.displayName }),
  target: [form.reset, form.setForm],
});

sample({
  clock: updateProfileFx.failData,
  filter: ({ message }) =>
    !authErrors.email[message] && !authErrors.password[message],
  fn: ({ message }) =>
    new Error(
      (authErrors.login[message] || authErrors.update[message]) ?? message,
    ),
  target: showErrorMessageFx,
});

sample({
  clock: updateProfileFx.failData,
  filter: ({ message }) => Boolean(authErrors.email[message]),
  fn: ({ message }) => ({
    rule: "api-email-error",
    errorText: authErrors.email[message],
  }),
  target: form.fields.email.addError,
});

sample({
  clock: updateProfileFx.failData,
  filter: ({ message }) => Boolean(authErrors.password[message]),
  fn: ({ message }) => ({
    rule: "api-password-error",
    errorText: authErrors.password[message],
  }),
  target: form.fields.password.addError,
});
