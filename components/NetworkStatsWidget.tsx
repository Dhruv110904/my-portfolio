"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import BandwidthMonitor from "./BandwidthMonitor";

export default function NetworkStatsWidget() {
  const [time, setTime] = useState<string>("");
  const [uptime, setUptime] = useState<string>("99.99");
  const [mounted, setMounted] = useState(false);

  // Initialize clock and uptime
  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      // IST Time formatter
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kolkata",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setTime(formatter.format(new Date()));

      // Uptime fluctuation (99.95 to 99.99)
      if (Math.random() > 0.8) {
        const fakeUptime = (99.95 + Math.random() * 0.04).toFixed(3);
        setUptime(fakeUptime);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="fixed bottom-4 left-4 z-50 pointer-events-none hidden md:block"
    >
      <div className="bg-[#020508]/90 border border-[#00ff41]/40 shadow-[0_0_15px_rgba(0,255,65,0.15)] p-3 w-64 font-mono text-[10px] sm:text-xs text-[#00ff41] flex flex-col space-y-1.5 backdrop-blur-sm relative overflow-hidden">
        {/* Scanline Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_4px] pointer-events-none z-10"></div>
        
        {/* Embedded Canvas Visualizer */}
        <div className="relative z-20 w-full mb-1">
           <BandwidthMonitor />
        </div>

        {/* Header Block */}
        <div className="flex items-center justify-between border-b border-[#00ff41]/30 pb-1 mb-1 z-20">
          <span className="font-bold tracking-widest text-[#00d4ff]">CISCO IOS/v12.4</span>
          <div className="flex space-x-1 ml-4">
            <div className="w-1.5 h-1.5 bg-[#00ff41] rounded-full animate-pulse"></div>
            <div className="w-1.5 h-1.5 bg-[#00ff41] rounded-full animate-[pulse_1.5s_ease-in-out_infinite]"></div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="flex justify-between z-20">
          <span className="text-gray-400">SERVER TIME [IST]:</span>
          <span className="ml-4 tracking-wider">{time || "00:00:00"}</span>
        </div>
        
        <div className="flex justify-between z-20">
          <span className="text-gray-400">NETWORK UPTIME:</span>
          <span className="ml-4 text-[#ff6b35]">{uptime}%</span>
        </div>
      </div>
    </motion.div>
  );
}
