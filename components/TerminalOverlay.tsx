"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const COMMANDS = [
  "whoami", "skills", "projects", "ping dhruv", "traceroute", 
  "ssh dhruv", "help", "clear", "cat resume", "nmap"
];

export default function TerminalOverlay() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<{ type: "input" | "output", text: string }[]>([
    { type: "output", text: "Connection established to dhruv.dev" },
    { type: "output", text: "Type 'help' to see available network commands." }
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Ctrl + D to toggle
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleTabComplete = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const match = COMMANDS.find((cmd) => cmd.startsWith(input.toLowerCase()));
      if (match) {
        setInput(match);
      }
    }
  };

  const executeCommand = (cmd: string) => {
    if (!cmd.trim()) return;
    
    const newHistory = [...history, { type: "input" as const, text: `guest@dhruv.dev:~$ ${cmd}` }];
    setHistory(newHistory);
    
    let outputText = "";
    
    switch (cmd.toLowerCase().trim()) {
      case "help":
        outputText = `Available commands:\n  ${COMMANDS.join('\n  ')}`;
        break;
      case "whoami":
        outputText = `Dhruv Jain\nFull Stack Developer\nA passionate architect building scalable network systems & beautiful UIs.`;
        break;
      case "skills":
        outputText = `Reading package lists... Done\nBuilding dependency tree... Done\n\nThe following packages are installed:\n- react@latest\n- nextjs@14\n- typescript@5.x\n- tailwindcss\n- nodejs (engine)\n- postgresql-client\n- docker-daemon\n\nAll systems running smoothly without bottlenecks.`;
        break;
      case "projects":
        outputText = `drwxr-xr-x 2 dhruv staff 4096 ./portfolio\ndrwxr-xr-x 3 dhruv staff 4096 ./network-scanner\ndrwxr-xr-x 5 dhruv staff 4096 ./cloud-automation\ndrwxr-xr-x 2 dhruv staff 4096 ./api-gateway\n\nType 'cat <project>' for details (WIP).`;
        break;
      case "ping dhruv":
        outputText = `PING dhruv.dev (192.168.1.1): 56 data bytes\n64 bytes from him: icmp_seq=0 ttl=64 time=0.012 ms ☕\n64 bytes from him: icmp_seq=1 ttl=64 time=0.015 ms 🔥\n64 bytes from him: icmp_seq=2 ttl=64 time=0.009 ms 🚀\n\n--- dhruv.dev ping statistics ---\n3 packets transmitted, 3 packets received, 0.0% packet loss`;
        break;
      case "traceroute":
        outputText = `traceroute to dhruv.dev (192.168.1.1), 30 hops max, 60 byte packets\n 1  gateway (10.0.0.1)  1.234 ms  1.123 ms\n 2  isp.local (10.12.34.5)  12.456 ms  12.345 ms\n 3  cloud.server (203.0.113.1)  25.678 ms  26.789 ms\n 4  dhruv.dev (192.168.1.1) [* AVAILABLE FOR HIRE *]  32.123 ms`;
        break;
      case "ssh dhruv":
        outputText = `Authenticating public key...\nConnection established.\nAccess granted. Welcome recruiter!`;
        break;
      case "clear":
        setHistory([]);
        return; // Early return
      case "cat resume":
        outputText = `[RESUME DUMP]\nNAME: Dhruv Jain\nROLE: Full Stack Developer\nCAPABILITIES: React, Next.js, Node.js, Systems Architecture\nLOCATION: Remote / Hybrid\n\nPlease use the GUI [ DUMP_RESUME ] button for the full PDF byte stream.`;
        break;
      case "nmap":
        outputText = `Starting Nmap 7.92 ( https://nmap.org )\nNmap scan report for dhruv.dev (192.168.1.1)\nHost is up (0.012s latency).\n\nPORT     STATE SERVICE\n22/tcp   open  ssh\n80/tcp   open  http\n443/tcp  open  https\n3000/tcp open  react-dev-server\n\nNmap done: 1 IP address (1 host up) scanned in 0.42 seconds`;
        break;
      default:
        outputText = `bash: ${cmd}: command not found\nType 'help' for available commands.`;
    }

    setTimeout(() => {
      setHistory(prev => [...prev, { type: "output", text: outputText }]);
    }, 200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input;
    setInput("");
    executeCommand(cmd);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-[#020508]/80 backdrop-blur-md"
        >
          <div className="w-full max-w-4xl h-[70vh] bg-[#050a0f] border border-[#00ff41]/50 shadow-[0_0_50px_rgba(0,255,65,0.15)] flex flex-col overflow-hidden font-mono text-sm relative">
            {/* Scanlines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] pointer-events-none z-10"></div>
            
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#020508] border-b border-[#00ff41]/30 shrink-0 z-20">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80 cursor-pointer hover:bg-red-400" onClick={() => setIsOpen(false)} />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="text-[#00ff41] text-xs tracking-widest uppercase font-bold">network_cli@dhruv.dev</span>
              <button onClick={() => setIsOpen(false)} className="text-[#00ff41]/50 hover:text-[#00ff41] transition-colors">
                <X size={16} />
              </button>
            </div>
            
            {/* Terminal Body */}
            <div className="flex-1 p-6 overflow-y-auto space-y-3 pointer-events-auto custom-scrollbar z-20" onClick={() => inputRef.current?.focus()}>
              {history.map((line, i) => (
                <div key={i} className={`${line.type === "input" ? "text-[#00d4ff] font-bold" : "text-[#00ff41]"} whitespace-pre-wrap leading-relaxed`}>
                  {line.text}
                </div>
              ))}
              
              {/* Active Input Line */}
              <form onSubmit={handleSubmit} className="flex pt-2">
                <span className="text-[#00d4ff] mr-2 shrink-0 font-bold">guest@dhruv.dev:~$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleTabComplete}
                  className="flex-1 bg-transparent border-none outline-none text-[#00ff41] caret-[#ff6b35]"
                  autoFocus
                  autoComplete="off"
                  spellCheck="false"
                />
              </form>
              <div ref={terminalEndRef}></div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
