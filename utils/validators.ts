import { validatePassword as validatePasswordFirebase } from "firebase/auth";
import { toast } from "react-toastify";
import isEmail from "validator/es/lib/isEmail";

import { auth } from "@/auth";

export function validateEmail(value?: string): string | null {
  if (!value) {
    return "Поле електронної пошти обов'язкове";
  }

  if (!isEmail(value)) {
    return "Електронна адреса має бути дійсною";
  }

  return null;
}

export async function validatePassword(value = ""): Promise<string | null> {
  try {
    const status = await validatePasswordFirebase(auth, value);
    if (status.isValid) {
      return null;
    }

    if (!status.meetsMinPasswordLength) {
      return "Пароль не відповідає вимогам щодо мінімальної довжини";
    }

    if (!status.meetsMaxPasswordLength) {
      return "Пароль задовгий";
    }

    return "Пароль неправильний";
  } catch (e) {
    if (e instanceof Error) {
      toast.error(e.message);
    }
    return "Помилка програми під час перевірки пароля";
  }
}
