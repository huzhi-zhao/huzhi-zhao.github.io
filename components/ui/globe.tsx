"use client";

import createGlobe from "cobe";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/** Winnipeg, MB */
const MARKERS: { location: [number, number]; size: number }[] = [
  { location: [49.8951, -97.1384], size: 0.11 },
  { location: [30.2741, 120.1551], size: 0.06 },
  { location: [31.2304, 121.4737], size: 0.06 },
];

export const Globe = ({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 4.4;
    let width = 0;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onResize = () => {
      width = canvas.offsetWidth;
    };
    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi,
      theta: 0.25,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 4.2,
      baseColor: [0.26, 0.27, 0.3],
      markerColor: [0.11, 0.75, 0.45],
      glowColor: [0.08, 0.22, 0.16],
      markers: MARKERS,
      onRender: (state: Record<string, any>) => {
        state.phi = phi;
        phi += 0.0035;
        state.width = width * 2;
        state.height = width * 2;
      },
    });

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={cn("aspect-square w-full [contain:layout_paint_size]", className)}
    />
  );
};
