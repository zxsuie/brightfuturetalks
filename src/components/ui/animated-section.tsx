"use client";

import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function AnimatedSection({
  children,
  className,
  as: Component = "section",
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  [key: string]: any;
}) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (ref.current) {
            observer.unobserve(ref.current);
          }
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <Component
      ref={ref}
      className={cn(
        "transition-all duration-1000 ease-out",
        inView ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-4 blur-sm",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
