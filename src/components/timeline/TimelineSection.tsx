"use client";

import React, { useRef } from "react";
import { TIMELINE_PHASES } from "@/data/timeline";
import { Clock, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

export const TimelineSection: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Flatten all events across phases sequentially
  const allEvents = TIMELINE_PHASES.flatMap((phase) =>
    phase.events.map((evt) => ({
      ...evt,
      phaseId: phase.phaseId,
      phaseTitle: phase.phaseTitle,
    }))
  );

  return (
    <section
      id="timeline"
      className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-[1600px] w-full mx-auto overflow-hidden"
    >
      {/* Section Header (Filter & Scroll Buttons Removed) */}
      <div className="flex flex-col items-center text-center sm:items-start sm:text-left gap-2 mb-8">
        <div className="flex items-center gap-2 font-mono text-xs text-cyan-brand tracking-widest uppercase">
          <span className="text-tertiary">005 /</span>
          <span>HORIZONTAL MISSION ROADMAP</span>
        </div>

        <h2 className="font-display font-black text-4xl sm:text-6xl text-offwhite tracking-tight uppercase">
          EXECUTION TIMELINE
        </h2>

        <p className="text-sm font-mono text-dimwhite max-w-xl mt-1">
          Signal path tracking from team registration to the Valedictory Ceremony on 29 August 2026.
        </p>
      </div>

      {/* Schedule Revision Disclaimer Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative rounded-lg bg-gradient-to-r from-sunrise-brand/15 via-card/90 to-surface/90 border border-sunrise-brand/40 p-5 sm:p-6 mb-12 backdrop-blur-md shadow-[0_0_25px_rgba(255,107,53,0.15)] overflow-hidden"
      >
        {/* Ambient Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-sunrise-brand/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row gap-5 items-start lg:items-center justify-between">
          <div className="flex items-start gap-4">
            <div className="p-2.5 rounded-md bg-sunrise-brand/20 border border-sunrise-brand/40 text-sunrise-brand shrink-0 mt-0.5 sm:mt-0">
              <AlertTriangle className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider uppercase rounded bg-sunrise-brand/20 text-sunrise-brand border border-sunrise-brand/40">
                  IMPORTANT SCHEDULE UPDATE
                </span>
                <span className="text-xs font-mono text-tertiary">
                  {"// NOTICE TO PARTICIPANTS"}
                </span>
              </div>
              <p className="text-sm text-offwhite leading-relaxed">
                The event timeline has been updated in the interest of participants registering from far away colleges and institutions. 
                Registration will now close on <strong className="text-sunrise-brand font-semibold">24th August 2026 at 12:00 PM</strong>.
              </p>
              <p className="text-xs font-mono text-dimwhite mt-1.5 leading-relaxed">
                Shortlisted teams will be announced on or before <span className="text-cyan-brand font-semibold">25th Aug, 12:00 PM</span> (circulated in groups &amp; emailed to team leaders). All selected teams must confirm participation before <span className="text-cyan-brand font-semibold">25th Aug, 10:00 PM</span>. We regret any inconvenience caused.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap gap-3 shrink-0 w-full lg:w-auto pt-3 lg:pt-0 border-t lg:border-t-0 border-surface-border/40">
            <div className="bg-background/80 border border-surface-border px-3.5 py-2.5 rounded text-center min-w-[130px] flex-1 lg:flex-none">
              <div className="text-[10px] font-mono text-tertiary uppercase">Registration Closes</div>
              <div className="text-xs font-mono font-bold text-sunrise-brand mt-0.5">24 AUG • 12:00 PM</div>
            </div>
            <div className="bg-background/80 border border-surface-border px-3.5 py-2.5 rounded text-center min-w-[130px] flex-1 lg:flex-none">
              <div className="text-[10px] font-mono text-tertiary uppercase">Shortlist Announced</div>
              <div className="text-xs font-mono font-bold text-cyan-brand mt-0.5">25 AUG • ≤ 12:00 PM</div>
            </div>
            <div className="bg-background/80 border border-surface-border px-3.5 py-2.5 rounded text-center min-w-[130px] flex-1 lg:flex-none">
              <div className="text-[10px] font-mono text-tertiary uppercase">Confirm Slot By</div>
              <div className="text-xs font-mono font-bold text-cyan-brand mt-0.5">25 AUG • 10:00 PM</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Horizontal Timeline Track Container */}
      <div className="relative py-4">
        {/* Scrollable Track */}
        <div
          ref={scrollContainerRef}
          className="relative flex overflow-x-auto gap-8 pb-8 pt-4 scrollbar-none snap-x snap-mandatory scroll-smooth min-h-[500px]"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {allEvents.map((evt, idx) => {
            const isTop = idx % 2 === 0; // Alternate above and below timeline

            return (
              <div
                key={evt.title + "-" + idx}
                className="flex-none w-[300px] sm:w-[340px] snap-start flex flex-col items-center justify-between relative"
              >
                {/* 1. TOP SLOT (Fixed height: 210px) */}
                <div className="w-full h-[210px] flex flex-col justify-end">
                  {isTop ? (
                    <div className="w-full flex flex-col items-center">
                      {/* Top Content Box - Animated Slide into Position */}
                      <motion.div
                        initial={{ opacity: 0, y: -40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.08 }}
                        className={`w-full p-4 rounded-sm bg-card/95 border backdrop-blur-md transition-all h-[180px] flex flex-col justify-between ${
                          evt.isMilestone
                            ? "border-sunrise-brand/60 shadow-[0_0_20px_rgba(255,107,53,0.2)]"
                            : "border-surface-border hover:border-cyan-brand/40"
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="font-mono font-bold text-xs text-cyan-brand flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5" />
                              {evt.time}
                            </span>
                            {evt.badge && (
                              <span
                                className={`text-[9px] font-mono font-semibold px-2 py-0.5 rounded ${
                                  evt.isMilestone
                                    ? "bg-sunrise-brand/20 text-sunrise-brand border border-sunrise-brand/30"
                                    : "bg-cyan-brand/10 text-cyan-brand border border-cyan-brand/30"
                                }`}
                              >
                                {evt.badge}
                              </span>
                            )}
                          </div>

                          <h4 className="font-display font-bold text-base text-offwhite tracking-wide mb-1 line-clamp-2">
                            {evt.title}
                          </h4>

                          <p className="text-xs font-mono text-dimwhite leading-relaxed line-clamp-3">
                            {evt.description}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-surface-border/40 text-[10px] font-mono text-tertiary flex items-center justify-between">
                          <span>PHASE {evt.phaseId}</span>
                        </div>
                      </motion.div>

                      {/* Animated Connector Line - Extends Downward from Content Box to Central Dot */}
                      <motion.div
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: idx * 0.08 + 0.3 }}
                        className="w-[2px] h-[30px] bg-gradient-to-b from-cyan-brand/80 to-cyan-brand/30 origin-top"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-[210px]" />
                  )}
                </div>

                {/* 2. STATIONARY MIDDLE NODE ROW (Height: 40px) - FIXED CENTRAL LINE BEAM & DOT */}
                <div className="w-full h-[40px] flex items-center justify-center relative">
                  {/* Continuous Stationary Beam Line Segment */}
                  <div className="absolute top-1/2 left-[-16px] right-[-16px] -translate-y-1/2 h-[2px] bg-gradient-to-r from-cyan-brand/80 via-sunrise-brand/80 to-violet-brand/80 z-0" />

                  {/* Stationary Central Node Dot */}
                  <div
                    className={`relative z-10 h-6 w-6 rounded-full border-2 bg-background flex items-center justify-center transition-all ${
                      evt.isMilestone
                        ? "border-sunrise-brand bg-sunrise-brand/20 shadow-[0_0_15px_rgba(255,107,53,0.7)]"
                        : "border-cyan-brand bg-cyan-brand/20 shadow-[0_0_12px_rgba(0,240,255,0.4)]"
                    }`}
                  >
                    <div
                      className={`h-2 w-2 rounded-full ${
                        evt.isMilestone ? "bg-sunrise-brand animate-ping" : "bg-cyan-brand"
                      }`}
                    />
                  </div>
                </div>

                {/* 3. BOTTOM SLOT (Fixed height: 210px) */}
                <div className="w-full h-[210px] flex flex-col justify-start">
                  {!isTop ? (
                    <div className="w-full flex flex-col items-center">
                      {/* Animated Connector Line - Extends Upward from Content Box to Central Dot */}
                      <motion.div
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: idx * 0.08 + 0.3 }}
                        className="w-[2px] h-[30px] bg-gradient-to-t from-sunrise-brand/80 to-sunrise-brand/30 origin-bottom"
                      />

                      {/* Bottom Content Box - Animated Slide into Position */}
                      <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.08 }}
                        className={`w-full p-4 rounded-sm bg-card/95 border backdrop-blur-md transition-all h-[180px] flex flex-col justify-between ${
                          evt.isMilestone
                            ? "border-sunrise-brand/60 shadow-[0_0_20px_rgba(255,107,53,0.2)]"
                            : "border-surface-border hover:border-cyan-brand/40"
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="font-mono font-bold text-xs text-cyan-brand flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5" />
                              {evt.time}
                            </span>
                            {evt.badge && (
                              <span
                                className={`text-[9px] font-mono font-semibold px-2 py-0.5 rounded ${
                                  evt.isMilestone
                                    ? "bg-sunrise-brand/20 text-sunrise-brand border border-sunrise-brand/30"
                                    : "bg-cyan-brand/10 text-cyan-brand border border-cyan-brand/30"
                                }`}
                              >
                                {evt.badge}
                              </span>
                            )}
                          </div>

                          <h4 className="font-display font-bold text-base text-offwhite tracking-wide mb-1 line-clamp-2">
                            {evt.title}
                          </h4>

                          <p className="text-xs font-mono text-dimwhite leading-relaxed line-clamp-3">
                            {evt.description}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-surface-border/40 text-[10px] font-mono text-tertiary flex items-center justify-between">
                          <span>PHASE {evt.phaseId}</span>
                        </div>
                      </motion.div>
                    </div>
                  ) : (
                    <div className="w-full h-[210px]" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Swipe instruction hint */}
      <div className="flex items-center justify-center gap-2 font-mono text-[11px] text-tertiary mt-2">
        <span>➔ SWIPE OR SCROLL HORIZONTALLY TO EXPLORE ROADMAP</span>
      </div>
    </section>
  );
};
