"use client";

import React from "react";
import { useGate, useUnit } from "effector-react";
import { useForm } from "effector-forms";
import { MdEmail } from "react-icons/md";
import { PiPasswordBold } from "react-icons/pi";

import { loginModel } from "@/stores";

import { AnimatedButton, InputWithIcon } from "../shared";

export function LoginForm() {
  useGate(loginModel.Gate);

  const { fields, submit, eachValid } = useForm(loginModel.form);
  const loading = useUnit(loginModel.$loading);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <h2>Логін</h2>
      <InputWithIcon
        type="text"
        placeholder="Електронна пошта"
        Icon={MdEmail}
        value={fields.email.value}
        onChange={(e) => fields.email.onChange(e.target.value)}
        onBlur={() => fields.email.onBlur()}
        error={fields.email.errorText()}
      />
      <InputWithIcon
        type="password"
        placeholder="Пароль"
        Icon={PiPasswordBold}
        value={fields.password.value ?? ""}
        onChange={(e) => fields.password.onChange(e.target.value)}
        onBlur={() => fields.password.onBlur()}
        error={fields.password.errorText()}
      />
      <AnimatedButton disabled={loading || !eachValid} type="submit">
        Логін
      </AnimatedButton>
    </form>
  );
}
