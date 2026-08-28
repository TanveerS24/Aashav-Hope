"use client";

import React from "react";
import { EVENT_CONFIG } from "@/config/event";
import { ArrowUpRight } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="relative border-t border-surface-border bg-background pt-16 pb-12 px-4 sm:px-6 lg:px-8 max-w-[1600px] w-full mx-auto overflow-hidden">
      <div className="flex flex-col gap-12">
        {/* Top Footer Section */}
        <div className="flex flex-col md:flex-row items-center text-center md:items-end md:text-left justify-between gap-8">
          <div>
            <div className="font-display font-black text-6xl sm:text-8xl lg:text-9xl text-transparent bg-clip-text bg-gradient-to-r from-offwhite via-offwhite to-dimwhite tracking-tight uppercase leading-none">
              AASHAV
            </div>
            <div className="font-display font-black text-2xl sm:text-4xl tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-sunrise-brand via-cyan-brand to-violet-brand uppercase mt-1">
              THE HOPE / 2026
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end text-center md:text-right font-mono text-xs text-dimwhite gap-3">
            <button
              disabled
              className="px-6 py-2.5 rounded bg-surface/90 border border-rose-500/40 text-rose-300 font-mono font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(244,63,94,0.15)] cursor-not-allowed opacity-90 select-none mb-1"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              <span>REGISTRATION CLOSED</span>
            </button>
            <span className="text-offwhite font-bold">{EVENT_CONFIG.venueName}</span>
            <span className="text-cyan-brand font-semibold text-[11px] uppercase tracking-wider">{EVENT_CONFIG.departmentName}</span>
            <span>29.08.2026 • INTER-COLLEGE HYBRID HACKATHON</span>
            <span className="text-sunrise-brand">NATIONAL-GRADE HACKATHON 2026</span>
          </div>
        </div>

        {/* Bottom Legal / Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-surface-border/60 font-mono text-[11px] text-tertiary">
          <span>© 2026 AASHAV HACKATHON. ALL RIGHTS RESERVED.</span>
          <span>SIMATS SCHOOL OF ENGINEERING • DEPARTMENT OF MACHINE LEARNING</span>
        </div>
      </div>
    </footer>
  );
};
