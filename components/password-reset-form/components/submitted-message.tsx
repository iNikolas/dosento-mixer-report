import React from "react";
import { useForm } from "effector-forms";

import { passwordResetModel } from "@/stores";

export function SubmittedMessage() {
  const { fields } = useForm(passwordResetModel.form);
  return (
    <section className="prose card bg-base-100 shadow-xl p-2">
      <h4>Готово!</h4>
      <p>
        Перевірте свою електронну пошту <b>{fields.email.value}</b>, щоб
        отримати подальші інструкції
      </p>
    </section>
  );
}
