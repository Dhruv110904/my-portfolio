"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NODES = [
  { id: "client", label: "CLIENT", desc: "Origin Request Node", x: 10, y: 50 },
  { id: "dns", label: "DNS", desc: "Domain Name Resolution", x: 25, y: 20 },
  { id: "cdn", label: "CDN", desc: "Edge Caching & Delivery", x: 25, y: 80 },
  { id: "lb", label: "LOAD BALANCER", desc: "Traffic Distribution", x: 45, y: 50 },
  { id: "auth", label: "AUTH", desc: "JWT Verification Layer", x: 60, y: 20 },
  { id: "api", label: "API SERVER", desc: "Core Logic Gateway", x: 60, y: 50 },
  { id: "cache", label: "CACHE", desc: "Redis In-Memory Store", x: 60, y: 80 },
  { id: "db", label: "DATABASE", desc: "PostgreSQL Master", x: 80, y: 25 },
  { id: "dhruv", label: "DHRUV.DEV", desc: "Primary Application Instance", x: 85, y: 65, main: true },
];

const EDGES = [
  ["client", "dns"],
  ["client", "cdn"],
  ["client", "lb"],
  ["dns", "lb"],
  ["cdn", "lb"],
  ["lb", "auth"],
  ["lb", "api"],
  ["auth", "api"],
  ["api", "cache"],
  ["api", "db"],
  ["api", "dhruv"],
  ["cache", "dhruv"],
  ["db", "dhruv"]
];

type Packet = {
  id: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
};

export default function NetworkTopology() {
  const [packets, setPackets] = useState<Packet[]>([]);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const handleNodeClick = (nodeId: string) => {
    // Find neighbors
    const neighbors = EDGES.filter(e => e[0] === nodeId || e[1] === nodeId)
                           .map(e => e[0] === nodeId ? e[1] : e[0]);
    
    // Spawn packets to neighbors
    const newPackets = neighbors.map(neighborId => {
       const startNode = NODES.find(n => n.id === nodeId)!;
       const endNode = NODES.find(n => n.id === neighborId)!;
       return {
         id: Math.random().toString(36).substr(2, 9),
         startX: startNode.x,
         startY: startNode.y,
         endX: endNode.x,
         endY: endNode.y,
       };
    });

    setPackets(prev => [...prev, ...newPackets]);

    // Cleanup packets
    setTimeout(() => {
      setPackets(prev => prev.filter(p => !newPackets.some(np => np.id === p.id)));
    }, 1000); 
  };

  return (
    <div className="absolute inset-0 z-0 pointer-events-auto overflow-hidden opacity-60">
       <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {EDGES.map((edge, i) => {
            const start = NODES.find(n => n.id === edge[0])!;
            const end = NODES.find(n => n.id === edge[1])!;
            return (
              <line 
                key={i} 
                x1={`${start.x}%`} y1={`${start.y}%`} 
                x2={`${end.x}%`} y2={`${end.y}%`} 
                stroke="#00d4ff" 
                strokeWidth="1" 
                strokeOpacity="0.2" 
                strokeDasharray="4 4"
                className="animate-[pulse_4s_ease-in-out_infinite]"
              />
            );
          })}
          
          <AnimatePresence>
            {packets.map(p => (
              <motion.circle
                key={p.id}
                r="3"
                fill="#ff6b35"
                initial={{ cx: `${p.startX}%`, cy: `${p.startY}%`, opacity: 1 }}
                animate={{ cx: `${p.endX}%`, cy: `${p.endY}%`, opacity: 0 }}
                transition={{ duration: 1, ease: "linear" }}
                style={{ filter: "drop-shadow(0 0 8px #ff6b35)" }}
              />
            ))}
          </AnimatePresence>
       </svg>

       {NODES.map(node => (
         <div 
           key={node.id}
           className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center cursor-pointer group"
           style={{ left: `${node.x}%`, top: `${node.y}%` }}
           onMouseEnter={() => setHoveredNode(node.id)}
           onMouseLeave={() => setHoveredNode(null)}
           onClick={() => handleNodeClick(node.id)}
         >
           {/* Node Visual */}
           <div className={`rounded-full transition-all duration-300 relative ${node.main ? 'bg-[#00ff41] shadow-[0_0_25px_#00ff41] w-5 h-5 animate-pulse' : 'bg-[#00d4ff] shadow-[0_0_15px_rgba(0,212,255,0.4)] w-3 h-3 group-hover:bg-[#ff6b35] group-hover:shadow-[0_0_20px_#ff6b35] group-hover:scale-125'}`}>
             {node.main && <div className="absolute inset-0 rounded-full border border-[#00ff41] animate-[ping_2s_linear_infinite] opacity-50" />}
           </div>
           
           <span className={`mt-2 font-mono text-[10px] whitespace-nowrap tracking-wider transition-colors bg-[#050a0f]/50 px-1 rounded ${node.main ? 'text-[#00ff41] font-bold text-[12px]' : 'text-[#00d4ff] group-hover:text-[#ff6b35]'}`}>
              {node.label}
           </span>

           {/* Hover Tooltip */}
           <AnimatePresence>
             {hoveredNode === node.id && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute top-10 text-[10px] md:text-xs font-mono bg-[#020508] border border-[#ff6b35] text-gray-300 px-3 py-2 z-50 whitespace-nowrap shadow-[0_0_15px_rgba(255,107,53,0.3)] pointer-events-none"
                >
                  <span className="text-[#ff6b35] mr-2">&gt;</span>{node.desc}
                </motion.div>
             )}
           </AnimatePresence>
         </div>
       ))}
    </div>
  );
}
