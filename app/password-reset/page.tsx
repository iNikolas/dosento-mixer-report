import React from "react";
import Link from "next/link";

import { PromoWrapper, PasswordResetForm } from "@/components";
import { links } from "@/config";

export default function PasswordResetPage() {
  return (
    <PromoWrapper>
      <PasswordResetForm />
      <div>
        <h3>Немає облікового запису?</h3>
        <Link href={links.register}>Зареєструватися</Link>
      </div>
    </PromoWrapper>
  );
}
