import React from "react";
import { EffectorNext } from "@effector/next";
import { ToastContainer } from "react-toastify";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

import { cn } from "@/utils";
import { Navbar } from "@/components";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Управління звітами міксера [LLC DOCENTO POLYMER]",
  description:
    "Оптимізуйте робочий процес зчитування, сортування та аналізу звітів з міксерного виробництва у форматі CSV. Зручне відображення, сортування та фільтрація даних з підсумками за кожним стовпцем.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="overflow-x-hidden" lang="uk">
      <body
        className={cn(inter.className, "h-screen flex flex-col bg-base-300")}
      >
        <ToastContainer />
        <EffectorNext>
          <Navbar />
          <main className="flex flex-col flex-grow overflow-hidden">
            {children}
          </main>
        </EffectorNext>
      </body>
    </html>
  );
}
