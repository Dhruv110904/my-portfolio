"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springX = useSpring(cursorX, { stiffness: 700, damping: 30 });
  const springY = useSpring(cursorY, { stiffness: 700, damping: 30 });

  useEffect(() => {
    // Hide default cursor globally
    document.body.style.cursor = "none";

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    
    const checkHover = () => {
      return window.matchMedia("(hover: hover)").matches;
    };

    if (checkHover()) {
       window.addEventListener("mousemove", moveCursor);
       
       const handleMouseOver = (e: MouseEvent) => {
         const target = e.target as HTMLElement;
         const isClickable = 
           target.tagName.toLowerCase() === 'a' ||
           target.tagName.toLowerCase() === 'button' ||
           target.tagName.toLowerCase() === 'input' ||
           target.tagName.toLowerCase() === 'textarea' ||
           target.closest('a') ||
           target.closest('button') ||
           target.classList.contains('cursor-pointer');
         
         setIsHovered(!!isClickable);
       };
       window.addEventListener("mouseover", handleMouseOver);
       
       return () => {
         window.removeEventListener("mousemove", moveCursor);
         window.removeEventListener("mouseover", handleMouseOver);
         document.body.style.cursor = "auto";
       };
    } else {
      document.body.style.cursor = "auto";
    }
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] hidden md:flex items-center justify-center text-[#00ff41]"
      style={{
        x: springX,
        y: springY,
      }}
    >
      <svg className="w-full h-full drop-shadow-[0_0_8px_rgba(0,255,65,0.8)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        {isHovered ? (
          <motion.path 
             key="packet"
             initial={{ opacity: 0, scale: 0.5, rotate: -45 }} 
             animate={{ opacity: 1, scale: 1.2, rotate: 0 }} 
             transition={{ type: "spring", stiffness: 400, damping: 25 }}
             d="M12 2L2 22l10-4 10 4L12 2z" // Arrow/Packet shape
             fill="rgba(0,255,65,0.2)"
          />
        ) : (
          <motion.g 
             key="node"
             initial={{ opacity: 0, rotate: 90 }} 
             animate={{ opacity: 1, rotate: 0 }}
             transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
             <circle cx="12" cy="12" r="3" fill="#00ff41" />
             <path d="M12 2v6M12 16v6M2 12h6M16 12h6" strokeLinecap="round" />
          </motion.g>
        )}
      </svg>
    </motion.div>
  );
}
