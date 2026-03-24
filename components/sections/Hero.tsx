"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import { Download, ArrowRight } from "lucide-react";
import Typewriter from "typewriter-effect";
import confetti from "canvas-confetti";
import { Parallax } from "react-scroll-parallax";
import dynamic from "next/dynamic";
import Magnetic from "@/components/Magnetic";
import BinaryFloats from "@/components/BinaryFloats";
import { PacketLossLine } from "@/components/PacketLossLine";
import NetworkTopology from "@/components/NetworkTopology";
import AnimatedLaptop from "@/components/AnimatedLaptop";

export default function Hero() {
  const handleDownload = () => {
    // Force file download using anchor trick
    const link = document.createElement("a");
    link.href = "/dj.pdf";
    link.download = "Dhruv_Jain_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#7c3aed', '#06b6d4', '#ffffff']
    });
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden bg-transparent"
    >
      <NetworkTopology />

      {/* Floating Animated Matrix Blobs */}
      <div className="absolute inset-0 z-[-10] overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#00ff41]/10 rounded-full blur-[120px] animate-aurora-1 mix-blend-screen" />
        <div className="absolute top-2/4 right-1/4 w-[600px] h-[600px] bg-[#00d4ff]/10 rounded-full blur-[120px] animate-aurora-2 mix-blend-screen" />
        <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-[#00ff41]/10 rounded-full blur-[120px] animate-aurora-3 mix-blend-screen" />
      </div>

      <BinaryFloats />
      <PacketLossLine />

      <div className="container mx-auto px-4 sm:px-8 lg:px-16 flex flex-col md:flex-row items-center justify-between z-10 relative pointer-events-none mt-8 gap-12 lg:gap-24 max-w-[90rem]">

        {/* Left Column: Text Content & Buttons */}
        <div className="w-full lg:w-3/5 xl:w-[65%] flex flex-col items-center md:items-start text-left order-2 md:order-1 mx-auto md:mx-0">
          <Parallax speed={-5}>
            <div className="mb-6 flex justify-start space-x-2 pointer-events-auto w-full">
              <span className="px-3 py-1 bg-[#050a0f] border border-[#ff6b35]/50 text-[#ff6b35] text-xs font-mono tracking-widest shadow-[0_0_10px_rgba(255,107,53,0.15)] flex items-center">
                <span className="w-2 h-2 rounded-full bg-[#ff6b35] animate-pulse-fast mr-2"></span>
                SYSTEM ACTIVE
              </span>
            </div>

            <div className="w-full h-[400px] md:h-[420px] lg:h-[450px] mb-10 bg-[#050a0f]/80 border border-[#00ff41]/30 p-6 md:p-8 lg:p-10 font-mono text-base md:text-lg lg:text-xl text-[#00ff41] shadow-[0_0_20px_rgba(0,255,65,0.05)] flex flex-col justify-start items-start pointer-events-auto relative overflow-hidden">
              {/* Scanline overlay for raw terminal feel */}
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] pointer-events-none z-10"></div>

              <Typewriter
                options={{
                  delay: 40,
                  deleteSpeed: 0,
                  cursorClassName: "text-[#00ff41] animate-blink inline-block w-3 h-6 ml-1 bg-[#00ff41] -mb-1",
                  wrapperClassName: "text-[#00ff41] text-left break-words w-full z-20 relative font-mono tracking-tight leading-loose md:whitespace-nowrap",
                }}
                onInit={(typewriter) => {
                  typewriter
                    .typeString('> Initializing connection...<br/><br/>')
                    .pauseFor(300)
                    .typeString('> SYN sent<br/>')
                    .pauseFor(200)
                    .typeString('<span style="color:#ff6b35;">> SYN-ACK received</span><br/>')
                    .pauseFor(200)
                    .typeString('> ACK sent<br/>')
                    .pauseFor(300)
                    .typeString('<span style="color:#00d4ff;">> Connection established ✓</span><br/><br/>')
                    .pauseFor(400)
                    .typeString('> Identity: <strong>Dhruv Jain</strong><br/>')
                    .pauseFor(200)
                    .typeString('> Role: Full Stack Developer<br/>')
                    .pauseFor(200)
                    .typeString('> Status: Available for opportunities')
                    .start();
                }}
              />
            </div>
          </Parallax>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-6 w-full pointer-events-auto mt-4"
          >
            <Magnetic>
              <ScrollLink
                to="projects"
                smooth={true}
                duration={500}
                offset={-64}
                className="group relative cursor-pointer flex items-center justify-center px-6 py-3 bg-[#050a0f] border border-[#00ff41]/50 font-mono font-bold overflow-hidden transition-all hover:scale-105 shadow-[0_0_15px_rgba(0,255,65,0.2)] hover:shadow-[0_0_30px_rgba(0,255,65,0.4)] w-full sm:w-auto uppercase text-xs tracking-widest"
              >
                <div className="absolute inset-0 bg-[#00ff41]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 text-[#00ff41] flex items-center">
                  [ INIT_PROJECTS ]
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </ScrollLink>
            </Magnetic>

            <button
              onClick={handleDownload}
              className="group relative cursor-pointer flex items-center justify-center px-6 py-3 bg-[#050a0f] border border-[#00d4ff]/50 font-mono font-bold overflow-hidden transition-all shadow-[0_0_15px_rgba(0,212,255,0.2)] hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] w-full sm:w-auto uppercase text-xs tracking-widest text-[#00d4ff] hover:border-[#00d4ff] active:scale-95"
            >
              <div className="absolute inset-0 bg-[#00d4ff]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center pointer-events-none">
                [ DUMP_RESUME ]
                <Download className="ml-2 w-4 h-4 group-hover:-translate-y-1 transition-transform" />
              </span>
            </button>
          </motion.div>
        </div>

        {/* Right Column: Profile Image */}
        <div className="w-full lg:w-2/5 xl:w-[35%] flex justify-center items-center order-1 md:order-2 relative">
          <Parallax speed={-10}>
            <div className="relative pointer-events-auto">
              <AnimatedLaptop />
            </div>
          </Parallax>
        </div>

      </div>
    </section>
  );
}
