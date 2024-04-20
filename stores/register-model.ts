import { combine, sample } from "effector";
import { createGate } from "effector-react";
import { createForm } from "effector-forms";
import { loginFx, registerFx } from "@/effects";

import { rules } from "@/utils";
import { minimumPasswordLength } from "@/config";

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
