import React from "react";
import Link from "next/link";

import { LoginForm, PromoWrapper } from "@/components";
import { links } from "@/config";

export default function LoginPage() {
  return (
    <PromoWrapper>
      <LoginForm />
      <div>
        <h3>Немає облікового запису?</h3>
        <Link href={links.register}>Зареєструватися</Link>
      </div>
    </PromoWrapper>
  );
}
