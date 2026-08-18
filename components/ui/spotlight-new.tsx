"use client";

import React from "react";
import { motion } from "framer-motion";

type SpotlightProps = {
  gradientFirst?: string;
  gradientSecond?: string;
  gradientThird?: string;
  translateY?: number;
  width?: number;
  height?: number;
  smallWidth?: number;
  duration?: number;
  xOffset?: number;
  /** Which side(s) the beams come from. Defaults to both, like upstream. */
  side?: "left" | "right" | "both";
};

/**
 * Animated spotlight. Defaults keep the site's green accent (#1dbf73)
 * at roughly the same opacity as the static spotlight it replaces.
 */
export const SpotlightNew = ({
  gradientFirst = "radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(152, 74%, 45%, .15) 0, hsla(152, 74%, 40%, .06) 50%, hsla(152, 74%, 35%, 0) 80%)",
  gradientSecond = "radial-gradient(50% 50% at 50% 50%, hsla(152, 74%, 45%, .10) 0, hsla(152, 74%, 40%, .04) 80%, transparent 100%)",
  gradientThird = "radial-gradient(50% 50% at 50% 50%, hsla(152, 74%, 45%, .06) 0, hsla(152, 74%, 35%, .03) 80%, transparent 100%)",
  translateY = -350,
  width = 560,
  height = 1380,
  smallWidth = 240,
  duration = 7,
  xOffset = 100,
  side = "both",
}: SpotlightProps = {}) => (
  <div className="pointer-events-none absolute inset-0 h-full w-full overflow-hidden">
    {side !== "right" && (
    <motion.div
      animate={{ x: [0, xOffset, 0] }}
      transition={{ duration, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      className="pointer-events-none absolute left-0 top-0 h-screen w-screen"
    >
      <div
        style={{
          transform: `translateY(${translateY}px) rotate(-45deg)`,
          background: gradientFirst,
          width: `${width}px`,
          height: `${height}px`,
        }}
        className="absolute left-0 top-0"
      />
      <div
        style={{
          transform: "rotate(-45deg) translate(5%, -50%)",
          background: gradientSecond,
          width: `${smallWidth}px`,
          height: `${height}px`,
        }}
        className="absolute left-0 top-0 origin-top-left"
      />
      <div
        style={{
          transform: "rotate(-45deg) translate(-180%, -70%)",
          background: gradientThird,
          width: `${smallWidth}px`,
          height: `${height}px`,
        }}
        className="absolute left-0 top-0 origin-top-left"
      />
    </motion.div>
    )}

    {side !== "left" && (
    <motion.div
      animate={{ x: [0, -xOffset, 0] }}
      transition={{ duration, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      className="pointer-events-none absolute right-0 top-0 h-screen w-screen"
    >
      <div
        style={{
          transform: `translateY(${translateY}px) rotate(45deg)`,
          background: gradientFirst,
          width: `${width}px`,
          height: `${height}px`,
        }}
        className="absolute right-0 top-0"
      />
      <div
        style={{
          transform: "rotate(45deg) translate(-5%, -50%)",
          background: gradientSecond,
          width: `${smallWidth}px`,
          height: `${height}px`,
        }}
        className="absolute right-0 top-0 origin-top-right"
      />
      <div
        style={{
          transform: "rotate(45deg) translate(180%, -70%)",
          background: gradientThird,
          width: `${smallWidth}px`,
          height: `${height}px`,
        }}
        className="absolute right-0 top-0 origin-top-right"
      />
    </motion.div>
    )}
  </div>
);
