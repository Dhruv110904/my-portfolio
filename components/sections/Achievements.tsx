"use client";

import { motion } from "framer-motion";
import { achievementsData } from "@/lib/data";
import SectionHeading from "@/components/SectionHeading";
import { ExternalLink } from "lucide-react";

export default function Achievements() {
  return (
    <section id="achievements" className="py-24 relative">
      <div className="container mx-auto px-4 z-10 relative">
        <SectionHeading
          title="Community & Open Source"
          subtitle="Building beyond the IDE"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto">
          {achievementsData.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title + index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card rounded-3xl p-8 flex flex-col items-start relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500 border border-white/5 hover:border-white/20"
              >
                {/* Background ambient glow */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-[50px] pointer-events-none group-hover:bg-purple-500/20 transition-colors duration-500" />

                <div className="flex items-center justify-between w-full mb-8 relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors shadow-inner">
                    <Icon size={24} className="text-white" />
                  </div>
                  <span className="text-xs font-mono uppercase tracking-widest px-3 py-1 bg-white/5 border border-white/10 text-gray-300 rounded-full">
                    {item.category}
                  </span>
                </div>

                <div className="relative z-10 flex-grow w-full">
                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{item.title}</h3>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>

                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex mt-auto relative z-10 items-center text-sm font-medium text-purple-400 hover:text-cyan-400 transition-colors group/link"
                  >
                    Explore
                    <ExternalLink size={14} className="ml-2 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                  </a>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
