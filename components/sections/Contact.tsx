"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { personalData } from "@/lib/data";
import SectionHeading from "@/components/SectionHeading";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setIsSubmitting(true);

    // TODO: REPLACE THESE WITH YOUR ACTUAL EMAILJS CREDENTIALS
    const serviceId = "YOUR_SERVICE_ID";
    const templateId = "YOUR_TEMPLATE_ID";
    const publicKey = "YOUR_PUBLIC_KEY";

    emailjs
      .sendForm(serviceId, templateId, formRef.current, publicKey)
      .then(
        () => {
          setSubmitStatus("success");
          setIsSubmitting(false);
          formRef.current?.reset();
          // Reset success message after 5 seconds
          setTimeout(() => setSubmitStatus("idle"), 5000);
        },
        (error) => {
          console.error("EmailJS error:", error);
          setSubmitStatus("error");
          setIsSubmitting(false);
          // Fallback message showing instructions if credentials aren't set
          alert("EmailJS credentials not configured yet. Please update them in components/sections/Contact.tsx!");
          setTimeout(() => setSubmitStatus("idle"), 5000);
        }
      );
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-[#050a0f]">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00ff41]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#00d4ff]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 z-10 relative">
        <SectionHeading title="Initialize Connection" subtitle="Open a secure TCP channel for collaboration" />

        <div className="max-w-3xl mx-auto mt-16 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#050a0f] border border-[#00ff41]/30 p-8 md:p-12 shadow-[0_0_30px_rgba(0,255,65,0.05)] font-mono relative overflow-hidden group"
          >
            {/* Scanlines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] pointer-events-none z-10"></div>
            
            <div className="relative z-20">
              <div className="text-[#00d4ff] mb-10 font-bold text-lg md:text-xl flex items-center">
                <span className="mr-3 animate-blink">&gt;</span> Establishing connection to Dhruv...
              </div>

              <form ref={formRef} onSubmit={sendEmail} className="space-y-8 relative z-10 text-[#00ff41]">
                
                <div className="flex flex-col md:flex-row items-start md:items-center">
                  <div className="relative flex-1 w-full">
                    <input
                      type="text"
                      id="name"
                      name="user_name"
                      required
                      placeholder="[ Enter Name ]"
                      className="w-full bg-transparent border-b border-[#00ff41]/50 text-[#00ff41] placeholder-[#00ff41]/30 focus:outline-none focus:border-[#ff6b35] py-2 transition-colors font-mono"
                    />
                  </div>
                  <div className="mt-2 md:mt-0 md:ml-4 text-xs md:text-sm text-gray-500 whitespace-nowrap shrink-0">
                    &larr; SOURCE HOST
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-start md:items-center">
                  <div className="relative flex-1 w-full">
                    <input
                      type="email"
                      id="email"
                      name="user_email"
                      required
                      placeholder="[ Enter Email ]"
                      className="w-full bg-transparent border-b border-[#00ff41]/50 text-[#00ff41] placeholder-[#00ff41]/30 focus:outline-none focus:border-[#ff6b35] py-2 transition-colors font-mono"
                    />
                  </div>
                  <div className="mt-2 md:mt-0 md:ml-4 text-xs md:text-sm text-gray-500 whitespace-nowrap shrink-0">
                    &larr; SOURCE PORT
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-start">
                  <div className="relative flex-1 w-full">
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      placeholder="[ Enter Message ]"
                      className="w-full bg-transparent border border-[#00ff41]/50 text-[#00ff41] placeholder-[#00ff41]/30 focus:outline-none focus:border-[#ff6b35] p-3 transition-colors font-mono resize-none mt-2"
                    ></textarea>
                  </div>
                  <div className="mt-2 md:mt-0 md:ml-4 text-xs md:text-sm text-gray-500 whitespace-nowrap shrink-0 pt-4">
                    &larr; PAYLOAD
                  </div>
                </div>

                <div className="pt-4 flex justify-start">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group/btn border border-[#00d4ff] px-6 py-3 text-[#00d4ff] hover:bg-[#00d4ff]/10 hover:shadow-[0_0_15px_rgba(0,212,255,0.3)] transition-all flex items-center disabled:opacity-50 disabled:cursor-not-allowed font-bold uppercase tracking-widest relative"
                  >
                    [ {isSubmitting ? "TRANSMITTING..." : "SEND PACKET"} ]
                    {!isSubmitting && <span className="ml-3 group-hover/btn:translate-x-1.5 transition-transform text-lg">&rarr;</span>}
                  </button>
                </div>

                {submitStatus === "success" && (
                  <p className="text-[#00ff41] text-sm mt-4 animate-pulse">&gt; Signal transmitted and acknowledged by host.</p>
                )}
                {submitStatus === "error" && (
                  <p className="text-[#ff6b35] text-sm mt-4">&gt; ERR: Connection timeout. Handshake failed.</p>
                )}
              </form>
              
              <div className="mt-12 pt-6 border-t border-[#00ff41]/20 flex flex-col md:flex-row justify-between text-xs text-gray-600 font-bold tracking-widest uppercase">
                 <div>DEST_IP: {personalData.contact.email}</div>
                 <div className="mt-2 md:mt-0">SEC_LEVEL: AES-256</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
