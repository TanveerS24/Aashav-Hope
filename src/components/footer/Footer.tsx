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
              onClick={() => {
                if (EVENT_CONFIG.registrationUrl.includes("PLACEHOLDER")) {
                  alert("Registration URL is configured as a placeholder.");
                } else {
                  window.open(EVENT_CONFIG.registrationUrl, "_blank", "noopener,noreferrer");
                }
              }}
              className="px-6 py-3 rounded bg-gradient-to-r from-cyan-brand via-cyan-dim to-violet-brand text-background font-mono font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.25)] hover:shadow-[0_0_35px_rgba(0,240,255,0.45)] hover:scale-105 active:scale-95 transition-all group mb-1"
            >
              <span>REGISTER NOW</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
            <span className="text-offwhite font-bold">{EVENT_CONFIG.venueName}</span>
            <span className="text-cyan-brand font-semibold text-[11px] uppercase tracking-wider">{EVENT_CONFIG.departmentName}</span>
            <span>22.08.2026 • INTER-COLLEGE HYBRID HACKATHON</span>
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
