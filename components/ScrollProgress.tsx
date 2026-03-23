"use client";

import { motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      setPercent(Math.round(latest * 100));
    });
  }, [scrollYProgress]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-[#00ff41] origin-left z-[100] shadow-[0_0_10px_rgba(0,255,65,0.8)] mix-blend-screen"
        style={{ scaleX: scrollYProgress }}
      />
      <div className="fixed top-3 right-4 text-[10px] sm:text-xs font-mono text-[#00ff41] z-[100] pointer-events-none drop-shadow-[0_0_5px_rgba(0,255,65,0.8)] opacity-80 mix-blend-screen">
        Bandwidth Used: <span className="text-[#00d4ff]">0% &rarr; {percent}%</span>
      </div>
    </>
  );
}
