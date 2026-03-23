"use client";

import { useState, useEffect } from "react";
import { Link as ScrollLink } from "react-scroll";
import { Menu, X, Github } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const navLinks = [
  { name: "L7: Application", tooltip: "Home", to: "hero" },
  { name: "L6: Presentation", tooltip: "About", to: "about" },
  { name: "L5: Session", tooltip: "Skills", to: "skills" },
  { name: "L4: Transport", tooltip: "Projects", to: "projects" },
  { name: "L3: Network", tooltip: "Experience", to: "experience" },
  { name: "L2: Data Link", tooltip: "Contact", to: "contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [ping, setPing] = useState(12);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Ping latency simulation
    const interval = setInterval(() => {
      if (Math.random() > 0.85) {
        setPing(Math.floor(Math.random() * 20) + 40); // Spike to 40-60ms
      } else {
        setPing(Math.floor(Math.random() * 4) + 10); // Normal 10-13ms
      }
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#050a0f]/90 backdrop-blur-md border-b border-[#00ff41]/20 shadow-[0_4px_30px_rgba(0,255,65,0.05)] py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between">
        <div className="text-2xl font-black tracking-tighter mix-blend-screen flex items-center">
          <ScrollLink to="hero" smooth={true} duration={500} className="cursor-pointer flex items-center pr-4 md:border-r border-[#00ff41]/30">
            Dhruv<span className="text-[#00ff41]">.</span><span className="text-[#00d4ff] text-lg font-mono tracking-normal ml-1">dev</span>
          </ScrollLink>
          <div className="ml-4 hidden md:flex flex-col justify-center">
            <span className="text-[10px] text-[#00d4ff] font-mono tracking-widest uppercase mb-0.5">LATENCY</span>
            <span className={`text-xs font-mono font-bold transition-colors ${ping > 30 ? "text-[#ff6b35]" : "text-[#00ff41]"}`}>{ping}ms</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6">
            <ul className="flex space-x-2">
              {navLinks.map((link) => (
                <li key={link.name} className="relative group">
                  <ScrollLink
                    to={link.to}
                    smooth={true}
                    duration={500}
                    offset={-100}
                    spy={true}
                    activeClass="text-[#00ff41] bg-[#00ff41]/10 border-[#00ff41]/50 shadow-[0_0_15px_rgba(0,255,65,0.2)]"
                    className="cursor-pointer px-4 py-2 rounded-none text-sm font-mono text-gray-400 hover:text-[#00ff41] hover:bg-[#00ff41]/5 border border-transparent transition-all block"
                  >
                    {link.name}
                  </ScrollLink>
                  {/* Semantic Tooltip */}
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-[#050a0f] border border-[#00ff41]/30 text-[#00ff41] text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 font-mono">
                    [{link.tooltip}]
                  </span>
                </li>
              ))}
            </ul>
            <div className="h-6 w-px bg-[#00ff41]/20" />
            <ThemeToggle />
            <a
              href="https://github.com/Dhruv110904"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center w-10 h-10 bg-[#050a0f] border border-[#00ff41]/20 hover:border-[#00d4ff]/50 hover:bg-[#00ff41]/10 transition-all shadow-sm hover:shadow-[0_0_15px_rgba(0,212,255,0.4)]"
              aria-label="GitHub Profile"
            >
              <Github size={18} className="text-[#00ff41] group-hover:text-[#00d4ff] transition-colors" />
            </a>
          </div>

        {/* Mobile Nav Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-[#00ff41] hover:text-[#00d4ff] transition-colors"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#050a0f]/95 backdrop-blur-xl border-b border-[#00ff41]/20 shadow-2xl py-6 px-4">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <ScrollLink
                key={link.name}
                to={link.to}
                smooth={true}
                duration={500}
                spy={true}
                offset={-64}
                onClick={() => setIsOpen(false)}
                className="text-lg font-mono text-[#00ff41]/70 hover:text-[#00ff41] hover:bg-[#00ff41]/10 px-4 py-3 border-l-2 border-transparent hover:border-[#00ff41] cursor-pointer"
              >
                {link.name} <span className="text-xs text-gray-500 ml-2">[{link.tooltip}]</span>
              </ScrollLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
