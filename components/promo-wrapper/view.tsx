import React from "react";
import Image from "next/image";

import chemistryPic from "@/assets/images/polymer-chemistry.jpeg";
import { cn } from "@/utils";

export function PromoWrapper({
  children,
  className,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) {
  return (
    <div
      className={cn(
        "flex grow [&_form]:flex [&_form]:gap-2 [&_form]:flex-col [&_form]:max-w-sm [&_form]:self-center [&_form]:w-full",
        className,
      )}
      {...props}
    >
      <section className="basis-1/2 hidden sm:block">
        <Image
          priority
          className="object-cover w-auto h-full"
          src={chemistryPic}
          alt="Плакат"
        />
      </section>
      <section className="prose text-center basis-1 sm:basis-1/2 p-6 mx-auto grow flex flex-col justify-between">
        {children}
      </section>
    </div>
  );
}
