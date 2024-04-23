"use client";

import React from "react";
import { useForm } from "effector-forms";
import { useGate, useUnit } from "effector-react";
import { FaUserTie } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { PiPasswordBold } from "react-icons/pi";

import { registerModel } from "@/stores";

import { InputWithIcon, AnimatedButton } from "../shared";

export function RegisterForm() {
  useGate(registerModel.Gate);

  const { fields, submit, eachValid } = useForm(registerModel.form);
  const loading = useUnit(registerModel.$loading);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <h2>Реєстрація</h2>
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
        type="text"
        placeholder="Повне ім'я"
        Icon={FaUserTie}
        value={fields.fullname.value ?? ""}
        onChange={(e) => fields.fullname.onChange(e.target.value)}
        onBlur={() => fields.fullname.onBlur()}
        error={fields.fullname.errorText()}
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
      <InputWithIcon
        type="password"
        placeholder="Підтвердьте пароль"
        Icon={PiPasswordBold}
        value={fields.confirmation.value ?? ""}
        onChange={(e) => fields.confirmation.onChange(e.target.value)}
        onBlur={() => fields.confirmation.onBlur()}
        error={fields.confirmation.errorText()}
      />
      <AnimatedButton disabled={loading || !eachValid} type="submit">
        Зареєструватися
      </AnimatedButton>
    </form>
  );
}
