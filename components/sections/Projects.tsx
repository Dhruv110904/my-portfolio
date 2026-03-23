"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projectsData } from "@/lib/data";
import SectionHeading from "@/components/SectionHeading";
import { Github, ExternalLink, Send, Activity } from "lucide-react";
import Tilt from "react-parallax-tilt";

type CapturedPacket = {
  id: number;
  time: string;
  source: string;
  destination: string;
  protocol: string;
  length: number;
  info: string;
};

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const [capturedPackets, setCapturedPackets] = useState<CapturedPacket[]>([]);
  const [activePacket, setActivePacket] = useState<typeof projectsData[0] | null>(null);
  const [buildPhase, setBuildPhase] = useState(0);

  const filters = useMemo(() => {
    const techs = projectsData.flatMap((p) => p.techStack);
    const uniqueTechs = Array.from(new Set(techs));
    return ["All", ...uniqueTechs.slice(0, 5)]; 
  }, []);

  const filteredProjects = projectsData.filter((project) => 
    filter === "All" ? true : project.techStack.includes(filter)
  );

  const handleTransmit = (project: typeof projectsData[0]) => {
    setActivePacket(project);
    setBuildPhase(0);
    
    // Animation sequence
    setTimeout(() => setBuildPhase(1), 800);  // Header
    setTimeout(() => setBuildPhase(2), 1600); // Payload
    setTimeout(() => setBuildPhase(3), 2400); // Checksum
    setTimeout(() => setBuildPhase(4), 3200); // Travel
    
    setTimeout(() => {
      // Complete and log to Wireshark
      const newPacket: CapturedPacket = {
        id: capturedPackets.length + 1,
        time: (Math.random() * 10).toFixed(6),
        source: "192.168.1.100",
        destination: "dhruv.dev",
        protocol: "HTTP/1.1",
        length: Math.floor(Math.random() * 1000 + 500),
        info: `POST /transmit - ${project.title}`
      };
      setCapturedPackets(prev => [...prev, newPacket]);
      setActivePacket(null);
    }, 4000);
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 z-10 relative">
        <SectionHeading
          title="Endpoint Registry"
          subtitle="Intercepted payloads and real-world system deployments."
        />

        {/* Filter System */}
        <div className="flex flex-wrap justify-center gap-3 mt-10 mb-12 uppercase">
          {filters.map((tech) => (
            <button
              key={tech}
              onClick={() => setFilter(tech)}
              className={`px-4 py-1 text-sm font-mono font-medium transition-all duration-300 border ${
                filter === tech 
                  ? "bg-[#00ff41]/20 border-[#00ff41] text-[#00ff41] shadow-[0_0_15px_rgba(0,255,65,0.4)]" 
                  : "bg-[#050a0f] border-[#00d4ff]/30 text-[#00d4ff]/70 hover:text-[#00d4ff] hover:border-[#00d4ff]"
              }`}
            >
              [ PORT: {tech} ]
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const routeName = project.title.split("—")[0].trim().toLowerCase().replace(/\s+/g, '-');
              
              return (
                <motion.div
                  layout
                  key={project.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, type: "spring", bounce: 0.4 }}
                  className="h-full flex"
                >
                  <Tilt
                    tiltMaxAngleX={2}
                    tiltMaxAngleY={2}
                    scale={1.01}
                    transitionSpeed={2000}
                    className="relative group w-full flex flex-col bg-[#050a0f]"
                  >
                    {/* Inline custom style for SVG border tracking */}
                    <style>{`
                      @keyframes packetTrack {
                        0% { stroke-dashoffset: 3500; }
                        100% { stroke-dashoffset: 0; }
                      }
                      .animate-packet-track {
                        animation: packetTrack 4s linear infinite;
                      }
                    `}</style>
                    
                    <div className="relative h-full p-6 text-[#00ff41] font-mono flex flex-col z-10 border border-[#00ff41]/20 group-hover:border-[#00ff41]/80 transition-all cursor-crosshair shadow-none group-hover:shadow-[0_0_25px_rgba(0,255,65,0.15)] bg-[#050a0f]/80 overflow-hidden">
                      
                      {/* Animated Border Packet SVG */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0">
                         <rect width="100%" height="100%" fill="none" stroke="#ff6b35" strokeWidth="4" strokeDasharray="50, 3500" className="animate-packet-track" />
                      </svg>

                      {/* Header */}
                      <div className="flex flex-col border-b border-[#00ff41]/30 pb-3 mb-5 relative z-10">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xl font-bold text-[#00ff41] truncate mr-2">
                             <span className="text-[#00d4ff] mr-2 text-sm tracking-widest">REQUEST</span> 
                             GET /{routeName}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">HTTP/1.1</span>
                      </div>
                      
                      {/* Body Data */}
                      <div className="space-y-5 flex-grow relative z-10">
                        <div className="flex flex-col">
                          <span className="text-[#00d4ff] text-[10px] tracking-widest font-bold mb-1">STATUS</span>
                          <span className="text-sm">200 OK <span className="text-[#ff6b35] animate-pulse">●</span></span>
                        </div>

                        <div className="flex flex-col">
                          <span className="text-[#00d4ff] text-[10px] tracking-widest font-bold mb-1">PAYLOAD</span>
                          <span className="text-sm text-gray-400 leading-relaxed font-sans">{project.description}</span>
                        </div>

                        <div className="flex flex-col">
                          <span className="text-[#00d4ff] text-[10px] tracking-widest font-bold mb-1">STACK</span>
                          <span className="text-sm text-[#ff6b35] break-words">{project.techStack.join(" • ")}</span>
                        </div>
                      </div>

                      {/* Footer Actions */}
                      <div className="mt-6 pt-4 border-t border-[#00ff41]/30 flex space-x-6 z-20 relative">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-xs text-white hover:text-[#00d4ff] transition-colors"
                          >
                            <Github size={14} className="mr-1.5" />
                            [ SOURCE ]
                          </a>
                        )}
                        {project.liveUrl !== "" ? (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-xs text-white hover:text-[#ff6b35] transition-colors"
                          >
                            <ExternalLink size={14} className="mr-1.5" />
                            [ EXECUTE ]
                          </a>
                        ) : (
                          <span className="flex items-center text-xs text-gray-600 cursor-not-allowed">
                            [ NO_EXECUTE ]
                          </span>
                        )}
                        <button
                          onClick={() => handleTransmit(project)}
                          className="flex items-center text-xs text-white hover:text-[#00ff41] transition-colors ml-auto group/transmit"
                        >
                          <Send size={14} className="mr-1.5 group-hover/transmit:translate-x-1 transition-transform" />
                          [ TRANSMIT ]
                        </button>
                      </div>
                    </div>
                  </Tilt>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
        
        {filteredProjects.length === 0 && (
          <div className="text-center text-gray-500 font-mono mt-10">
            &gt; 404 NO ENDPOINTS FOUND FOR {filter}
          </div>
        )}

        {/* Wireshark Style Packet Capture Log */}
        {capturedPackets.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-20 border border-[#00d4ff]/30 shadow-[0_0_20px_rgba(0,212,255,0.1)] bg-[#050a0f] overflow-hidden"
          >
            <div className="bg-[#00d4ff]/20 px-4 py-2 flex items-center border-b border-[#00d4ff]/30">
              <Activity size={16} className="text-[#00d4ff] mr-2 animate-pulse" />
              <span className="text-xs font-mono font-bold text-[#00d4ff] tracking-widest uppercase">Wireshark (dhruv.dev capture)</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-[11px] whitespace-nowrap">
                <thead className="bg-[#111822] text-gray-400 border-b border-[#00d4ff]/20">
                  <tr>
                    <th className="py-1.5 px-3 border-r border-[#00d4ff]/10">No.</th>
                    <th className="py-1.5 px-3 border-r border-[#00d4ff]/10">Time</th>
                    <th className="py-1.5 px-3 border-r border-[#00d4ff]/10">Source</th>
                    <th className="py-1.5 px-3 border-r border-[#00d4ff]/10">Destination</th>
                    <th className="py-1.5 px-3 border-r border-[#00d4ff]/10">Protocol</th>
                    <th className="py-1.5 px-3 border-r border-[#00d4ff]/10">Length</th>
                    <th className="py-1.5 px-3">Info</th>
                  </tr>
                </thead>
                <tbody>
                  {capturedPackets.map((pkt, i) => (
                    <motion.tr 
                      initial={{ opacity: 0, backgroundColor: "#00ff41" }}
                      animate={{ opacity: 1, backgroundColor: i % 2 === 0 ? "#050a0f" : "#081018" }}
                      transition={{ duration: 0.5 }}
                      key={pkt.id} 
                      className="text-gray-300 hover:bg-[#00d4ff]/10 cursor-pointer"
                    >
                      <td className="py-1 px-3 border-r border-[#00d4ff]/10 text-gray-500">{pkt.id}</td>
                      <td className="py-1 px-3 border-r border-[#00d4ff]/10">{pkt.time}</td>
                      <td className="py-1 px-3 border-r border-[#00d4ff]/10">{pkt.source}</td>
                      <td className="py-1 px-3 border-r border-[#00d4ff]/10">{pkt.destination}</td>
                      <td className="py-1 px-3 border-r border-[#00d4ff]/10 text-[#00ff41]">{pkt.protocol}</td>
                      <td className="py-1 px-3 border-r border-[#00d4ff]/10">{pkt.length}</td>
                      <td className="py-1 px-3 text-[#00d4ff]">{pkt.info}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>

      {/* Interactive Packet Assembly Modal */}
      <AnimatePresence>
        {activePacket && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-4 bg-[#050a0f]/90 backdrop-blur-sm pointer-events-none"
          >
            <motion.div 
              animate={buildPhase === 4 ? { y: 1000, scale: 0.2, opacity: 0 } : { y: 0, scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="w-full max-w-md bg-[#020508] border border-[#ff6b35] shadow-[0_0_40px_rgba(255,107,53,0.3)] p-6 font-mono text-sm relative"
            >
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.2)_50%)] bg-[length:100%_4px] pointer-events-none"></div>

              <div className="border-b border-[#ff6b35]/30 pb-2 mb-4">
                <span className="text-[#ff6b35] font-bold tracking-widest animate-pulse">ASSEMBLING PACKET...</span>
              </div>

              <div className="space-y-4">
                {/* Header Phase */}
                <div className={`transition-all duration-300 ${buildPhase >= 1 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                  <div className="text-[10px] text-gray-500 mb-1">[ HEADER ]</div>
                  <div className="bg-[#050a0f] p-2 border left-2 border-[#00ff41]/50 text-[#00ff41]">
                    SRC: 192.168.1.100 <br/>
                    DST: dhruv.dev <br/>
                    APP: {activePacket.title}
                  </div>
                </div>

                {/* Payload Phase */}
                <div className={`transition-all duration-300 ${buildPhase >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                  <div className="text-[10px] text-gray-500 mb-1">[ PAYLOAD ]</div>
                  <div className="bg-[#050a0f] p-2 border left-2 border-[#00d4ff]/50 text-[#00d4ff] text-xs">
                    {activePacket.description.substring(0, 80)}...
                  </div>
                </div>

                {/* Checksum Phase */}
                 {(() => {
                   const checksum = Array.from(activePacket.techStack.join(""))
                     .map((c) => c.charCodeAt(0).toString(16))
                     .join("")
                     .substring(0, 16)
                     .toUpperCase();
                   return (
                     <div className={`transition-all duration-300 ${buildPhase >= 3 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                       <div className="text-[10px] text-gray-500 mb-1">[ CHECKSUM &amp; TRAILER ]</div>
                       <div className="bg-[#050a0f] p-2 border border-yellow-500/50 text-yellow-500 font-bold truncate">
                         0x{checksum}...
                       </div>
                     </div>
                   );
                 })()}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
