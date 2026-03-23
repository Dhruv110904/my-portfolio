"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";

// ─── REPLACE THESE WITH YOUR ACTUAL EMAILJS CREDENTIALS ───
const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "YOUR_SERVICE_ID";
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "YOUR_TEMPLATE_ID";
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "YOUR_PUBLIC_KEY";
// ──────────────────────────────────────────────────────────

const TRANSMISSION_STEPS = [
  { id: 1, text: "Initializing TCP handshake...", delay: 0, color: "#00d4ff" },
  { id: 2, text: "SYN sent ──────────────────►", delay: 400, color: "#00ff41", packet: "right" },
  { id: 3, text: "◄────────────── SYN-ACK received", delay: 900, color: "#00ff41", packet: "left" },
  { id: 4, text: "ACK sent ──────────────────►", delay: 1300, color: "#00ff41", packet: "right" },
  { id: 5, text: "Connection established ✓", delay: 1700, color: "#00ff41" },
  { id: 6, text: "Encrypting payload: AES-256...", delay: 2100, color: "#00d4ff" },
  { id: 7, text: "Fragmenting message into packets...", delay: 2600, color: "#00d4ff" },
  { id: 8, text: "[PKT 1/3] ──────────────► ACK ✓", delay: 3100, color: "#ff6b35", packet: "right" },
  { id: 9, text: "[PKT 2/3] ──────────────► ACK ✓", delay: 3600, color: "#ff6b35", packet: "right" },
  { id: 10, text: "[PKT 3/3] ──────────────► ACK ✓", delay: 4100, color: "#ff6b35", packet: "right" },
  { id: 11, text: "All packets delivered successfully", delay: 4700, color: "#00ff41" },
  { id: 12, text: "Server response: 200 OK", delay: 5100, color: "#00ff41" },
  { id: 13, text: "Message received by Dhruv ✓", delay: 5500, color: "#00ff41" },
  { id: 14, text: "FIN → FIN-ACK → ACK  Connection closed", delay: 6000, color: "#00d4ff" },
];

const ERROR_STEPS = [
  { id: 1, text: "Initializing TCP handshake...", delay: 0, color: "#00d4ff" },
  { id: 2, text: "SYN sent ──────────────────►", delay: 400, color: "#ff6b35", packet: "right" },
  { id: 3, text: "............... timeout", delay: 1200, color: "#ff6b35" },
  { id: 4, text: "Retrying [1/3]...", delay: 1800, color: "#ff6b35" },
  { id: 5, text: "............... timeout", delay: 2600, color: "#ff6b35" },
  { id: 6, text: "Retrying [2/3]...", delay: 3200, color: "#ff6b35" },
  { id: 7, text: "............... timeout", delay: 4000, color: "#ff6b35" },
  { id: 8, text: "ERR: Connection refused", delay: 4600, color: "#ff0000" },
  { id: 9, text: "HOST unreachable", delay: 5000, color: "#ff0000" },
  { id: 10, text: "Fallback: dhruvplaced@gmail.com", delay: 5400, color: "#00d4ff" },
];

type Step = typeof TRANSMISSION_STEPS[number];

function PacketDot({ direction }: { direction: "right" | "left" }) {
  return (
    <motion.span
      initial={{ x: direction === "right" ? -10 : 10, opacity: 0 }}
      animate={{ x: direction === "right" ? 10 : -10, opacity: [0, 1, 1, 0] }}
      transition={{ duration: 0.6, ease: "linear" }}
      className="inline-block w-2 h-2 rounded-full ml-2 align-middle"
      style={{ background: direction === "right" ? "#ff6b35" : "#00ff41", boxShadow: `0 0 6px ${direction === "right" ? "#ff6b35" : "#00ff41"}` }}
    />
  );
}

