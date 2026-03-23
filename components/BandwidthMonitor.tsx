"use client";

import { useEffect, useRef } from "react";

export default function BandwidthMonitor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let tick = 0;
    
    // Scale canvas natively for high DPI displays to prevent blurry or silent failures
    const scale = window.devicePixelRatio || 1;

    const resize = () => {
      // Size dynamically perfectly matching parent DOM dimensions
      const elWidth = container.clientWidth || 200;
      const elHeight = container.clientHeight || 24; 

      canvas.width = elWidth * scale;
      canvas.height = elHeight * scale;
      
      ctx.scale(scale, scale);
    };

    // Trigger initial exact size
    resize();
    const observer = new ResizeObserver(() => resize());
    observer.observe(container);

    const scrollState = { lastY: window.scrollY, speed: 0 };
    const mouseState = { lastX: window.innerWidth/2, lastY: window.innerHeight/2, speed: 0 };
    let clickSpike = 0;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const diff = Math.abs(currentY - scrollState.lastY);
      scrollState.speed = Math.min(diff, 100);
      scrollState.lastY = currentY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - mouseState.lastX;
      const dy = e.clientY - mouseState.lastY;
      mouseState.speed = Math.min(Math.sqrt(dx * dx + dy * dy), 100);
      mouseState.lastX = e.clientX;
      mouseState.lastY = e.clientY;
    };

    const handleClick = () => {
      clickSpike = 100;
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    const barWidth = 4;
    const gap = 2;
    const totalBarWidth = barWidth + gap;

    const draw = () => {
      tick++;
      
      scrollState.speed *= 0.92;
      mouseState.speed *= 0.85;
      clickSpike *= 0.85;

      const physicalWidth = container.clientWidth || 200;
      const physicalHeight = container.clientHeight || 24;

      ctx.clearRect(0, 0, physicalWidth, physicalHeight);

      const activeNumBars = Math.floor(physicalWidth / totalBarWidth);

      const freq = 0.05 + (mouseState.speed * 0.015);
      const amp = 8 + (scrollState.speed * 0.3); // Increased base bar amplitude heavily so it's impossible to miss

      for (let i = 0; i < activeNumBars; i++) {
        const wave = Math.sin(tick * freq + i * 0.2) * amp;
        const noise = Math.random() * (scrollState.speed * 0.15 + 2);
        
        let h = Math.abs(wave) + noise + 4; // Absolute 4px minimum height
        
        if (clickSpike > 5 && Math.random() > 0.3) {
             h += Math.random() * clickSpike * 0.6;
        }

        h = Math.min(h, physicalHeight); 
        
        const x = i * totalBarWidth;
        const y = physicalHeight - h;

        if (h > physicalHeight * 0.75) {
          ctx.fillStyle = "#00d4ff"; 
        } else if (h > physicalHeight * 0.4) {
          ctx.fillStyle = "#00ff41"; 
        } else {
          ctx.fillStyle = "rgba(0, 255, 65, 0.4)"; 
        }

        ctx.fillRect(x, y, barWidth, h);
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-8 relative overflow-hidden rounded overflow-hidden mb-2 bg-[#020508]/50">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-90 block"></canvas>
    </div>
  );
}
