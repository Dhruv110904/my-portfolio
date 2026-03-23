"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BootSequence() {
  const [lines, setLines] = useState<string[]>([]);
  const [completed, setCompleted] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    
    // Check session storage so we only play boot sequence once per session
    if (sessionStorage.getItem("booted")) {
      setCompleted(true);
      return;
    }

    const sequence = [
      "Booting dhruv.dev...",
      "Loading OSI Stack........... OK",
      "Mounting components......... OK",
      "Establishing routes......... OK",
      "Rendering UI................ OK",
      "Welcome."
    ];
    
    let i = 0;
    const interval = setInterval(() => {
      setLines(prev => [...prev, sequence[i]]);
      i++;
      if (i === sequence.length) {
        clearInterval(interval);
        setTimeout(() => {
          sessionStorage.setItem("booted", "true");
          setCompleted(true);
        }, 800);
      }
    }, 350);
    
    return () => clearInterval(interval);
  }, []);

  if (!mounted || completed) return null;

  return (
    <AnimatePresence>
      {!completed && (
        <motion.div 
          className="fixed inset-0 z-[99999] bg-[#050a0f] text-[#00ff41] font-mono flex flex-col items-start justify-center p-8 md:p-24"
          exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="w-full max-w-3xl mx-auto space-y-4">
            {lines.map((line, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="text-xl md:text-3xl tracking-tight"
              >
                <span className="text-gray-500 mr-4">{`>`}</span>
                {line}
              </motion.div>
            ))}
            <div className="text-xl md:text-3xl flex items-center h-8">
              <span className="text-gray-500 mr-4">{`>`}</span>
              <span className="inline-block w-4 h-8 bg-[#00ff41] animate-blink"></span>
            </div>
          </div>
          
          {/* Faint circuitry in background of loading screen */}
          <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-screen bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] z-[-1]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
