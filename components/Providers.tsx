"use client";

import { ParallaxProvider } from "react-scroll-parallax";
import CustomCursor from "@/components/CustomCursor";
import { useEffect, useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <ParallaxProvider>
      {mounted && <CustomCursor />}
      {children}
    </ParallaxProvider>
  );
}
