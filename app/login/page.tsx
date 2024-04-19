"use client";

import React from "react";
import Link from "next/link";
import { MdEmail } from "react-icons/md";
import { PiPasswordBold } from "react-icons/pi";

import { AnimatedButton, InputWithIcon } from "@/components/shared";
import { PromoWrapper } from "@/components";
import { links } from "@/config";

export default function LoginPage() {
  return (
    <PromoWrapper>
      <form>
        <h2>Логін</h2>
        <InputWithIcon
          type="text"
          placeholder="Електронна пошта"
          Icon={MdEmail}
        />
        <InputWithIcon
          type="password"
          placeholder="Пароль"
          Icon={PiPasswordBold}
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