function TransmissionLog({ steps, visible }: { steps: Step[]; visible: boolean }) {
  const [shown, setShown] = useState<number[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!visible) { setShown([]); return; }
    const timers = steps.map((s) =>
      setTimeout(() => setShown((p) => [...p, s.id]), s.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, [visible, steps]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [shown]);

  return (
    <div className="font-mono text-sm space-y-1 max-h-64 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-[#00ff41]/20">
      {steps.filter((s) => shown.includes(s.id)).map((s) => (
        <motion.div
          key={s.id}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25 }}
          className="flex items-center gap-1"
          style={{ color: s.color }}
        >
          <span className="text-[#00d4ff]/50 mr-1 select-none">›</span>
          <span>{s.text}</span>
          {s.packet && <PacketDot direction={s.packet as "right" | "left"} />}
        </motion.div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const countKey = "dhruv_packets_sent";

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phase, setPhase] = useState<"form" | "transmitting" | "success" | "error">("form");
  const [packetCount, setPacketCount] = useState(0);

  useEffect(() => {
    const stored = parseInt(localStorage.getItem(countKey) ?? "0", 10);
    setPacketCount(stored);
  }, []);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!formRef.current) return;

    setIsSubmitting(true);
    setPhase("transmitting");

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY).then(
      () => {
        const next = packetCount + 1;
        localStorage.setItem(countKey, String(next));
        setPacketCount(next);
        // show success log after all steps finish
        setTimeout(() => setPhase("success"), 6500);
        setIsSubmitting(false);
        formRef.current?.reset();
      },
      (err) => {
        console.error("EmailJS error:", err);
        setTimeout(() => setPhase("error"), 5800);
        setIsSubmitting(false);
      }
    );
  };

  const reset = () => setPhase("form");

  // ── button label ──────────────────────────────────────────
  const btnLabel =
    phase === "transmitting" ? "TRANSMITTING..." :
      phase === "success" ? "DELIVERED ✓" :
        phase === "error" ? "FAILED ✗" :
          "SEND PACKET";

  const btnColor =
    phase === "success" ? "#00ff41" :
      phase === "error" ? "#ff0000" :
        "#00d4ff";

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#050a0f]" style={{ scrollMarginTop: "0px", overflowAnchor: "none" }}>
      {/* ambient glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00ff41]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#00d4ff]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 z-10 relative">

        {/* ── heading ── */}
        <div className="text-center mb-16">
          <p className="font-mono text-[#00d4ff] text-sm tracking-widest mb-2">
            LAYER 2 — DATA LINK
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Initialize <span className="text-[#00ff41]">Connection</span>
          </h2>
          <p className="font-mono text-gray-500 text-sm mt-2">
            Open a secure TCP channel for collaboration
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#050a0f] border border-[#00ff41]/30 p-8 md:p-12 shadow-[0_0_30px_rgba(0,255,65,0.05)] font-mono relative overflow-hidden"
          >
            {/* scanlines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] pointer-events-none z-10" />

            <div className="relative z-20 min-h-[400px]">

              {/* ── terminal header ── */}
              <div className="flex items-center gap-2 mb-8 pb-4 border-b border-[#00ff41]/20">
                <span className="w-3 h-3 rounded-full bg-[#ff6b35]" />
                <span className="w-3 h-3 rounded-full bg-[#00d4ff]" />
                <span className="w-3 h-3 rounded-full bg-[#00ff41]" />
                <span className="ml-3 text-[#00d4ff] text-sm tracking-widest">
                  contact.ssh — dhruv@portfolio:~
                </span>
              </div>

              {/* ── FORM phase ── */}
              <AnimatePresence mode="wait">
                {phase === "form" && (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="text-[#00d4ff] mb-8 font-bold flex items-center gap-2">
                      <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                      >›</motion.span>
                      Establishing connection to Dhruv...
                    </div>

                    <form ref={formRef} onSubmit={sendEmail} className="space-y-8 text-[#00ff41]">

                      {/* name */}
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
                        <input
                          type="text"
                          name="user_name"
                          required
                          placeholder="[ Enter Name ]"
                          className="flex-1 w-full bg-transparent border-b border-[#00ff41]/40 text-[#00ff41] placeholder-[#00ff41]/30 focus:outline-none focus:border-[#ff6b35] py-2 transition-colors font-mono"
                        />
                        <span className="text-xs text-gray-600 whitespace-nowrap">← SOURCE HOST</span>
                      </div>

                      {/* email */}
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
                        <input
                          type="email"
                          name="user_email"
                          required
                          placeholder="[ Enter Email ]"
                          className="flex-1 w-full bg-transparent border-b border-[#00ff41]/40 text-[#00ff41] placeholder-[#00ff41]/30 focus:outline-none focus:border-[#ff6b35] py-2 transition-colors font-mono"
                        />
                        <span className="text-xs text-gray-600 whitespace-nowrap">← SOURCE PORT</span>
                      </div>

                      {/* message */}
                      <div className="flex flex-col md:flex-row items-start gap-2">
                        <textarea
                          name="message"
                          rows={4}
                          required
                          placeholder="[ Enter Message / Payload ]"
                          className="flex-1 w-full bg-transparent border border-[#00ff41]/40 text-[#00ff41] placeholder-[#00ff41]/30 focus:outline-none focus:border-[#ff6b35] p-3 transition-colors font-mono resize-none"
                        />
                        <span className="text-xs text-gray-600 whitespace-nowrap pt-3">← PAYLOAD</span>
                      </div>

                      {/* submit */}
                      <div className="pt-2">
                        <motion.button
                          type="submit"
                          disabled={isSubmitting}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          style={{ borderColor: btnColor, color: btnColor }}
                          className="border px-6 py-3 font-bold uppercase tracking-widest transition-all flex items-center gap-3 disabled:opacity-50"
                        >
                          [ {btnLabel} ]
                          <motion.span
                            animate={{ x: [0, 4, 0] }}
                            transition={{ repeat: Infinity, duration: 1.2 }}
                          >→</motion.span>
                        </motion.button>
                      </div>
                    </form>
                  </motion.div>
                )}

                {/* ── TRANSMITTING phase ── */}
                {phase === "transmitting" && (
                  <motion.div
                    key="transmitting"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <div className="text-[#00d4ff] font-bold mb-4 flex items-center gap-2">
                      <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ repeat: Infinity, duration: 0.6 }}
                      >█</motion.span>
                      Transmitting packets...
                    </div>

                    {/* animated progress bar */}
                    <div className="w-full bg-[#00ff41]/10 h-1 mb-6 overflow-hidden">
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 6, ease: "linear" }}
                        className="h-full bg-[#00ff41]"
                        style={{ boxShadow: "0 0 8px #00ff41" }}
                      />
                    </div>

                    <TransmissionLog steps={TRANSMISSION_STEPS} visible={phase === "transmitting"} />
                  </motion.div>
                )}

                {/* ── SUCCESS phase ── */}
                {phase === "success" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4 text-center py-6"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ repeat: 2, duration: 0.4 }}
                      className="text-5xl mb-4"
                      style={{ color: "#00ff41", textShadow: "0 0 20px #00ff41" }}
                    >
                      ✓
                    </motion.div>
                    <p className="text-[#00ff41] font-bold text-lg tracking-widest">
                      TRANSMISSION COMPLETE
                    </p>
                    <p className="text-gray-500 text-sm font-mono">
                      All packets acknowledged by host
                    </p>
                    <p className="text-[#00d4ff] text-sm font-mono">
                      &gt; Dhruv will respond within 24 hours
                    </p>

                    {/* packet counter */}
                    <div className="mt-6 border border-[#00ff41]/20 p-4 inline-block">
                      <p className="text-xs text-gray-600 tracking-widest">TOTAL PACKETS DELIVERED</p>
                      <motion.p
                        key={packetCount}
                        initial={{ scale: 1.3, color: "#00ff41" }}
                        animate={{ scale: 1, color: "#00ff41" }}
                        className="text-3xl font-bold mt-1"
                        style={{ textShadow: "0 0 10px #00ff41" }}
                      >
                        {String(packetCount).padStart(4, "0")}
                      </motion.p>
                    </div>

                    <div className="pt-4">
                      <button
                        onClick={reset}
                        className="border border-[#00d4ff]/50 text-[#00d4ff] px-6 py-2 text-sm font-mono tracking-widest hover:bg-[#00d4ff]/10 transition-all"
                      >
                        [ NEW CONNECTION ]
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* ── ERROR phase ── */}
                {phase === "error" && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <div className="text-[#ff0000] font-bold mb-4">
                      ✗ TRANSMISSION FAILED
                    </div>

                    <TransmissionLog steps={ERROR_STEPS} visible={phase === "error"} />

                    <div className="pt-6 flex gap-4 flex-wrap">
                      <button
                        onClick={reset}
                        className="border border-[#ff6b35]/50 text-[#ff6b35] px-6 py-2 text-sm font-mono tracking-widest hover:bg-[#ff6b35]/10 transition-all"
                      >
                        [ RETRY CONNECTION ]
                      </button>
                      <a
                        href="mailto:dhruvplaced@gmail.com"
                        className="border border-[#00d4ff]/50 text-[#00d4ff] px-6 py-2 text-sm font-mono tracking-widest hover:bg-[#00d4ff]/10 transition-all"
                      >
                        [ DIRECT CHANNEL ]
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── footer meta ── */}
              <div className="mt-12 pt-6 border-t border-[#00ff41]/20 flex flex-col md:flex-row justify-between text-xs text-gray-700 font-bold tracking-widest uppercase gap-2">
                <span>DEST_IP: dhruvplaced@gmail.com</span>
                <span>PROTOCOL: SMTP over TLS</span>
                <span>SEC: AES-256</span>
              </div>
            </div>
          </motion.div>

          {/* ── social links below card ── */}
          <div className="mt-6 flex justify-center gap-6 font-mono text-xs text-gray-600 tracking-widest">
            <a href="https://github.com/Dhruv110904" target="_blank" rel="noreferrer"
              className="hover:text-[#00ff41] transition-colors">
              [ GITHUB ]
            </a>
            <a href="https://linkedin.com/in/dhruvjain1109" target="_blank" rel="noreferrer"
              className="hover:text-[#00d4ff] transition-colors">
              [ LINKEDIN ]
            </a>
            <a href="mailto:dhruvplaced@gmail.com"
              className="hover:text-[#ff6b35] transition-colors">
              [ EMAIL ]
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};