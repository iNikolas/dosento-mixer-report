"use client";

import React from "react";
import { useForm } from "effector-forms";
import { useGate, useUnit } from "effector-react";
import { FaUserTie } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { PiPasswordBold } from "react-icons/pi";

import { profileModel } from "@/stores";

import { InputWithIcon, AnimatedButton } from "../shared";

export function ProfileForm() {
  useGate(profileModel.Gate);

  const { fields, submit, eachValid } = useForm(profileModel.form);
  const loading = useUnit(profileModel.$loading);

  return (
    <form
      className="prose mx-auto flex flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <h2>Профіль користувача</h2>
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
        placeholder="Новий пароль"
        Icon={PiPasswordBold}
        value={fields.newPassword.value ?? ""}
        onChange={(e) => fields.newPassword.onChange(e.target.value)}
        onBlur={() => fields.newPassword.onBlur()}
        error={fields.newPassword.errorText()}
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
      <AnimatedButton
        className="mt-4"
        disabled={loading || !eachValid}
        type="submit"
      >
        Зберегти
      </AnimatedButton>
    </form>
  );
}
