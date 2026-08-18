"use client";

import React from "react";
import { cn } from "@/lib/utils";

export const Meteors = ({
  number = 20,
  className,
}: {
  number?: number;
  className?: string;
}) => {
  const meteors = new Array(number).fill(true);
  return (
    <>
      {meteors.map((_, idx) => (
        <span
          key={idx}
          className={cn(
            "animate-meteor pointer-events-none absolute left-1/2 top-1/2 h-0.5 w-0.5 rotate-[215deg] rounded-full bg-white/70 shadow-[0_0_0_1px_rgba(255,255,255,0.1)]",
            "before:absolute before:top-1/2 before:h-px before:w-[50px] before:-translate-y-1/2 before:bg-gradient-to-r before:from-white/60 before:to-transparent before:content-['']",
            className
          )}
          style={{
            top: "-40px",
            left: Math.floor(Math.random() * 800 - 400) + "px",
            animationDelay: Math.random() * 5 + "s",
            animationDuration: Math.floor(Math.random() * 8 + 5) + "s",
          }}
        />
      ))}
    </>
  );
};
