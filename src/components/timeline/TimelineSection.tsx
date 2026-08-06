"use client";

import React, { useState, useRef } from "react";
import { TIMELINE_PHASES } from "@/data/timeline";
import { Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export const TimelineSection: React.FC = () => {
  const [selectedPhase, setSelectedPhase] = useState<string>("ALL");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Flatten events or filter by phase
  const allEvents = TIMELINE_PHASES.flatMap((phase) =>
    phase.events.map((evt) => ({
      ...evt,
      phaseId: phase.phaseId,
      phaseTitle: phase.phaseTitle,
    }))
  );

  const filteredEvents =
    selectedPhase === "ALL"
      ? allEvents
      : allEvents.filter((evt) => evt.phaseId === selectedPhase);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -360 : 360;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="timeline"
      className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-cyan-brand tracking-widest uppercase mb-2">
            <span className="text-tertiary">004 /</span>
            <span>HORIZONTAL MISSION ROADMAP</span>
          </div>

          <h2 className="font-display font-black text-4xl sm:text-6xl text-offwhite tracking-tight uppercase">
            EXECUTION TIMELINE
          </h2>

          <p className="text-sm font-mono text-dimwhite max-w-xl mt-2">
            Signal path tracking from team registration to the Valedictory Ceremony on 22 August 2026.
          </p>
        </div>

        {/* Phase Selectors & Scroll Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1 bg-surface/80 border border-surface-border p-1 rounded-sm">
            <button
              onClick={() => setSelectedPhase("ALL")}
              className={`px-3 py-1 text-xs font-mono rounded-sm transition-all ${
                selectedPhase === "ALL"
                  ? "bg-cyan-brand text-background font-bold"
                  : "text-dimwhite hover:text-offwhite"
              }`}
            >
              ALL
            </button>
            {TIMELINE_PHASES.map((phase) => (
              <button
                key={phase.phaseId}
                onClick={() => setSelectedPhase(phase.phaseId)}
                className={`px-3 py-1 text-xs font-mono rounded-sm transition-all ${
                  selectedPhase === phase.phaseId
                    ? "bg-cyan-brand text-background font-bold"
                    : "text-dimwhite hover:text-offwhite"
                }`}
              >
                P{phase.phaseId}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleScroll("left")}
              className="p-2 rounded bg-surface/80 hover:bg-surface border border-surface-border hover:border-cyan-brand text-offwhite transition-colors"
              aria-label="Scroll Timeline Left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleScroll("right")}
              className="p-2 rounded bg-surface/80 hover:bg-surface border border-surface-border hover:border-cyan-brand text-offwhite transition-colors"
              aria-label="Scroll Timeline Right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Horizontal Timeline Track Container */}
      <div className="relative py-4">
        {/* Scrollable Track */}
        <div
          ref={scrollContainerRef}
          className="relative flex overflow-x-auto gap-8 pb-8 pt-4 scrollbar-none snap-x snap-mandatory scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {filteredEvents.map((evt, idx) => {
            const isTop = idx % 2 === 0; // Alternate above and below timeline

            return (
              <motion.div
                key={evt.title + "-" + idx}
                initial={{ opacity: 0, y: isTop ? -20 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="flex-none w-[300px] sm:w-[340px] snap-start flex flex-col items-center justify-between relative"
              >
                {/* 1. TOP SLOT (Fixed height: 210px) */}
                <div className="w-full h-[210px] flex flex-col justify-end">
                  {isTop ? (
                    <div className="w-full flex flex-col items-center">
                      {/* Top Card */}
                      <div
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
                          <span className="text-cyan-brand">ABOVE AXIS</span>
                        </div>
                      </div>

                      {/* Connector Line Down to Middle Node */}
                      <div className="w-[2px] h-[30px] bg-cyan-brand/50" />
                    </div>
                  ) : (
                    <div className="w-full h-[210px]" />
                  )}
                </div>

                {/* 2. MIDDLE NODE ROW (Fixed height: 40px) - CONTAINS BOTH LINE BEAM AND DOT AT SAME VERTICAL CENTER */}
                <div className="w-full h-[40px] flex items-center justify-center relative">
                  {/* Continuous Beam Line Segment extending into gap */}
                  <div className="absolute top-1/2 left-[-16px] right-[-16px] -translate-y-1/2 h-[2px] bg-gradient-to-r from-cyan-brand/80 via-sunrise-brand/80 to-violet-brand/80 z-0" />

                  {/* Centered Node Dot */}
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
                      {/* Connector Line Up to Middle Node */}
                      <div className="w-[2px] h-[30px] bg-sunrise-brand/50" />

                      {/* Bottom Card */}
                      <div
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
                          <span className="text-sunrise-brand">BELOW AXIS</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-[210px]" />
                  )}
                </div>
              </motion.div>
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
