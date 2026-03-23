"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const PacketLossLine = () => {
  const [packetState, setPacketState] = useState<"traveling" | "lost" | "retransmitting">("traveling");
  const [position, setPosition] = useState(0);

  useEffect(() => {
    let animationFrame: number;
    let lastTime = performance.now();
    let currentPos = position;

    const animate = (time: number) => {
      if (packetState !== "traveling") return;

      const deltaTime = time - lastTime;
      lastTime = time;

      // Packet speed: 10% of screen per second
      currentPos += (deltaTime / 1000) * 10;
      
      // Randomly drop packet
      if (currentPos > 20 && currentPos < 80 && Math.random() < 0.003) {
        setPacketState("lost");
        setPosition(currentPos);
        
        setTimeout(() => {
          setPacketState("retransmitting");
          setTimeout(() => {
            currentPos = 0;
            setPosition(0);
            setPacketState("traveling");
          }, 1500); 
        }, 1500); 
        return;
      }

      if (currentPos >= 100) {
        currentPos = 0; // Wrap around
      }
      
      setPosition(currentPos);
      animationFrame = requestAnimationFrame(animate);
    };

    if (packetState === "traveling") {
      lastTime = performance.now();
      animationFrame = requestAnimationFrame(animate);
    }

    return () => cancelAnimationFrame(animationFrame);
  }, [packetState, position]);

  return (
    <div className="absolute top-[65%] left-0 w-full h-px bg-[#00ff41]/5 z-0 pointer-events-none hidden md:block">
      <div 
        className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center"
        style={{ left: `${position}%` }}
      >
        <div className={`w-2 h-2 rounded-full shadow-[0_0_10px_currentColor] transition-colors ${packetState === "lost" ? "bg-red-500 text-red-500 animate-pulse" : packetState === "retransmitting" ? "bg-[#ff6b35] text-[#ff6b35]" : "bg-[#00d4ff] text-[#00d4ff]"}`}></div>
        
        <AnimatePresence>
          {packetState === "lost" && (
             <motion.div 
               initial={{ opacity: 0, y: -5 }} 
               animate={{ opacity: 1, y: -25 }} 
               exit={{ opacity: 0 }}
               className="absolute top-0 text-[10px] font-mono font-bold text-red-500 bg-black/80 px-2 py-1 border border-red-500/50 whitespace-nowrap shadow-[0_0_15px_rgba(239,68,68,0.3)] z-50"
             >
               [ PACKET LOST ]
             </motion.div>
          )}
          {packetState === "retransmitting" && (
             <motion.div 
               initial={{ opacity: 0, y: -5 }} 
               animate={{ opacity: 1, y: -25 }} 
               exit={{ opacity: 0 }}
               className="absolute top-0 text-[10px] font-mono font-bold text-[#ff6b35] bg-black/80 px-2 py-1 border border-[#ff6b35]/50 whitespace-nowrap shadow-[0_0_15px_rgba(255,107,53,0.3)] z-50"
             >
               [ RETRANSMITTING... ]
             </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
