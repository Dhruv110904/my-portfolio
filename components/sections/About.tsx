"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { personalData } from "@/lib/data";
import SectionHeading from "@/components/SectionHeading";
import CountUp from "react-countup";
import { Activity, Server, Cpu, Database } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-[#050a0f]">
      <div className="container mx-auto px-4 z-10 relative">
        <SectionHeading title="System Architecture" subtitle="Presentation Layer (L6) - Profile Data Dump" />

        <div className="mt-16 max-w-5xl mx-auto">
          {/* Bio Content as Terminal Block */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full flex flex-col lg:flex-row gap-6"
          >
            {/* Left Column: System Profile Log (Bio) */}
            <div className="w-full lg:w-2/3 bg-[#050a0f] border border-[#00ff41]/30 p-6 md:p-8 relative overflow-hidden group shadow-[0_0_30px_rgba(0,255,65,0.05)] font-mono text-[#00ff41]">
               {/* Scanlines Background */}
               <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.15)_50%)] bg-[length:100%_4px] pointer-events-none z-10"></div>
               {/* Faint Hex memory dump on right side (Deterministic to fix Hydration) */}
               <div className="absolute right-0 top-0 bottom-0 w-32 border-l border-gray-800/50 hidden md:flex flex-col text-[8px] text-gray-800 overflow-hidden leading-tight p-2 font-mono whitespace-pre select-none pointer-events-none opacity-40">
                 {Array(30).fill(0).map((_,i) => `0x${(1000+i*8).toString(16).toUpperCase()} ${((i * 2654435761) >>> 0).toString(16).padStart(8, '0').toUpperCase()}`).join('\n')}
               </div>

               <div className="flex items-center justify-between mb-4 border-b border-[#00ff41]/20 pb-4 relative z-20">
                 <div className="flex items-center">
                   <div className="h-3 w-3 bg-[#ff6b35] mr-3 animate-pulse"></div>
                   <h3 className="text-[#00d4ff] font-bold tracking-widest uppercase">/var/log/sys_profile.log</h3>
                 </div>
                 <div className="text-gray-500 text-[10px]">READ_ONLY_MODE</div>
               </div>
               
              <div className="text-xs md:text-sm leading-relaxed text-gray-300 relative z-20 space-y-3 pr-0 md:pr-36">
                 {personalData.bio.split('. ').map((sentence, idx) => (
                   sentence.trim() && (
                     <div key={idx} className="flex flex-col sm:flex-row group/line hover:bg-[#00ff41]/5 p-1 -mx-1 rounded transition-colors">
                       <span className="text-gray-600 sm:w-28 flex-shrink-0 select-none hidden sm:inline-block">
                         [{String(10 + (idx * 2) % 24).padStart(2, '0')}:{String((14 + idx * 7) % 60).padStart(2, '0')}:{String((23 + idx * 13) % 60).padStart(2, '0')}]
                       </span>
                       <span className="text-[#00ff41] mr-2 hidden sm:inline-block">&gt;</span>
                       <span className="text-gray-300 group-hover/line:text-white transition-colors">{sentence.trim()}{sentence.endsWith('.') ? '' : '.'}</span>
                     </div>
                   )
                 ))}
              </div>
            </div>
            
            {/* Right Column: Hardware Metrics (Server Racks) */}
            <div className="w-full lg:w-1/3 flex flex-col gap-4 font-mono">
              
              {/* Metric 1 */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-[#111] border border-gray-700 p-4 shadow-[inset_0_0_30px_rgba(0,0,0,0.8)] relative group overflow-hidden flex items-center h-[100px]"
              >
                {/* Rack Mounting Bracket */}
                <div className="absolute left-0 top-0 bottom-0 w-6 bg-[#090909] border-r border-gray-800 flex flex-col items-center justify-between py-2 shadow-2xl">
                  <div className="w-2 h-2 rounded-full border border-gray-600 bg-gray-800 shadow-inner"></div>
                  <div className="flex flex-col space-y-2">
                    <div className="w-1.5 h-1.5 bg-[#00ff41] rounded-full animate-pulse shadow-[0_0_5px_#00ff41]"></div>
                    <div className="w-1.5 h-1.5 bg-gray-600 rounded-full"></div>
                  </div>
                  <div className="w-2 h-2 rounded-full border border-gray-600 bg-gray-800 shadow-inner"></div>
                </div>

                <div className="ml-8 flex-1 relative z-10 flex justify-between items-center">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-gray-500 flex items-center mb-1">
                      <Cpu size={12} className="mr-2 text-gray-400" /> [ METRIC: CGPA ]
                    </div>
                    <h4 className="font-black text-3xl text-[#00d4ff]">
                      <CountUp end={8.33} decimals={2} duration={2.5} enableScrollSpy scrollSpyOnce />
                    </h4>
                  </div>
                  <div className="w-10 h-10 border border-[#00d4ff]/30 rounded-full flex items-center justify-center opacity-20 group-hover:opacity-100 group-hover:rotate-180 transition-all duration-700">
                    <Activity size={20} className="text-[#00d4ff]" />
                  </div>
                </div>
              </motion.div>

              {/* Metric 2 */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-[#111] border border-gray-700 p-4 shadow-[inset_0_0_30px_rgba(0,0,0,0.8)] relative group overflow-hidden flex items-center h-[100px]"
              >
                <div className="absolute left-0 top-0 bottom-0 w-6 bg-[#090909] border-r border-gray-800 flex flex-col items-center justify-between py-2 shadow-2xl">
                  <div className="w-2 h-2 rounded-full border border-gray-600 bg-gray-800 shadow-inner"></div>
                  <div className="flex flex-col space-y-2">
                    <div className="w-1.5 h-1.5 bg-[#ff6b35] rounded-full animate-ping shadow-[0_0_5px_#ff6b35]"></div>
                    <div className="w-1.5 h-1.5 bg-gray-600 rounded-full"></div>
                  </div>
                  <div className="w-2 h-2 rounded-full border border-gray-600 bg-gray-800 shadow-inner"></div>
                </div>

                <div className="ml-8 flex-1 relative z-10 flex justify-between items-center">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-gray-500 flex items-center mb-1">
                      <Database size={12} className="mr-2 text-gray-400" /> [ PROJECT_COUNT ]
                    </div>
                    <h4 className="font-black text-3xl text-[#ff6b35]">
                      <CountUp end={3} duration={3} enableScrollSpy scrollSpyOnce suffix="+" />
                    </h4>
                  </div>
                  <div className="w-10 h-10 rounded-sm border border-[#ff6b35]/20 flex flex-col justify-between p-1 opacity-50 group-hover:opacity-100 transition-opacity">
                      <div className="w-full h-[6px] bg-[#ff6b35] animate-pulse"></div>
                      <div className="w-full h-[6px] bg-[#ff6b35]/40"></div>
                      <div className="w-full h-[6px] bg-[#ff6b35] animate-[pulse_1.5s_infinite]"></div>
                  </div>
                </div>
              </motion.div>

              {/* Metric 3 */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-[#111] border border-gray-700 p-4 shadow-[inset_0_0_30px_rgba(0,0,0,0.8)] relative group overflow-hidden flex items-center h-[100px]"
              >
                <div className="absolute left-0 top-0 bottom-0 w-6 bg-[#090909] border-r border-gray-800 flex flex-col items-center justify-between py-2 shadow-2xl">
                  <div className="w-2 h-2 rounded-full border border-gray-600 bg-gray-800 shadow-inner"></div>
                  <div className="flex flex-col space-y-2">
                    <div className="w-1.5 h-1.5 bg-[#00ff41] rounded-full brightness-150 shadow-[0_0_10px_#00ff41]"></div>
                    <div className="w-1.5 h-1.5 bg-[#00ff41] rounded-full shadow-[0_0_5px_#00ff41]"></div>
                  </div>
                  <div className="w-2 h-2 rounded-full border border-gray-600 bg-gray-800 shadow-inner"></div>
                </div>

                <div className="ml-8 flex-1 relative z-10 flex flex-col justify-center">
                   <div className="text-[10px] uppercase tracking-widest text-gray-500 flex items-center mb-1">
                     <Server size={12} className="mr-2 text-gray-400" /> [ NODE_FOCUS ]
                   </div>
                   <h4 className="font-black text-2xl text-[#00ff41] tracking-wider relative group-hover:text-white transition-colors">
                     FULL_STACK
                     <span className="absolute -right-4 top-1 w-2 h-2 bg-[#00ff41] opacity-0 group-hover:opacity-100 animate-ping rounded-full"></span>
                   </h4>
                </div>
              </motion.div>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
