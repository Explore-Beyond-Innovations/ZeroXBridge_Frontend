"use client";
import { LenisScroll } from "@/lib/lenis";
import { useEffect } from "react";

const ScrollProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const scroll = new LenisScroll();
    function raf(time: number) {
      scroll.lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => scroll.lenis.destroy();
  }, []);
  return <div>{children}</div>;
};

export default ScrollProvider;
