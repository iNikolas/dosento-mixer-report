import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { cn } from "@/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Отчет Миксера [LLC DOCENTO POLYMER]",
  description:
    "Загрузите CSV файл с отчетом для его удобного просмотра и выгрузки данных",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body
        className={cn(
          inter.className,
          "min-h-screen flex flex-col bg-base-300",
        )}
      >
        {children}
      </body>
    </html>
  );
}
