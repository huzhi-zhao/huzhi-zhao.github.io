"use client";

import { cn } from "@/lib/utils";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import React, { useRef, useState } from "react";

interface NavItem {
  name: string;
  link: string;
}

export const Navbar = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 100);
  });

  return (
    <motion.div
      ref={ref}
      className={cn("fixed inset-x-0 top-0 z-50 w-full", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible }
            )
          : child
      )}
    </motion.div>
  );
};

export const NavBody = ({
  children,
  className,
  visible,
}: {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}) => (
  <motion.div
    animate={{
      backdropFilter: visible ? "blur(14px)" : "blur(10px)",
      boxShadow: visible
        ? "0 0 24px rgba(0,0,0,.28), 0 1px 1px rgba(0,0,0,.12), 0 0 0 1px rgba(255,255,255,.06)"
        : "none",
      width: visible ? "44%" : "100%",
      y: visible ? 14 : 0,
    }}
    transition={{ type: "spring", stiffness: 200, damping: 50 }}
    style={{ minWidth: "800px" }}
    className={cn(
      "relative z-[60] mx-auto hidden w-full max-w-container flex-row items-center justify-between self-start rounded-full bg-[rgba(20,20,20,0.72)] px-6 py-2.5 lg:flex",
      visible && "bg-[rgba(24,24,24,0.85)]",
      className
    )}
  >
    {children}
  </motion.div>
);

export const NavItems = ({
  items,
  className,
  onItemClick,
}: {
  items: NavItem[];
  className?: string;
  onItemClick?: () => void;
}) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "relative hidden flex-1 flex-row items-center justify-center gap-1 text-sm font-medium text-muted transition duration-200 lg:flex",
        className
      )}
    >
      {items.map((item, idx) => (
        <a
          key={`link-${idx}`}
          href={item.link}
          onMouseEnter={() => setHovered(idx)}
          onClick={onItemClick}
          className="relative px-4 py-2 text-muted hover:text-white"
        >
          {hovered === idx && (
            <motion.div
              layoutId="hovered"
              className="absolute inset-0 h-full w-full rounded-full bg-white/[0.07]"
            />
          )}
          <span className="relative z-20">{item.name}</span>
        </a>
      ))}
    </motion.div>
  );
};

export const MobileNav = ({
  children,
  className,
  visible,
}: {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}) => (
  <motion.div
    animate={{
      backdropFilter: visible ? "blur(14px)" : "blur(10px)",
      width: visible ? "92%" : "100%",
      paddingRight: visible ? "12px" : "0px",
      paddingLeft: visible ? "12px" : "0px",
      borderRadius: visible ? 16 : 0,
      y: visible ? 12 : 0,
    }}
    transition={{ type: "spring", stiffness: 200, damping: 50 }}
    className={cn(
      "relative z-50 mx-auto flex w-full flex-col items-center justify-between bg-[rgba(20,20,20,0.85)] px-0 py-2 lg:hidden",
      className
    )}
  >
    {children}
  </motion.div>
);

export const MobileNavHeader = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("flex w-full flex-row items-center justify-between px-5", className)}>
    {children}
  </div>
);

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
}: {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
}) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={cn(
          "absolute inset-x-0 top-14 z-50 flex w-full flex-col items-start gap-1 rounded-b-2xl border-t border-white/10 bg-[rgba(20,20,20,0.97)] px-6 py-6 backdrop-blur-xl",
          className
        )}
      >
        {children}
      </motion.div>
    )}
  </AnimatePresence>
);

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    aria-label="Toggle menu"
    aria-expanded={isOpen}
    className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-[10px] border border-white/[0.16]"
  >
    <span
      className={cn(
        "block h-[1.5px] w-4 bg-white transition-transform duration-300",
        isOpen && "translate-y-[6.5px] rotate-45"
      )}
    />
    <span
      className={cn("block h-[1.5px] w-4 bg-white transition-opacity duration-300", isOpen && "opacity-0")}
    />
    <span
      className={cn(
        "block h-[1.5px] w-4 bg-white transition-transform duration-300",
        isOpen && "-translate-y-[6.5px] -rotate-45"
      )}
    />
  </button>
);
