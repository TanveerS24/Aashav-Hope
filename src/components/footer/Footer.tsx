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

          <div className="flex flex-col items-center md:items-end text-center md:text-right font-mono text-xs text-dimwhite gap-2">
            <span className="text-offwhite font-bold">{EVENT_CONFIG.venueName}</span>
            <span>22.08.2026 • INTER-COLLEGE HYBRID HACKATHON</span>
            <span className="text-cyan-brand">OFFICIAL SIH 2026 PREPARATION</span>
          </div>
        </div>

        {/* Quick Links & Info */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-8 border-y border-surface-border/60 font-mono text-xs">
          <div>
            <span className="text-cyan-brand font-bold uppercase tracking-wider block mb-3">
              NAVIGATION
            </span>
            <ul className="space-y-2 text-dimwhite">
              <li>
                <a href="#home" className="hover:text-offwhite transition-colors">
                  HOME
                </a>
              </li>
              <li>
                <a href="#problems" className="hover:text-offwhite transition-colors">
                  PROBLEM STATEMENTS
                </a>
              </li>
              <li>
                <a href="#timeline" className="hover:text-offwhite transition-colors">
                  TIMELINE & ROADMAP
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-offwhite transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <span className="text-cyan-brand font-bold uppercase tracking-wider block mb-3">
              CRITICAL DATES
            </span>
            <ul className="space-y-2 text-dimwhite">
              <li>REG OPENS: 07 AUG 2026</li>
              <li>REG CLOSES: 20 AUG 2:00 PM</li>
              <li>SELECTION: 21 AUG &lt;10 AM</li>
              <li>EVENT DAY: 22 AUG 2026</li>
            </ul>
          </div>

          <div>
            <span className="text-cyan-brand font-bold uppercase tracking-wider block mb-3">
              FORMAT & SPECS
            </span>
            <ul className="space-y-2 text-dimwhite">
              <li>MODE: ONLINE + OFFLINE</li>
              <li>TEAM: 3–4 MEMBERS</li>
              <li>WINNERS: 5 TEAMS HONORED</li>
              <li>VENUE: SIMATS CAMPUS</li>
            </ul>
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <span className="text-sunrise-brand font-bold uppercase tracking-wider block mb-3">
                STATEMENT
              </span>
              <p className="text-dimwhite leading-relaxed">
                &quot;BUILT FOR THOSE WHO BUILD WHAT&apos;S NEXT.&quot;
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-surface-border/40 text-[10px] text-tertiary">
              AASHAV 2026 • SIMATS SCHOOL OF ENGINEERING
            </div>
          </div>
        </div>

        {/* Bottom Legal / Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-tertiary">
          <span>© 2026 AASHAV HACKATHON. ALL RIGHTS RESERVED.</span>
          <span>DESIGNED FOR NATIONAL TECHNICAL EXCELLENCE.</span>
        </div>
      </div>
    </footer>
  );
};
