import { combine, sample } from "effector";
import { createGate } from "effector-react";
import { createForm } from "effector-forms";
import { loginFx } from "@/effects";

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
    password: {
      init: "",
      rules: [rules.required(), rules.minLength(minimumPasswordLength)],
      validateOn: ["blur"],
    },
  },
});

export const $loading = combine([loginFx.pending], (tuple) =>
  tuple.some(Boolean),
);

sample({ clock: form.formValidated, target: loginFx });

sample({ clock: Gate.close, target: form.reset });
