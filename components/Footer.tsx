"use client";
import { Github, Linkedin, Mail } from "lucide-react";
import { personalData } from "@/lib/data";
import { useState, useEffect } from "react";

export default function Footer() {
  const [uptime, setUptime] = useState("00h 00m 00s");
  const [packets, setPackets] = useState(1337000);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    // Session uptime simulation
    const startTime = Date.now();
    const interval = setInterval(() => {
      const diff = Math.floor((Date.now() - startTime) / 1000);
      const h = Math.floor(diff / 3600).toString().padStart(2, '0');
      const m = Math.floor((diff % 3600) / 60).toString().padStart(2, '0');
      const s = (diff % 60).toString().padStart(2, '0');
      setUptime(`${h}h ${m}m ${s}s`);
      setPackets(prev => prev + Math.floor(Math.random() * 40) + 15);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-[#020508] border-t border-[#00ff41]/20 py-12 relative overflow-hidden font-mono text-sm">
      <div className="container mx-auto px-4 flex flex-col items-center justify-center text-[#00ff41] z-10 relative">
        
        <div className="flex flex-col items-start space-y-2 mb-8 bg-[#050a0f] p-6 border border-[#ff6b35]/30 shadow-[0_0_15px_rgba(255,107,53,0.1)] w-full max-w-md relative overflow-hidden">
           {/* Scanline overlay */}
           <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] pointer-events-none z-10"></div>
           
           <div className="relative z-20 w-full">
             <div className="text-[#00d4ff] mb-2 font-bold flex">
               <span className="mr-2">&gt;</span> Initiating termination sequence...
             </div>
             <div className="flex"><span className="w-6">&gt;</span> FIN sent</div>
             <div className="flex"><span className="w-6">&gt;</span> FIN-ACK received</div>
             <div className="flex"><span className="w-6">&gt;</span> ACK sent</div>
             
             <div className="text-[#ff6b35] font-bold mt-4 flex items-center">
               <span className="w-6">&gt;</span> CONNECTION TERMINATED.
               <span className="animate-blink inline-block w-2 h-4 bg-[#ff6b35] ml-2"></span>
             </div>
             
             <div className="mt-8 flex justify-between items-end border-t border-[#ff6b35]/20 pt-4 w-full">
               <div className="flex flex-col">
                 <span className="text-gray-500 text-xs">SESSION_UPTIME: <span className="text-white">{uptime}</span></span>
                 <span className="text-gray-500 text-xs mt-1">PACKETS_DELIVERED: <span className="text-white">{mounted ? packets.toLocaleString() : "1,337,000"}</span></span>
               </div>
               <span className="text-gray-600 text-[10px]">&copy; {mounted ? new Date().getFullYear() : "2024"} {personalData.name}</span>
             </div>
           </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6 mt-4">
          <a
            href={personalData.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-[#00ff41] transition-colors flex items-center group text-xs md:text-sm font-bold"
          >
            <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">[</span>
            <Github size={18} className="mr-2" />
            <span className="tracking-widest">GITHUB</span>
            <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">]</span>
          </a>
          <a
            href={personalData.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-[#00d4ff] transition-colors flex items-center group text-xs md:text-sm font-bold"
          >
            <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">[</span>
            <Linkedin size={18} className="mr-2" />
            <span className="tracking-widest">LINKEDIN</span>
            <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">]</span>
          </a>
          <a
            href={`mailto:${personalData.contact.email}`}
            className="text-gray-500 hover:text-[#ff6b35] transition-colors flex items-center group text-xs md:text-sm font-bold"
          >
            <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">[</span>
            <Mail size={18} className="mr-2" />
            <span className="tracking-widest">MAIL</span>
            <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">]</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
