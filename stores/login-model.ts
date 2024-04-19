import React from "react";
import { createEvent, sample } from "effector";
import { createForm } from "effector-final-form";
import { validateEmail, validatePassword } from "@/utils";

export const emailFieldChanged =
  createEvent<React.ChangeEvent<HTMLInputElement>>();
export const passwordFieldChanged =
  createEvent<React.ChangeEvent<HTMLInputElement>>();
export const formSubmitted = createEvent<React.FormEvent<HTMLFormElement>>();

export const form = createForm<{ email: string; password: string }>({
  onSubmit: (values, f) => {
    console.log(values);
  },
  subscribeOn: [
    "values",
    "errors",
    "submitting",
    "submitSucceeded",
    "submitFailed",
    "submitErrors",
  ],
});

export const emailField = form.api.registerField({
  name: "email",
  subscribeOn: [],
  validate: validateEmail,
});

export const passwordField = form.api.registerField({
  name: "password",
  subscribeOn: [],
  validate: validatePassword,
});

sample({
  clock: emailFieldChanged,
  fn: (e) => e.target.value,
  target: [emailField.api.changeFx],
});

sample({
  clock: passwordFieldChanged,
  fn: (e) => e.target.value,
  target: [passwordField.api.changeFx],
});

sample({
  clock: formSubmitted,
  fn: (e) => e.preventDefault(),
  target: form.api.submitFx,
});
