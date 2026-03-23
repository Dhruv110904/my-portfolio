"use client";

import { motion } from "framer-motion";
import { certificationsData } from "@/lib/data";
import SectionHeading from "@/components/SectionHeading";

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 relative overflow-hidden bg-white/[0.01]">
      <div className="container mx-auto px-4 z-10 relative">
        <SectionHeading title="Licenses & Certifications" subtitle="Validated expertise and continuous learning" />

        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8 mt-16">
          {certificationsData.map((cert, index) => {
            const Icon = cert.icon;
            return (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-6 rounded-3xl flex flex-row items-center gap-6 group hover:bg-white/[0.04] transition-colors border border-white/10 hover:border-cyan-500/30 overflow-hidden relative"
              >
                <div className="absolute right-0 top-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-[40px] group-hover:bg-cyan-500/10 transition-colors" />
                
                <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.15)] group-hover:scale-110 transition-transform duration-300">
                  <Icon size={30} className="text-cyan-400" />
                </div>
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">{cert.title}</h3>
                  <div className="flex items-center text-sm text-gray-400 font-mono mt-2">
                    <span className="text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-sm">{cert.issuer}</span>
                    <span className="mx-3 border-l border-white/20 h-4"></span>
                    <span>{cert.date}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
