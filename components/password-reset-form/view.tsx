"use client";

import React from "react";
import Link from "next/link";
import { useGate, useUnit } from "effector-react";
import { useForm } from "effector-forms";
import { MdEmail } from "react-icons/md";

import { passwordResetModel } from "@/stores";

import { AnimatedButton, InputWithIcon } from "../shared";
import { links } from "@/config";
import { SubmittedMessage } from "./components";

export function PasswordResetForm() {
  useGate(passwordResetModel.Gate);

  const { fields, submit, eachValid } = useForm(passwordResetModel.form);
  const loading = useUnit(passwordResetModel.$loading);
  const isSubmitted = useUnit(passwordResetModel.$isSubmitted);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <h2>Скидання пароля</h2>
      {isSubmitted ? (
        <SubmittedMessage />
      ) : (
        <>
          <InputWithIcon
            disabled={loading}
            type="text"
            placeholder="Електронна пошта"
            Icon={MdEmail}
            value={fields.email.value}
            onChange={(e) => fields.email.onChange(e.target.value)}
            onBlur={() => fields.email.onBlur()}
            error={fields.email.errorText()}
          />
          <AnimatedButton disabled={loading || !eachValid} type="submit">
            Скидання пароля
          </AnimatedButton>
        </>
      )}
      <Link className="text-xs link link-neutral" href={links.login}>
        назад
      </Link>
    </form>
  );
}
