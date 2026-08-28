"use client";

import React from "react";
import { EVENT_CONFIG } from "@/config/event";
import { useCountdown } from "@/hooks/useCountdown";
import { ArrowDown, ArrowUpRight, Sparkles, Terminal, Shield, Users, Cpu, Clock, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

export const HeroSection: React.FC = () => {
  const timeLeft = useCountdown(EVENT_CONFIG.countdownTargetISO);

  const handleRegisterClick = () => {
    if (EVENT_CONFIG.registrationUrl.includes("PLACEHOLDER")) {
      alert(
        "Registration URL is configured as a placeholder. Replace 'registrationUrl' in src/config/event.ts with your active form URL."
      );
    } else {
      window.open(EVENT_CONFIG.registrationUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-[1600px] w-full mx-auto overflow-hidden"
    >
      {/* Main Title & Hero Visual Composition */}
      <div className="my-auto z-10 py-6 flex flex-col items-center text-center justify-center w-full">
        {/* Sub-label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center justify-center gap-2 mb-4"
        >
          <Terminal className="w-4 h-4 text-sunrise-brand" />
          <span className="text-xs sm:text-sm font-mono tracking-widest text-dimwhite uppercase text-center">
            SIMATS SCHOOL OF ENGINEERING • DEPARTMENT OF MACHINE LEARNING PRESENTS
          </span>
        </motion.div>

        {/* Massive Typography Hero Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full text-center"
        >
          {/* Main Oversized Title */}
          <h1 className="font-display font-black text-5xl sm:text-8xl md:text-9xl lg:text-[11rem] leading-[0.85] tracking-tight uppercase select-none text-transparent bg-clip-text bg-gradient-to-br from-offwhite via-offwhite to-dimwhite text-center">
            AASHAV
          </h1>

          {/* Integrated THE HOPE / 2026 Graphic Element */}
          <div className="flex flex-wrap items-baseline justify-center gap-4 sm:gap-6 mt-2 md:-mt-4">
            <span className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-sunrise-brand via-cyan-brand to-violet-brand">
              THE HOPE
            </span>
            <span className="font-mono text-xl sm:text-3xl text-cyan-brand/80 font-light tracking-widest">
              / 2026
            </span>
            <div className="h-[2px] w-24 bg-gradient-to-r from-cyan-brand/50 to-transparent self-center hidden sm:block" />
          </div>
        </motion.div>

        {/* Tagline & Purpose Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-6 max-w-3xl text-center mx-auto space-y-2"
        >
          <p className="text-lg sm:text-2xl text-offwhite font-medium tracking-wide">
            &quot;{EVENT_CONFIG.tagline}&quot;
          </p>
          <p className="text-base sm:text-lg text-dimwhite font-light">
            A National-grade inter-college hybrid hackathon solving real-world high-impact problem statements.
          </p>
        </motion.div>

        {/* Key Event Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 font-mono text-xs"
        >
          <div className="px-3 py-1.5 rounded-sm bg-surface/90 border border-amber-400/30 text-amber-400 flex items-center gap-2 bg-amber-400/5">
            <Users className="w-3.5 h-3.5 text-amber-400" />
            <span>{EVENT_CONFIG.teamSizeDisplay}</span>
          </div>

          <div className="px-3 py-1.5 rounded-sm bg-surface/90 border border-emerald-400/30 text-emerald-400 flex items-center gap-2 bg-emerald-400/5">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>{EVENT_CONFIG.mode}</span>
          </div>

          <div className="px-3 py-1.5 rounded-sm bg-surface/90 border border-cyan-brand/30 text-cyan-brand flex items-center gap-2 bg-cyan-brand/5">
            <Cpu className="w-3.5 h-3.5 text-cyan-brand" />
            <span>HARDWARE &amp; SOFTWARE TRACKS</span>
          </div>

          <div className="px-3 py-1.5 rounded-sm bg-surface/90 border border-sunrise-brand/30 text-sunrise-brand flex items-center gap-2 bg-sunrise-brand/5">
            <Sparkles className="w-3.5 h-3.5 text-sunrise-brand" />
            <span>{EVENT_CONFIG.winnerCount} WINNING TEAMS HONORED</span>
          </div>
        </motion.div>

        {/* Synced Live Countdown Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-6 flex items-center justify-center"
        >
          <a
            href="#countdown"
            className="px-4 py-1.5 rounded-full bg-cyan-brand/10 border border-cyan-brand/40 text-cyan-brand font-mono text-xs flex items-center gap-2 hover:bg-cyan-brand/20 transition-all shadow-[0_0_20px_rgba(0,240,255,0.15)] group"
          >
            <Clock className="w-3.5 h-3.5 animate-pulse text-cyan-brand" />
            <span>MISSION LAUNCH IN: <strong className="text-offwhite font-bold">{timeLeft.formatted}</strong></span>
          </a>
        </motion.div>

        {/* Short Timeline Revision Disclaimer Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.58 }}
          className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sunrise-brand/10 border border-sunrise-brand/40 text-dimwhite backdrop-blur-md shadow-[0_0_15px_rgba(255,107,53,0.12)] font-mono text-[11px] sm:text-xs"
        >
          <AlertTriangle className="w-3.5 h-3.5 text-sunrise-brand shrink-0 animate-pulse" />
          <span>
            <strong className="text-sunrise-brand uppercase tracking-wider font-bold">Notice:</strong>{" "}
            Reg Closes <strong className="text-offwhite font-semibold">24 Aug, 12 PM</strong> • Shortlist <strong className="text-offwhite font-semibold">25 Aug, 12 PM</strong>
          </span>
          <a
            href="#timeline"
            className="text-cyan-brand hover:underline ml-1 font-semibold flex items-center gap-0.5"
          >
            Roadmap ➔
          </a>
        </motion.div>

        {/* Hero Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4 w-full sm:w-auto"
        >
          <button
            disabled
            className="w-full sm:w-auto px-8 py-4 rounded-sm bg-surface/90 border border-rose-500/40 text-rose-300/90 font-mono font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(244,63,94,0.15)] cursor-not-allowed opacity-90 select-none"
          >
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <span>REGISTRATION CLOSED</span>
          </button>

          <a
            href="#problems"
            className="w-full sm:w-auto px-8 py-4 rounded-sm bg-surface/80 hover:bg-surface border border-surface-border hover:border-cyan-brand/40 text-offwhite font-mono text-sm tracking-wider uppercase flex items-center justify-center gap-3 transition-all"
          >
            <span>EXPLORE PROBLEMS</span>
            <ArrowDown className="w-4 h-4 text-cyan-brand" />
          </a>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="z-10 flex items-center justify-center pt-2 text-xs font-mono text-dimwhite"
      >
        <a
          href="#about"
          className="flex items-center gap-2 text-dimwhite hover:text-cyan-brand transition-colors group"
        >
          <span>SCROLL FOR INTRO &amp; MISSION</span>
          <ArrowDown className="w-4 h-4 text-cyan-brand group-hover:translate-y-1 transition-transform animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
};
