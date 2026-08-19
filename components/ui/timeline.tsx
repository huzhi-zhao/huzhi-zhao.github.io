"use client";

// Adapted from Aceternity UI <Timeline />.
// Changes from the registry source: imports framer-motion instead of motion/react,
// the section heading and page background are lifted out to the caller, and the
// vertical rhythm is tightened for a portfolio section rather than a landing page.

import { motion, useScroll, useTransform } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export type TimelineEntry = {
  title: string;
  content: React.ReactNode;
};

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setHeight(el.getBoundingClientRect().height);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div ref={containerRef} className="w-full">
      <div ref={ref} className="relative mx-auto">
        {data.map((item, index) => (
          <div key={index} className="flex justify-start pt-10 md:gap-10 md:pt-20">
            <div className="sticky top-28 z-40 flex max-w-xs flex-col items-center self-start md:w-full md:max-w-[220px] md:flex-row">
              <div className="absolute left-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#141414]">
                <div className="h-4 w-4 rounded-full border border-white/[0.16] bg-elevated" />
              </div>
              <h3 className="hidden font-mono text-[26px] font-medium tracking-[-0.5px] text-faint md:block md:pl-20">
                {item.title}
              </h3>
            </div>

            <div className="relative w-full pl-20 pr-0 md:pl-4">
              <h3 className="mb-4 block text-left font-mono text-lg text-faint md:hidden">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}

        <div
          style={{ height: height + "px" }}
          className="absolute left-8 top-0 w-[2px] overflow-hidden bg-[linear-gradient(to_bottom,transparent_0%,rgba(255,255,255,0.12)_10%,rgba(255,255,255,0.12)_90%,transparent_100%)] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] md:left-8"
        >
          <motion.div
            style={{ height: heightTransform, opacity: opacityTransform }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-t from-accent from-[0%] via-[#2b6cff] via-[12%] to-transparent"
          />
        </div>
      </div>
    </div>
  );
};
