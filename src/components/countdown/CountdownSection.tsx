"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { EVENT_CONFIG } from "@/config/event";
import { useCountdown } from "@/hooks/useCountdown";
import { Clock, Radio, Award, Camera, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const CountdownSection: React.FC = () => {
  const timeLeft = useCountdown(EVENT_CONFIG.countdownTargetISO);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const pad = (num: number) => num.toString().padStart(2, "0");

  if (!mounted) {
    return (
      <div className="py-24 px-4 max-w-7xl mx-auto flex items-center justify-center min-h-[300px]">
        <span className="font-mono text-xs text-dimwhite animate-pulse">
          INITIALIZING MISSION COUNTDOWN ENGINE...
        </span>
      </div>
    );
  }

  return (
    <section id="countdown" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-[1600px] w-full mx-auto">
      {/* Container Card with Technical Cyber Grid Border */}
      <div className="relative rounded-lg bg-surface/90 border border-surface-border p-6 sm:p-10 lg:p-12 shadow-2xl backdrop-blur-xl overflow-hidden">
        {/* Glow Accent inside */}
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-cyan-brand/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-sunrise-brand/10 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header bar */}
        <div className="flex flex-wrap items-center justify-center sm:justify-between gap-4 border-b border-surface-border/60 pb-6 mb-8 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-cyan-brand/10 text-cyan-brand border border-cyan-brand/30">
              <Radio className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-cyan-brand tracking-widest uppercase flex items-center gap-1.5 mb-0.5">
                <span className="text-tertiary">002 /</span>
                <span>{timeLeft.isLive ? "MISSION ARCHIVE" : "MISSION LAUNCH TIMING"} • {EVENT_CONFIG.timezone}</span>
              </span>
              <h2 className="font-mono font-bold text-lg text-offwhite tracking-wider">
                {timeLeft.isLive ? (
                  <span className="text-emerald-400 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                    AASHAV HAS CONCLUDED
                  </span>
                ) : (
                  "UNTIL AASHAV BEGINS"
                )}
              </h2>
            </div>
          </div>

          <div className="font-mono text-xs text-dimwhite flex items-center gap-4 bg-card/60 px-4 py-2 rounded border border-surface-border">
            {timeLeft.isLive ? (
              <>
                <span className="text-emerald-400 flex items-center gap-1.5 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  EVENT CONCLUDED
                </span>
                <span className="text-tertiary">|</span>
                <span>{EVENT_CONFIG.eventDateDisplay}</span>
              </>
            ) : (
              <>
                <span>TARGET: {EVENT_CONFIG.eventDateDisplay}</span>
                <span className="text-tertiary">|</span>
                <span>09:00 AM IST</span>
              </>
            )}
          </div>
        </div>

        {/* Countdown Grid Display / Concluded View */}
        {timeLeft.isLive ? (
          <div className="py-10 sm:py-14 text-center flex flex-col items-center justify-center gap-6 relative">
            {/* Ambient Background Glow inside */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-brand/10 rounded-full blur-3xl pointer-events-none" />

            {/* Badge Icon */}
            <div className="relative inline-flex items-center justify-center p-4 sm:p-5 rounded-2xl bg-surface/90 border border-cyan-brand/30 shadow-[0_0_30px_rgba(0,240,255,0.2)]">
              <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-brand/20 via-violet-brand/20 to-sunrise-brand/20 text-cyan-brand">
                <Award className="w-10 h-10 sm:w-12 sm:h-12 text-cyan-brand" />
              </div>
            </div>

            {/* Title & Subtitle */}
            <div className="space-y-3 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Mission Completed Successfully</span>
              </div>
              <h3 className="font-display font-black text-4xl sm:text-6xl text-offwhite tracking-tight uppercase">
                AASHAV HAS CONCLUDED
              </h3>
              <p className="text-dimwhite font-mono text-sm sm:text-base leading-relaxed">
                The hackathon arena has officially concluded. Heartfelt congratulations to all the winners, innovative participants, mentors, and jury members who made Aashav 2026 an extraordinary benchmark in tech innovation!
              </p>
            </div>

            {/* Direct Gallery Link CTA */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md">
              <Link
                href="/gallery"
                className="w-full sm:w-auto px-8 py-4 rounded-md bg-gradient-to-r from-cyan-brand via-cyan-dim to-violet-brand text-background font-mono font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(0,240,255,0.35)] hover:shadow-[0_0_45px_rgba(0,240,255,0.6)] hover:scale-[1.03] active:scale-[0.98] transition-all group cursor-pointer"
              >
                <Camera className="w-4 h-4 text-background group-hover:scale-110 transition-transform" />
                <span>VIEW EVENT GALLERY</span>
                <ArrowRight className="w-4 h-4 text-background group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href="#winners"
                className="w-full sm:w-auto px-6 py-4 rounded-md bg-card/80 border border-surface-border hover:border-cyan-brand/40 text-offwhite font-mono font-medium text-sm tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-card-hover transition-all"
              >
                <span>HONORED WINNERS</span>
              </a>
            </div>

            {/* Micro Highlights Badges */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5 text-[11px] font-mono text-dimwhite">
              <span className="px-3 py-1 rounded-full bg-card border border-surface-border flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-cyan-brand" />
                Keynote &amp; Dignitaries
              </span>
              <span className="px-3 py-1 rounded-full bg-card border border-surface-border flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-cyan-brand" />
                Idea Pitch Presentations
              </span>
              <span className="px-3 py-1 rounded-full bg-card border border-surface-border flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-cyan-brand" />
                Jury Evaluations
              </span>
              <span className="px-3 py-1 rounded-full bg-card border border-surface-border flex items-center gap-1.5">
                <CheckCircle2 className="w-3 h-3 text-cyan-brand" />
                Award Distribution
              </span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
            {/* Days Unit */}
            <div className="relative bg-card/80 border border-surface-border hover:border-cyan-brand/40 p-6 sm:p-8 rounded-sm flex flex-col items-center justify-center transition-colors">
              <div className="overflow-hidden h-20 sm:h-28 flex items-center justify-center">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={timeLeft.days}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="font-display font-black text-5xl sm:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-b from-offwhite to-dimwhite tracking-tighter"
                  >
                    {pad(timeLeft.days)}
                  </motion.span>
                </AnimatePresence>
              </div>
              <span className="mt-2 font-mono text-xs tracking-widest text-cyan-brand font-bold uppercase">
                DAYS
              </span>
            </div>

            {/* Hours Unit */}
            <div className="relative bg-card/80 border border-surface-border hover:border-cyan-brand/40 p-6 sm:p-8 rounded-sm flex flex-col items-center justify-center transition-colors">
              <div className="overflow-hidden h-20 sm:h-28 flex items-center justify-center">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={timeLeft.hours}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="font-display font-black text-5xl sm:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-b from-offwhite to-dimwhite tracking-tighter"
                  >
                    {pad(timeLeft.hours)}
                  </motion.span>
                </AnimatePresence>
              </div>
              <span className="mt-2 font-mono text-xs tracking-widest text-cyan-brand font-bold uppercase">
                HOURS
              </span>
            </div>

            {/* Minutes Unit */}
            <div className="relative bg-card/80 border border-surface-border hover:border-cyan-brand/40 p-6 sm:p-8 rounded-sm flex flex-col items-center justify-center transition-colors">
              <div className="overflow-hidden h-20 sm:h-28 flex items-center justify-center">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={timeLeft.minutes}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="font-display font-black text-5xl sm:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-b from-offwhite to-dimwhite tracking-tighter"
                  >
                    {pad(timeLeft.minutes)}
                  </motion.span>
                </AnimatePresence>
              </div>
              <span className="mt-2 font-mono text-xs tracking-widest text-cyan-brand font-bold uppercase">
                MINUTES
              </span>
            </div>

            {/* Seconds Unit */}
            <div className="relative bg-card/80 border border-sunrise-brand/30 hover:border-sunrise-brand/60 p-6 sm:p-8 rounded-sm flex flex-col items-center justify-center transition-colors">
              <div className="overflow-hidden h-20 sm:h-28 flex items-center justify-center">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={timeLeft.seconds}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="font-display font-black text-5xl sm:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-b from-sunrise-brand to-sunrise-light tracking-tighter"
                  >
                    {pad(timeLeft.seconds)}
                  </motion.span>
                </AnimatePresence>
              </div>
              <span className="mt-2 font-mono text-xs tracking-widest text-sunrise-brand font-bold uppercase">
                SECONDS
              </span>
            </div>
          </div>
        )}

        {/* Bottom Micro Status */}
        <div className="mt-8 pt-6 border-t border-surface-border/60 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-dimwhite">
          <span className="flex items-center gap-1.5">
            {timeLeft.isLive ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>ARCHIVE ACTIVE • {EVENT_CONFIG.venueName}</span>
              </>
            ) : (
              <>
                <Clock className="w-3.5 h-3.5 text-cyan-brand" />
                <span>SYNCHRONIZED WITH IST (UTC+5:30)</span>
              </>
            )}
          </span>
          {timeLeft.isLive ? (
            <Link
              href="/gallery"
              className="text-cyan-brand hover:text-cyan-light flex items-center gap-1.5 transition-colors font-semibold"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Explore full photo collection &amp; milestones ➔</span>
            </Link>
          ) : (
            <span>Just as excited as you are</span>
          )}
        </div>
      </div>
    </section>
  );
};
