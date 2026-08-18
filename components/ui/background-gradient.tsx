"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  animate?: boolean;
}) => {
  const variants = {
    initial: { backgroundPosition: "0 50%" },
    animate: { backgroundPosition: ["0 50%", "100% 50%", "0 50%"] },
  };

  return (
    <div className={cn("group relative p-[1px]", containerClassName)}>
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={animate ? { duration: 6, repeat: Infinity, repeatType: "reverse" } : undefined}
        style={{ backgroundSize: animate ? "400% 400%" : undefined }}
        className={cn(
          "absolute inset-0 z-[1] rounded-[inherit] opacity-50 blur-xl transition duration-500 will-change-transform group-hover:opacity-80",
          "bg-[radial-gradient(circle_farthest-side_at_0_100%,#1dbf73,transparent),radial-gradient(circle_farthest-side_at_100%_0,#2b6cff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#8b5cf6,transparent)]"
        )}
      />
      <motion.div
        variants={animate ? variants : undefined}
        initial={animate ? "initial" : undefined}
        animate={animate ? "animate" : undefined}
        transition={animate ? { duration: 6, repeat: Infinity, repeatType: "reverse" } : undefined}
        style={{ backgroundSize: animate ? "400% 400%" : undefined }}
        className={cn(
          "absolute inset-0 z-[1] rounded-[inherit] will-change-transform",
          "bg-[radial-gradient(circle_farthest-side_at_0_100%,#1dbf73,transparent),radial-gradient(circle_farthest-side_at_100%_0,#2b6cff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#8b5cf6,transparent)]"
        )}
      />
      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
};
