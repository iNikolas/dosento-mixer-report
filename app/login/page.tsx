"use client";

import React from "react";
import Link from "next/link";
import { MdEmail } from "react-icons/md";
import { PiPasswordBold } from "react-icons/pi";

import { InputWithIcon } from "@/components/shared";
import { PromoWrapper } from "@/components";

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
        <button type="submit" className="mt-2 btn btn-primary grow">
          Логін
        </button>
      </form>
      <div>
        <h3>Немає облікового запису?</h3>
        <Link href="/register">Зареєструватися</Link>
      </div>
    </PromoWrapper>
  );
}
