"use client";

import React from "react";
import Link from "next/link";
import { useForm } from "effector-forms";
import { useUnit } from "effector-react";
import { MdEmail } from "react-icons/md";
import { PiPasswordBold } from "react-icons/pi";

import { AnimatedButton, InputWithIcon } from "@/components/shared";
import { PromoWrapper } from "@/components";
import { links } from "@/config";
import { loginModel } from "@/stores";

export default function LoginPage() {
  const { fields, submit, eachValid } = useForm(loginModel.form);
  const loading = useUnit(loginModel.$loading);

  return (
    <PromoWrapper>
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
      <div>
        <h3>Немає облікового запису?</h3>
        <Link href={links.register}>Зареєструватися</Link>
      </div>
    </PromoWrapper>
  );
}
