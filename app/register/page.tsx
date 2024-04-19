"use client";

import React from "react";
import Link from "next/link";
import { MdEmail } from "react-icons/md";
import { PiPasswordBold } from "react-icons/pi";
import { FaUserTie } from "react-icons/fa6";

import { AnimatedButton, InputWithIcon } from "@/components/shared";
import { PromoWrapper } from "@/components";
import { links } from "@/config";

export default function RegisterPage() {
  return (
    <PromoWrapper>
      <form>
        <h2>Логін</h2>
        <InputWithIcon
          type="text"
          placeholder="Електронна пошта"
          Icon={MdEmail}
        />
        <InputWithIcon type="text" placeholder="Повне ім'я" Icon={FaUserTie} />
        <InputWithIcon
          type="password"
          placeholder="Пароль"
          Icon={PiPasswordBold}
        />
        <InputWithIcon
          type="password"
          placeholder="Підтвердьте пароль"
          Icon={PiPasswordBold}
        />
        <AnimatedButton type="submit">Зареєструватися</AnimatedButton>
      </form>
      <div>
        <h3>Вже маєте акаунт?</h3>
        <Link href={links.login}>Логін</Link>
      </div>
    </PromoWrapper>
  );
}
