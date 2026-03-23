"use client";

import { motion } from "framer-motion";
import { experienceData } from "@/lib/data";
import SectionHeading from "@/components/SectionHeading";

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 z-10 relative">
        <SectionHeading title="Traceroute Log" subtitle="Career nodes and network hops over time" />

        <div className="max-w-4xl mx-auto mt-16 relative">
          <div className="bg-[#050a0f] border border-[#00ff41]/30 p-6 md:p-10 shadow-[0_0_30px_rgba(0,255,65,0.05)] font-mono text-sm md:text-base text-[#00ff41] relative overflow-hidden">
            {/* Scanline overlay for raw terminal feel */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] pointer-events-none z-10"></div>
            
            <div className="relative z-20 space-y-12">
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                $ traceroute --resolve dhruv.dev/experience
                <br/>
                <span className="text-gray-500">traceroute to dhruv.dev/experience (192.168.1.1), 30 hops max, 60 byte packets</span>
              </motion.div>

              {experienceData.map((exp, index) => {
                // Synthetically split the description to form network hops
                const rawHops = exp.description.split(",").map(h => h.trim().replace(/^and /i, ""));
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="space-y-2 border-l-2 border-[#ff6b35] pl-4 md:pl-6 py-2 ml-2 md:ml-4"
                  >
                    <div className="text-xs text-[#00d4ff] tracking-widest mb-3 font-bold uppercase">[{exp.title}]</div>
                    
                    <div className="flex">
                      <span className="w-20 md:w-24 text-gray-500 shrink-0">TRACE</span>
                      <span className="text-white font-bold truncate">{exp.company} Server</span>
                    </div>
                    
                    <div className="flex">
                      <span className="w-20 md:w-24 text-gray-500 shrink-0">PING</span>
                      <span className="text-[#00ff41]">{exp.date.replace("–", "→").replace("-", "→")}</span>
                    </div>
                    
                    <div className="pt-3 pb-3 space-y-1">
                       {rawHops.map((hop, hIdx) => (
                         <div key={hIdx} className="flex text-xs md:text-sm items-center">
                           <span className="w-20 md:w-24 text-[#ff6b35] shrink-0">HOP {hIdx + 1}</span>
                           <span className="flex-1 flex items-center min-w-0">
                             <span className="truncate pr-2">{hop.charAt(0).toUpperCase() + hop.slice(1)}</span>
                             <span className="flex-1 border-b-[2px] border-dotted border-[#00ff41]/30 hidden sm:block"></span>
                           </span>
                           <span className="text-[#00d4ff] ml-2 font-bold shrink-0">OK</span>
                         </div>
                       ))}
                    </div>
                    
                    <div className="flex pt-1">
                      <span className="w-20 md:w-24 text-gray-500 shrink-0">RTT</span>
                      <span className="text-[#00ff41]">Response: <span className="font-bold text-white">Optimized ✓</span></span>
                    </div>
                  </motion.div>
                );
              })}
              
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="pt-4">
                Trace complete.
                <span className="animate-blink inline-block w-2.5 h-4 md:h-5 bg-[#00ff41] ml-2 mt-1 md:mt-0 align-middle"></span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
