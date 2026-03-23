"use client";
import React, { useEffect, useState } from "react";

const WORDS = ["DHRUV", "HIRE", "DEV", "SYS", "NET", "TCP", "OSI"];

const FloatItem = ({ initialLeft, initialDelay, initialDuration, index }: { initialLeft: string, initialDelay: string, initialDuration: string, index: number }) => {
  const [text, setText] = useState("");

  useEffect(() => {
    const length = Math.floor(6 + (index % 6));
    const genBinary = () => Array.from({ length }).map(() => (Math.random() > 0.5 ? "1" : "0")).join("");
    setText(genBinary());

    const interval = setInterval(() => {
      if (Math.random() > 0.85) {
        setText(WORDS[Math.floor(Math.random() * WORDS.length)]);
        setTimeout(() => {
          setText(genBinary());
        }, 3000); // 3 seconds of text before returning to binary
      } else {
        setText(genBinary());
      }
    }, Math.random() * 5000 + 4000);

    return () => clearInterval(interval);
  }, [index]);

  return (
    <div
      className="absolute bottom-[-10vh] animate-float-up opacity-0"
      style={{
        left: initialLeft,
        animationDelay: initialDelay,
        animationDuration: initialDuration,
        writingMode: "vertical-rl",
        textOrientation: "upright"
      }}
    >
      {text}
    </div>
  );
};

const BinaryFloats = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Generate stable "floats" layout metrics
  const floats = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    left: `${(i * 3.7) % 100}%`,
    delay: `${(i * 0.5) % 15}s`,
    duration: `${10 + (i % 20)}s`,
  }));

  return (
    <div className="absolute inset-0 z-[-5] overflow-hidden pointer-events-none opacity-20 font-mono text-[#00ff41] text-[10px] md:text-sm mix-blend-screen tracking-widest">
      {floats.map((float, index) => (
        <FloatItem 
          key={float.id} 
          index={index} 
          initialLeft={float.left} 
          initialDelay={float.delay} 
          initialDuration={float.duration} 
        />
      ))}
    </div>
  );
};
export default BinaryFloats;
