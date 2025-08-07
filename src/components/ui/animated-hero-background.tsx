"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useRef } from "react";

export function AnimatedHeroBackground({
  className,
}: {
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const { clientX, clientY } = e;
      const { offsetWidth, offsetHeight } = ref.current;
      const x = (clientX / offsetWidth) * 100;
      const y = (clientY / offsetHeight) * 100;
      ref.current.style.setProperty("--mouse-x", `${x}%`);
      ref.current.style.setProperty("--mouse-y", `${y}%`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "absolute inset-0 -z-10 h-full w-full bg-white",
        "[mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]",
        "before:absolute before:inset-0 before:z-10 before:h-full before:w-full before:bg-[radial-gradient(at_var(--mouse-x)_var(--mouse-y),hsla(0,100%,50%,0.15)_0,transparent_50%)]",
        "after:absolute after:inset-0 after:z-0 after:h-full after:w-full after:bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] after:bg-[size:2rem_2rem]",
        className
      )}
    />
  );
}
