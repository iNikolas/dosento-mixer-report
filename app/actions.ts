"use server";

import { redirect } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/require-await
export async function navigate(url: string) {
  redirect(url);
}
