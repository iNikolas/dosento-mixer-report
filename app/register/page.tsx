import React from "react";
import Link from "next/link";

import { PromoWrapper, RegisterForm } from "@/components";
import { links } from "@/config";

export default function RegisterPage() {
  return (
    <PromoWrapper>
      <RegisterForm />
      <div>
        <h3>Вже маєте акаунт?</h3>
        <Link href={links.login}>Логін</Link>
      </div>
    </PromoWrapper>
  );
}
