"use client";

import React, { useState, useEffect } from "react";
import { EVENT_CONFIG } from "@/config/event";
import { useCountdown } from "@/hooks/useCountdown";
import { Clock, ShieldAlert, Radio } from "lucide-react";
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
                <span>MISSION LAUNCH TIMING • {EVENT_CONFIG.timezone}</span>
              </span>
              <h2 className="font-mono font-bold text-lg text-offwhite tracking-wider">
                {timeLeft.isLive ? (
                  <span className="text-sunrise-brand flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-sunrise-brand animate-ping" />
                    AASHAV IS LIVE NOW
                  </span>
                ) : (
                  "UNTIL AASHAV BEGINS"
                )}
              </h2>
            </div>
          </div>

          <div className="font-mono text-xs text-dimwhite flex items-center gap-4 bg-card/60 px-4 py-2 rounded border border-surface-border">
            <span>TARGET: {EVENT_CONFIG.eventDateDisplay}</span>
            <span className="text-tertiary">|</span>
            <span>09:00 AM IST</span>
          </div>
        </div>

        {/* Countdown Grid Display */}
        {timeLeft.isLive ? (
          <div className="py-12 text-center flex flex-col items-center justify-center gap-4">
            <div className="inline-flex items-center justify-center p-4 rounded-full bg-sunrise-brand/20 border border-sunrise-brand text-sunrise-brand">
              <ShieldAlert className="w-12 h-12 animate-bounce" />
            </div>
            <h3 className="font-display font-black text-4xl sm:text-6xl text-offwhite tracking-tight uppercase">
              AASHAV IS LIVE
            </h3>
            <p className="text-dimwhite font-mono text-sm max-w-md">
              The hackathon arena is open. Teams are actively building solutions to industry problem statements.
            </p>
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
        <div className="mt-8 pt-6 border-t border-surface-border/60 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-dimwhite">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-cyan-brand" />
            SYNCHRONIZED WITH IST (UTC+5:30)
          </span>
          <span>Just as excited as you are</span>
        </div>
      </div>
    </section>
  );
};
