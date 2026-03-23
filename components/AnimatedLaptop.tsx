"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import Image from "next/image";

// Simple tech SVGs for orbiting icons
const TechIcons = {
  React: () => (
    <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-full h-full text-[#61DAFB]" fill="currentColor">
      <circle cx="0" cy="0" r="2.05" />
      <g stroke="currentColor" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  ),
  Node: () => (
    <svg viewBox="0 0 118 128" className="w-full h-full text-[#339933]" fill="currentColor">
      <path d="M116.321 42.664v42.671l-57.16 32.665-57.16-32.665v-42.67l57.16-32.665z" fill="none" stroke="currentColor" strokeWidth="6"/>
      <path d="M59.16 8.001l-50.16 28.665v57.336l50.16 28.664 50.16-28.664v-57.336z" fill="currentColor"/>
    </svg>
  ),
  Mongo: () => (
    <svg viewBox="0 0 24 24" className="w-full h-full text-[#47A248]" fill="currentColor">
      <path d="M12 2C8.6 6 6 10 6 14c0 3.3 2.7 6 6 6s6-2.7 6-6c0-4-2.6-8-6-12zM12 18c-2.2 0-4-1.8-4-4 0-2.2 1.8-6 4-6 2.2 3.8 4 5.8 4 8 0 2.2-1.8 4-4 4z"/>
    </svg>
  ),
  Docker: () => (
    <svg viewBox="0 0 24 24" className="w-full h-full text-[#2496ED]" fill="currentColor">
      <path d="M22 13.5c0-1.5-1.2-2.5-2.5-2.5h-1c-.5-1-1.5-1.5-2.5-1.5h-9C5.5 9.5 4 11.5 4 13.5H2v1h20v-1h-2zM6 10h2v2H6zm3 0h2v2H9zm3 0h2v2h-2zm3 0h2v2h-2z"/>
      <path d="M4 15h16v3H4z"/>
    </svg>
  )
};

export default function AnimatedLaptop() {
  const [isMobile, setIsMobile] = useState(false);
  const [stage, setStage] = useState(1);
  const [clickMessage, setClickMessage] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [showContextMenu, setShowContextMenu] = useState<{x:number,y:number} | null>(null);

  // Responsive check & Animation timeline
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const bootSequence = () => {
    setStage(1);
    setTimeout(() => setStage(2), 500);
    setTimeout(() => setStage(3), 1800);
    setTimeout(() => setStage(4), 3800);
    setTimeout(() => setStage(5), 4600);
  };

  useEffect(() => {
    if (isMobile) {
      setStage(5);
      return;
    }
    bootSequence();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  // Click handler
  const handleScreenClick = () => {
    if (stage < 4) return;
    setClickMessage("Nice click, recruiter 😄");
    setTimeout(() => setClickMessage(null), 3000);
  };

  // Right click handler
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowContextMenu({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
  };

  return (
    <div className="relative w-[260px] h-[180px] md:w-[480px] md:h-[320px] mx-auto flex items-center justify-center mt-12 md:mt-24 lg:mt-32" style={{ perspective: "1500px" }}>
      
      {/* Level 3: Dark Wooden Desk Surface & Screen Light Cast */}
      <div className="absolute top-[80%] left-1/2 -translate-x-1/2 w-[200%] h-[150%] bg-[#1a0f0f] rounded-[50%] opacity-20 transform -translate-y-1/2 rotateX(75deg) blur-md pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(45deg, #221515 0px, #221515 10px, #1a0f0f 10px, #1a0f0f 20px)" }}></div>
      <div className={`absolute top-[85%] left-1/2 -translate-x-1/2 w-[120%] h-[100%] bg-[radial-gradient(ellipse_at_center,rgba(0,212,255,0.4)_0%,transparent_60%)] rounded-[50%] transform -translate-y-1/2 rotateX(75deg) blur-xl transition-opacity duration-1000 pointer-events-none ${stage >= 4 ? 'opacity-100' : 'opacity-0'}`}></div>

      {/* Radial Glow underneath */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.15)_0%,rgba(0,212,255,0.0)_70%)] blur-2xl transition-all duration-1000 pointer-events-none z-0 ${stage >= 4 ? 'opacity-100 scale-125' : 'opacity-30 scale-75'}`}></div>

      {/* Floating Orbiting Icons (Desktop only, Post-boot) */}
      {!isMobile && stage === 5 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="absolute inset-0 pointer-events-none z-0">
           {/* React Top Right */}
           <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute inset-[-100px] flex items-start justify-end">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-[#050a0f] border border-[#61DAFB]/50 rounded-full p-2 shadow-[0_0_15px_rgba(97,218,251,0.4)] pointer-events-auto group relative cursor-help" style={{ animation: "counter-spin 20s linear infinite" }}>
                <TechIcons.React />
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black text-[#61DAFB] text-[10px] px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity hidden md:block border border-[#61DAFB]/30">React Level: 95%</span>
              </div>
           </motion.div>
           
           {/* Node Top Left */}
           <motion.div animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute inset-[-80px] flex items-start justify-start">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-[#050a0f] border border-[#339933]/50 rounded-full p-2 shadow-[0_0_15px_rgba(51,153,51,0.4)] pointer-events-auto group relative cursor-help" style={{ animation: "spin 25s linear infinite" }}>
                <TechIcons.Node />
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-black text-[#339933] text-[10px] px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity hidden md:block border border-[#339933]/30">Node.js Level: 90%</span>
              </div>
           </motion.div>

           {/* Mongo Bottom Right */}
           <motion.div animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute inset-[-60px] flex items-end justify-end">
              <div className="w-7 h-7 md:w-9 md:h-9 bg-[#050a0f] border border-[#47A248]/50 rounded-full p-2 shadow-[0_0_15px_rgba(71,162,72,0.4)] pointer-events-auto group relative cursor-help" style={{ animation: "counter-spin 15s linear infinite" }}>
                <TechIcons.Mongo />
              </div>
           </motion.div>
           
           {/* Docker Bottom Left */}
           <motion.div animate={{ rotate: -360 }} transition={{ duration: 22, repeat: Infinity, ease: "linear" }} className="absolute inset-[-90px] flex items-end justify-start">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-[#050a0f] border border-[#2496ED]/50 rounded-full p-2 shadow-[0_0_15px_rgba(36,150,237,0.4)] pointer-events-auto group relative cursor-help" style={{ animation: "spin 22s linear infinite" }}>
                <TechIcons.Docker />
              </div>
           </motion.div>
        </motion.div>
      )}

      {/* Core Laptop 3D Assembly Wrapper */}
      <motion.div 
        className="w-full h-full relative z-10 group"
        style={{ transformStyle: "preserve-3d" }}
        initial={{ scale: 0.8 }}
        animate={
          stage === 5 
            ? { scale: isMobile ? 0.8 : 1, y: [0, -10, 0] } 
            : { scale: 1 }
        }
        transition={
          stage === 5 
            ? { y: { duration: 4, repeat: Infinity, ease: "easeInOut" }, scale: { duration: 0.5 } }
            : { duration: 0.5 }
        }
      >
         {/* Isometric Viewer Angle */}
         <div className="absolute inset-0" style={{ transformStyle: "preserve-3d", transform: "rotateX(20deg) rotateY(-25deg)" }}>
            
           {/* Level 3: Floating Sticky Note (Snippet) */}
           {!isMobile && (
             <motion.div animate={{ y: [0, -10, 0], rotate: [0, 2, -2, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute -left-12 top-0 w-32 bg-[#ffeb3b]/20 backdrop-blur-sm border border-[#ffeb3b]/50 p-2 text-[6px] text-[#ffeb3b] font-mono shadow-[0_0_15px_rgba(255,235,59,0.2)]" style={{ transform: "rotateY(-20deg) rotateZ(-10deg)" }}>
               <div className="border-b border-[#ffeb3b]/30 pb-1 mb-1 font-bold">// profile.js</div>
               <div>const dhruv = {'{'}</div>
               <div className="pl-2">role: 'Developer',</div>
               <div className="pl-2">available: true</div>
               <div>{'}'}</div>
             </motion.div>
           )}

            {/* The Keyboard Base */}
            <div 
               className="absolute top-1/2 left-[15%] right-[15%] h-[85%] bg-[#13151a] rounded-xl border border-gray-700 shadow-2xl transition-all duration-300 group-hover:shadow-[0_20px_50px_rgba(0,212,255,0.15)]"
               style={{ transformOrigin: "top center", transform: "rotateX(75deg)", transformStyle: "preserve-3d" }}
               onMouseEnter={() => setIsTyping(true)}
               onMouseLeave={() => setIsTyping(false)}
            >
               {/* Level 3: Phone showing GitHub */}
               {!isMobile && (
                 <div className="absolute -left-14 bottom-10 w-16 h-28 bg-[#0d1117] rounded-lg border-2 border-gray-600 shadow-2xl transform rotate-12 -translate-z-4 overflow-hidden flex flex-col items-center pt-2">
                   <div className="w-4 h-4 rounded-full bg-gray-800 mb-2"></div>
                   <div className="w-10 h-2 bg-gray-700 rounded mb-1"></div>
                   <div className="w-12 h-1 bg-[#238636] rounded"></div>
                   <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/10 pointer-events-none"></div>
                 </div>
               )}

               {/* Level 3: Rubber Duck Debugger & Coffee */}
               {!isMobile && (
                 <div className="absolute -right-16 top-0 w-12 h-16 transform -rotate-12 translate-z-10 flex flex-col items-center">
                    {/* Tiny Coffee Cup */}
                    <div className="w-8 h-10 bg-[#e0e0e0] rounded-b-lg border-t-2 border-[#fff] shadow-xl relative mt-4">
                       <span className="absolute -right-2 top-2 w-3 h-5 border-2 border-[#e0e0e0] rounded-full"></span>
                       {/* Steam */}
                       <div className="absolute -top-4 left-1 w-1 h-3 bg-white/40 blur-[1px] rounded-full animate-[pulse_2s_infinite]"></div>
                       <div className="absolute -top-6 right-2 w-1.5 h-4 bg-white/40 blur-[1px] rounded-full animate-[pulse_3s_infinite]"></div>
                    </div>
                 </div>
               )}

               {/* 3D Box Front Lip + Ventilation */}
               <div className="absolute top-full left-0 w-full h-4 bg-gray-800 rounded-b-xl flex items-center justify-center space-x-2" style={{ transformOrigin: "top", transform: "rotateX(-90deg)" }}>
                  {/* Ventilation Grille */}
                  <div className="w-[30%] h-1.5 border border-gray-900 rounded-full bg-black/80 flex justify-evenly items-center shadow-inner">
                     <span className="w-px h-full bg-gray-800"></span><span className="w-px h-full bg-gray-800"></span><span className="w-px h-full bg-gray-800"></span><span className="w-px h-full bg-gray-800"></span>
                  </div>
               </div>
               <div className="absolute top-full left-0 w-full h-4 bg-gray-900 rounded-b-xl opacity-50 shadow-2xl" style={{ transformOrigin: "top", transform: "rotateX(-90deg) translateZ(-1px)" }}></div>
               
               {/* Charging Cable (Level 2) */}
               <div className="absolute top-10 -left-1 w-3 h-5 bg-gray-700 rounded-l shadow-lg border border-gray-600 flex items-center justify-center">
                  <div className="w-1 h-3 bg-[#ffb000] rounded-full animate-pulse shadow-[0_0_5px_#ffb000]"></div>
                  {/* Wire */}
                  <div className="absolute right-full w-20 h-1 bg-gray-800 border-b border-gray-900" style={{ transform: "rotateZ(15deg) translateY(-5px)", transformOrigin: "right" }}></div>
               </div>

               {/* Keyboard Surface (Level 2 Enhancements) */}
               <div className="absolute top-8 left-4 right-4 bottom-24 bg-[#0a0b0d] rounded grid grid-cols-1 p-2 border border-gray-800 shadow-[inset_0_2px_10px_rgba(0,0,0,1)] relative overflow-hidden">
                  {/* Backlight wave pattern */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 animate-[shimmer_3s_infinite] pointer-events-none"></div>
                  
                  {/* Key grid overlay */}
                  <div className={`absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_2px,transparent_2px),linear-gradient(90deg,rgba(255,255,255,0.05)_2px,transparent_2px)] bg-[size:10px_10px] opacity-40 transition-all duration-500 ${isTyping ? 'opacity-80 scale-[1.02]' : ''}`}></div>
                  
                  {/* WASD & Enter Key Highlight */}
                  <div className="absolute left-[15%] top-[40%] w-8 h-6 bg-[#00d4ff]/20 blur-[2px] rounded animate-pulse"></div>
                  <div className="absolute right-[5%] top-[50%] w-12 h-6 bg-[#a855f7]/20 blur-[2px] rounded animate-pulse"></div>
               </div>
               
               {/* Trackpad with Fingerprint */}
               <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-1/3 h-16 bg-gray-800 rounded-md shadow-[inset_0_2px_5px_rgba(0,0,0,0.5)] border-t border-gray-900 border-b border-gray-700 transition-colors group-hover:border-t-[#00ff41]/30 flex items-center justify-center overflow-hidden">
                  <div className="w-6 h-6 rounded-full border border-gray-700/50 opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(circle_at_center,rgba(0,255,65,0.1)_0%,transparent_50%)]"></div>
               </div>
               
               <div className="absolute -top-3 left-[15%] right-[15%] h-5 bg-gray-900 rounded-full shadow-xl flex justify-center items-center">
                  {/* Tiny logo on chassis */}
                  <span className="text-[4px] text-gray-700 font-sans tracking-widest opacity-50">DHRUV.DEV</span>
               </div>
            </div>

            {/* The Screen Lid */}
            <motion.div 
               className="absolute bottom-1/2 left-[15%] right-[15%] h-[85%] bg-[#05090f] rounded-xl border-[4px] border-[#13151a] shadow-[0_0_25px_rgba(0,212,255,0.1)] overflow-hidden flex flex-col items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_40px_rgba(0,212,255,0.3)] group-hover:border-[#1a1c22] cursor-pointer"
               style={{ transformOrigin: "bottom center", backfaceVisibility: "hidden", transformStyle: "preserve-3d" }}
               initial={{ rotateX: 75 }}
               animate={{ rotateX: stage >= 2 ? -5 : 75 }}
               transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
               onDoubleClick={bootSequence}
               onClick={handleScreenClick}
               onContextMenu={handleContextMenu}
            >
               {/* 3D Back of Lid (Glowing Monogram Level 2) */}
               <div className="absolute inset-0 bg-[#0d1017] rounded-lg border border-gray-800 flex items-center justify-center opacity-0 transform rotateY-180 backface-hidden" style={{ transform: "rotateX(180deg) translateZ(1px)" }}>
                 <div className="font-mono text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 opacity-60 animate-pulse shadow-[0_0_15px_rgba(0,212,255,0.5)]">DJ</div>
               </div>

               {/* Inner Display */}
               <div className="w-full h-full bg-[#030508] relative overflow-hidden border border-gray-900">
                  
                  {/* Boot Sequence */}
                  {stage >= 3 && (
                    <div className={`absolute inset-0 transition-opacity duration-300 ${stage === 3 ? 'opacity-100' : 'opacity-0'} font-mono text-[8px] md:text-[10px] text-[#00ff41] p-3 text-left bg-black`}>
                      {stage === 3 && (
                        <Typewriter
                           options={{ delay: 20, cursor: "█", cursorClassName: "text-[#00ff41] animate-pulse" }}
                           onInit={(tw) => {
                             tw.typeString("> Booting DhruvOS_v2.1<br/>> Scanning hardware...<br/>")
                               .pauseFor(150)
                               .typeString("> Injecting styles.css...<br/>")
                               .pauseFor(100)
                               .typeString("> <b>ACCESS GRANTED</b> ✓<br/>")
                               .start();
                           }}
                        />
                      )}
                    </div>
                  )}

                  {/* Profile Reveal */}
                  {stage >= 4 && (
                     <motion.div 
                     initial={{ opacity: 0 }} 
                     animate={{ opacity: 1 }}
                     transition={{ duration: 0.5 }}
                     className="absolute inset-0 bg-black group/screen"
                   >
                     {clickMessage ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#050a0f] text-[#00ff41] font-mono text-center z-30 p-4">
                           <div className="w-full h-full absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,212,255,0.2)_0%,transparent_70%)] animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)]" />
                           <span className="relative z-10 text-xl">🌊</span>
                           <span className="relative z-10 mt-4 font-bold text-sm leading-relaxed">{clickMessage}</span>
                        </div>
                     ) : (
                       <Image 
                         src="/profile.jpg" 
                         alt="Dhruv Jain" 
                         fill 
                         className="object-cover transition-transform duration-[2000ms] group-hover/screen:scale-105" 
                         onError={(e) => {
                           const target = e.target as HTMLImageElement;
                           target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2300ff41'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' /%3E%3C/svg%3E";
                         }}
                       />
                     )}
                     
                     {/* Top OS Bar Overlay */}
                     <div className="absolute top-0 w-full h-5 bg-[#050a0f]/80 backdrop-blur-md flex justify-between items-center px-3 text-[6px] md:text-[8px] text-gray-300 border-b border-gray-800 pointer-events-none z-20">
                        <span className="font-mono tracking-widest text-opacity-50">DHRUV.DEV // ADMIN</span>
                        <span className="text-[#00ff41] flex items-center"><div className="w-1.5 h-1.5 bg-[#00ff41] rounded-full mr-1 animate-pulse"></div> SYS_READY</span>
                     </div>
                     
                     {/* Screen Scanline overlay */}
                     <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.15)_50%)] bg-[length:100%_4px] pointer-events-none z-10"></div>
                     
                     {/* Matrix Glitch Overlay on Hover (Level 4 status changes) */}
                     <div className="absolute inset-0 bg-[#00d4ff]/10 mix-blend-overlay opacity-0 group-hover/screen:opacity-100 transition-opacity pointer-events-none z-10"></div>
                     <div className="absolute inset-0 border-[2px] border-transparent group-hover/screen:border-[#00ff41]/50 transition-colors pointer-events-none shadow-[inset_0_0_20px_rgba(0,255,65,0.2)] z-10"></div>

                     {/* Right Click Context Menu */}
                     {showContextMenu && (
                        <div 
                          className="absolute bg-[#050a0f] border border-gray-700 shadow-2xl p-1 z-40 w-32 font-mono text-[7px]" 
                          style={{ left: Math.min(showContextMenu.x, 200), top: Math.min(showContextMenu.y, 150) }}
                          onMouseLeave={() => setShowContextMenu(null)}
                        >
                           <div className="px-2 py-1 hover:bg-[#00ff41]/20 cursor-pointer text-gray-300 hover:text-white">&gt; View Profile</div>
                           <div className="px-2 py-1 hover:bg-[#00d4ff]/20 cursor-pointer text-gray-300 hover:text-white">&gt; Download Resume</div>
                           <div className="px-2 py-1 hover:bg-[#ff6b35]/20 cursor-pointer text-gray-300 hover:text-white border-b border-gray-800">&gt; Send Message</div>
                           <div className="px-2 py-1 hover:bg-red-500/20 cursor-pointer text-red-400">&gt; Restart DhruvOS</div>
                        </div>
                     )}

                     {/* Recruiter popup / Typing mode text */}
                     <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-[#020508]/90 backdrop-blur-md border border-[#00ff41] px-3 py-1.5 shadow-[0_0_15px_rgba(0,255,65,0.4)] text-[#00ff41] text-[6px] md:text-[8px] font-mono font-bold opacity-0 group-hover/screen:opacity-100 transition-all translate-y-3 group-hover/screen:translate-y-0 duration-300 flex items-center whitespace-nowrap z-20">
                        {isTyping ? (
                           <>
                             <span className="text-gray-400 mr-2 font-light">Typing...</span>
                             <span className="w-1.5 h-3 bg-[#00ff41] animate-pulse"></span>
                           </>
                        ) : (
                           <>
                              <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse mr-2 shadow-[0_0_5px_#ff0000]"></span>
                              ● Now accepting opportunities!
                           </>
                        )}
                     </div>
                   </motion.div>
                  )}

                  {/* Anti-Glare reflection layer */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-50 pointer-events-none transform -skew-x-12"></div>
               </div>
               
               <div className="absolute bottom-0.5 w-full flex justify-center opacity-40">
                  <span className="text-[5px] text-gray-400 tracking-widest font-mono">DHRUV.DEV</span>
               </div>
            </motion.div>
         </div>
      </motion.div>

      <style>{`
        @keyframes spin { 100% { transform: rotate(360deg); } }
        @keyframes counter-spin { 100% { transform: rotate(-360deg); } }
      `}</style>
    </div>
  );
}
