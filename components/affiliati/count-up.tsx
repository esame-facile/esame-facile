"use client";

import { useEffect, useRef } from "react";
import { animate } from "framer-motion";

interface CountUpProps {
  value: number;
  prefix?: string;
}

export function CountUp({ value, prefix = "€" }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate(v) {
        node.textContent = `${prefix}${Math.round(v)}`;
      },
    });
    return () => controls.stop();
  }, [value, prefix]);

  return <span ref={ref}>{prefix}0</span>;
}
