"use client";

import React from "react";
import Link from "next/link";
import { useUnit } from "effector-react";
import { MdEmail } from "react-icons/md";
import { PiPasswordBold } from "react-icons/pi";

import { AnimatedButton, InputWithIcon } from "@/components/shared";
import { PromoWrapper } from "@/components";
import { links } from "@/config";
import { loginModel } from "@/stores";

export default function LoginPage() {
  const email = useUnit(loginModel.emailField.$);
  const password = useUnit(loginModel.passwordField.$);
  const formState = useUnit(loginModel.form.$);
  const handleEmailChange = useUnit(loginModel.emailFieldChanged);
  const handlePasswordChange = useUnit(loginModel.passwordFieldChanged);
  const handleFormSubmit = useUnit(loginModel.formSubmitted);

  React.useEffect(() => {
    console.log(email);
  }, [email]);

  React.useEffect(() => {
    console.log(formState);
  }, [formState]);

  return (
    <PromoWrapper>
      <form onSubmit={handleFormSubmit}>
        <h2>Логін</h2>
        <InputWithIcon
          type="text"
          placeholder="Електронна пошта"
          Icon={MdEmail}
          value={email.value ?? ""}
          error={String(email.error ?? "")}
          onChange={handleEmailChange}
        />
        <InputWithIcon
          type="password"
          placeholder="Пароль"
          Icon={PiPasswordBold}
          value={password.value ?? ""}
          error={String(password.error ?? "")}
          onChange={handlePasswordChange}
        />
        <AnimatedButton type="submit">Логін</AnimatedButton>
      </form>
      <div>
        <h3>Немає облікового запису?</h3>
        <Link href={links.register}>Зареєструватися</Link>
      </div>
    </PromoWrapper>
  );
}
