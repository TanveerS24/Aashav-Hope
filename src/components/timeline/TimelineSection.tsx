"use client";

import React, { useRef } from "react";
import { TIMELINE_PHASES } from "@/data/timeline";
import { Clock } from "lucide-react";
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
      <div className="flex flex-col items-center text-center sm:items-start sm:text-left gap-2 mb-12">
        <div className="flex items-center gap-2 font-mono text-xs text-cyan-brand tracking-widest uppercase">
          <span className="text-tertiary">005 /</span>
          <span>HORIZONTAL MISSION ROADMAP</span>
        </div>

        <h2 className="font-display font-black text-4xl sm:text-6xl text-offwhite tracking-tight uppercase">
          EXECUTION TIMELINE
        </h2>

        <p className="text-sm font-mono text-dimwhite max-w-xl mt-1">
          Signal path tracking from team registration to the Valedictory Ceremony on 22 August 2026.
        </p>
      </div>

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
