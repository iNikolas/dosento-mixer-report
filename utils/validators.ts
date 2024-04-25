import { Rule } from "effector-forms";
import isEmail from "validator/es/lib/isEmail";

export const rules = {
  required: (): Rule<string> => ({
    name: "required",
    validator: (value) => ({
      isValid: Boolean(value),
      errorText: "Обов'язкове поле",
    }),
  }),
  email: (): Rule<string> => ({
    name: "email",
    validator: (value) => ({
      isValid: isEmail(value),
      errorText: "Електронна адреса має бути дійсною",
    }),
  }),
  minLength: (min: number): Rule<string> => ({
    name: "minLength",
    validator: (value) => ({
      isValid: !value || value.length >= min,
      errorText: `Мінімальна довжина – ${min} символів`,
    }),
  }),
  confirmation: (name: string): Rule<string> => ({
    name: "confirmation",
    validator: (value, fields: Record<string, string>) => ({
      isValid: value === fields[name],
      errorText: "Паролі повинні збігатися",
    }),
  }),
};
