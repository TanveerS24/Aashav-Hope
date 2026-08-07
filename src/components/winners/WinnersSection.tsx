"use client";

import React from "react";
import { EVENT_CONFIG } from "@/config/event";
import { Trophy, Award, ShieldCheck, Star } from "lucide-react";
import { motion } from "framer-motion";

export const WinnersSection: React.FC = () => {
  return (
    <section id="winners" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-[1600px] w-full mx-auto overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-sunrise-brand/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative rounded-lg bg-surface/90 border border-sunrise-brand/30 p-8 sm:p-14 overflow-hidden backdrop-blur-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Oversized Visual "05" Graphic (Span 5) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center text-center relative select-none">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* Massive Oversized 05 */}
              <span className="font-display font-black text-9xl sm:text-[14rem] leading-none text-transparent bg-clip-text bg-gradient-to-b from-sunrise-brand via-sunrise-light to-transparent opacity-95">
                05
              </span>

              {/* Sub-label overlay */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full">
                <span className="font-mono font-black text-sm tracking-widest text-offwhite uppercase px-3 py-1 bg-background/90 border border-sunrise-brand/50 rounded-sm shadow-xl inline-block">
                  HONORED WINNERS
                </span>
              </div>
            </motion.div>
          </div>

          {/* Editorial Content (Span 7) */}
          <div className="lg:col-span-7 space-y-6 flex flex-col items-center text-center lg:items-start lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 font-mono text-xs text-sunrise-brand tracking-widest uppercase">
              <span className="text-tertiary">008 /</span>
              <span>RECOGNITION &amp; HONORS</span>
            </div>

            <h2 className="font-display font-black text-4xl sm:text-6xl text-offwhite tracking-tight uppercase leading-tight">
              FIVE TEAMS WILL BE HONORED AS WINNERS.
            </h2>

            <p className="text-base sm:text-lg font-sans text-dimwhite leading-relaxed">
              At the conclusion of the final evaluation on 22 August 2026, selected <strong className="text-offwhite">5 teams</strong> will be honored at the <strong className="text-sunrise-brand">Valedictory Ceremony</strong> and awarded official Winner Certificates with Medals. All participating teams will receive official Participation Certificates.
            </p>

            {/* Recognition Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded bg-card/80 border border-sunrise-brand/40 flex items-start gap-3">
                <Trophy className="w-5 h-5 text-sunrise-brand flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-mono font-bold text-xs text-sunrise-brand uppercase">
                    WINNERS: MEDALS &amp; CERTIFICATES
                  </h4>
                  <p className="text-[11px] font-mono text-dimwhite mt-1">
                    The 5 winning teams will be awarded official Winner Certificates along with Medals.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded bg-card/80 border border-cyan-brand/40 flex items-start gap-3">
                <Award className="w-5 h-5 text-cyan-brand flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-mono font-bold text-xs text-cyan-brand uppercase">
                    PARTICIPANTS
                  </h4>
                  <p className="text-[11px] font-mono text-dimwhite mt-1">
                    All participating teams that present their solution will receive official Participation Certificates.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
