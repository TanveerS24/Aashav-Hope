"use client";

import React from "react";
import { EVENT_CONFIG } from "@/config/event";
import { ArrowDown, ArrowUpRight, Sparkles, Terminal, Shield, Users, MapPin, Calendar } from "lucide-react";
import { motion } from "framer-motion";

export const HeroSection: React.FC = () => {
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
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Top Meta System Badge */}
      <div className="flex flex-wrap items-center justify-between gap-4 z-10 pt-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface/80 border border-cyan-brand/30 backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-brand opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-brand"></span>
          </span>
          <span className="text-[11px] font-mono tracking-widest text-cyan-brand uppercase font-medium">
            OFFICIAL SIH 2026 PREPARATION WARM-UP
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="hidden sm:flex items-center gap-4 text-xs font-mono text-dimwhite"
        >
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-sunrise-brand" />
            {EVENT_CONFIG.venueName}
          </span>
          <span className="text-tertiary">|</span>
          <span className="flex items-center gap-1.5 text-cyan-brand">
            <Calendar className="w-3.5 h-3.5" />
            {EVENT_CONFIG.eventDateDisplay}
          </span>
        </motion.div>
      </div>

      {/* Main Title & Hero Visual Composition */}
      <div className="my-auto z-10 py-10 flex flex-col items-start justify-center">
        {/* Sub-label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center gap-2 mb-4"
        >
          <Terminal className="w-4 h-4 text-sunrise-brand" />
          <span className="text-xs sm:text-sm font-mono tracking-widest text-dimwhite uppercase">
            SIMATS SCHOOL OF ENGINEERING PRESENTS
          </span>
        </motion.div>

        {/* Massive Typography Hero Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full"
        >
          {/* Main Oversized Title */}
          <h1 className="font-display font-black text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] leading-[0.85] tracking-tight uppercase select-none text-transparent bg-clip-text bg-gradient-to-br from-offwhite via-offwhite to-dimwhite">
            AASHAV
          </h1>

          {/* Integrated HOPE / 2026 Graphic Element */}
          <div className="flex flex-wrap items-baseline gap-4 sm:gap-6 mt-2 md:-mt-4">
            <span className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-sunrise-brand via-cyan-brand to-violet-brand">
              HOPE
            </span>
            <span className="font-mono text-xl sm:text-3xl text-cyan-brand/80 font-light tracking-widest">
              / 2026
            </span>
            <div className="h-[2px] flex-grow max-w-xs bg-gradient-to-r from-cyan-brand/50 to-transparent self-center hidden sm:block" />
          </div>
        </motion.div>

        {/* Tagline & Purpose Statement */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-6 max-w-2xl text-base sm:text-xl text-dimwhite font-sans font-light leading-relaxed"
        >
          &quot;{EVENT_CONFIG.tagline}&quot; — An industry-grade hybrid hackathon solving real previous-year Smart India Hackathon problem statements.
        </motion.p>

        {/* Key Event Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4 font-mono text-xs"
        >
          <div className="px-3 py-1.5 rounded-sm bg-surface/90 border border-surface-border text-offwhite flex items-center gap-2">
            <Users className="w-3.5 h-3.5 text-cyan-brand" />
            <span>{EVENT_CONFIG.teamSizeDisplay}</span>
          </div>

          <div className="px-3 py-1.5 rounded-sm bg-surface/90 border border-surface-border text-offwhite flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-violet-brand" />
            <span>{EVENT_CONFIG.mode}</span>
          </div>

          <div className="px-3 py-1.5 rounded-sm bg-surface/90 border border-sunrise-brand/30 text-sunrise-brand flex items-center gap-2 bg-sunrise-brand/5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{EVENT_CONFIG.winnerCount} WINNING TEAMS HONORED</span>
          </div>
        </motion.div>

        {/* Hero Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-10 flex flex-wrap items-center gap-4 w-full sm:w-auto"
        >
          <button
            onClick={handleRegisterClick}
            className="w-full sm:w-auto px-8 py-4 rounded-sm bg-gradient-to-r from-cyan-brand via-cyan-dim to-violet-brand text-background font-mono font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(0,240,255,0.3)] hover:shadow-[0_0_45px_rgba(0,240,255,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all group"
          >
            <span>REGISTER NOW</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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

      {/* Hero Bottom Bar & Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="z-10 flex items-center justify-between border-t border-surface-border/40 pt-6 text-xs font-mono text-dimwhite"
      >
        <div className="flex items-center gap-4">
          <span className="text-cyan-brand font-bold">001</span>
          <span className="text-tertiary">/</span>
          <span>INTRO & MISSION</span>
        </div>

        <a
          href="#countdown"
          className="flex items-center gap-2 text-dimwhite hover:text-cyan-brand transition-colors group"
        >
          <span className="hidden sm:inline">LAUNCH COUNTDOWN</span>
          <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
        </a>
      </motion.div>
    </section>
  );
};
