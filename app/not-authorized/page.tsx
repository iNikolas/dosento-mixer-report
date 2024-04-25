import React from "react";
import Image from "next/image";
import Link from "next/link";

import notAllowedPic from "@/assets/images/not-allowed.webp";

import { links } from "@/config";

export default function RegisterPage() {
  return (
    <section className="overflow-y-auto p-4">
      <div className="prose mx-auto">
        <h2 className="text-center">Вибачте!</h2>
        <h3 className="text-center">Ваш обліковий запис ще не авторизовано</h3>

        <Image
          priority
          className="rounded"
          src={notAllowedPic}
          alt="Не дозволено"
        />

        <p>
          Будь ласка, попросіть керівника компанії надати вам доступ до сторінки
          виробничих звітів
        </p>

        <div className="divider" />

        <p>
          <Link href={links.uploadData}>Перейти на головну сторінку</Link>
        </p>
      </div>
    </section>
  );
}
