import { FieldConfig } from "effector-forms";

import { minimumPasswordLength } from "@/config";

import { rules } from "./validators";

export const fields = {
  email: (): FieldConfig<string> => ({
    init: "",
    rules: [rules.required(), rules.email()],
    validateOn: ["blur"],
  }),
  password: (): FieldConfig<string> => ({
    init: "",
    rules: [rules.required(), rules.minLength(minimumPasswordLength)],
    validateOn: ["blur"],
  }),
  fullName: (): FieldConfig<string> => ({
    init: "",
    rules: [rules.required(), rules.minLength(2)],
    validateOn: ["blur"],
  }),
  confirmation: (reference = "password"): FieldConfig<string> => ({
    init: "",
    rules: [rules.confirmation(reference)],
    validateOn: ["blur"],
  }),
};
