"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ProblemStatement } from "@/types";
import { Sparkles, Pause, Play, Cpu, Zap, Layers } from "lucide-react";
import { motion } from "framer-motion";

interface ProblemStackProps {
  softwareProblems?: ProblemStatement[];
  hardwareProblems?: ProblemStatement[];
  problems?: ProblemStatement[]; // fallback
}

// Single Track Dossier Column Component
const TrackColumn: React.FC<{
  title: string;
  subtitle: string;
  icon: React.ElementType;
  colorTheme: "cyan" | "sunrise";
  problems: ProblemStatement[];
  isPaused: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}> = ({
  title,
  subtitle,
  icon: IconComponent,
  colorTheme,
  problems,
  isPaused,
  onHoverStart,
  onHoverEnd,
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [progress, setProgress] = useState(0);

    const total = problems.length;
    const cycleIntervalMs = 6000;

    const isCyan = colorTheme === "cyan";
    const brandColorClass = isCyan ? "text-cyan-brand" : "text-sunrise-brand";
    const brandBgClass = isCyan ? "bg-cyan-brand/10" : "bg-sunrise-brand/10";
    const brandBorderClass = isCyan ? "border-cyan-brand/30" : "border-sunrise-brand/30";
    const cardBorderClass = isCyan
      ? "border-cyan-brand/60 shadow-[0_10px_35px_rgba(0,240,255,0.12)]"
      : "border-sunrise-brand/60 shadow-[0_10px_35px_rgba(255,107,53,0.12)]";
    const barGradientClass = isCyan
      ? "from-cyan-brand to-cyan-dim"
      : "from-sunrise-brand to-sunrise-light";

    const nextProblem = useCallback(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
      setProgress(0);
    }, [total]);

    const prevProblem = useCallback(() => {
      setCurrentIndex((prev) => (prev - 1 + total) % total);
      setProgress(0);
    }, [total]);

    // Auto-cycling timer & progress bar tick
    useEffect(() => {
      if (isPaused || total <= 1) return;

      const intervalTime = 50;
      const step = (intervalTime / cycleIntervalMs) * 100;

      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            nextProblem();
            return 0;
          }
          return prev + step;
        });
      }, intervalTime);

      return () => clearInterval(timer);
    }, [isPaused, nextProblem, total]);

    // Mobile Touch Swipe Handlers
    const handleTouchStart = (e: React.TouchEvent) => {
      setTouchStart(e.touches[0].clientX);
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
      if (touchStart === null) return;
      const touchEnd = e.changedTouches[0].clientX;
      const diff = touchStart - touchEnd;

      if (diff > 40) {
        nextProblem();
      } else if (diff < -40) {
        prevProblem();
      }
      setTouchStart(null);
    };

    if (!problems || problems.length === 0) return null;

    return (
      <div
        className="flex flex-col h-full rounded-lg bg-surface/70 border border-surface-border p-5 sm:p-7 relative overflow-hidden backdrop-blur-xl"
        onMouseEnter={onHoverStart}
        onMouseLeave={onHoverEnd}
      >
        {/* Track Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-surface-border/60">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded ${brandBgClass} ${brandColorClass} border ${brandBorderClass}`}>
              <IconComponent className="w-5 h-5" />
            </div>
            <div>
              <h3 className={`font-mono font-black text-sm tracking-wider uppercase ${brandColorClass}`}>
                {title}
              </h3>
              <p className="text-[11px] font-mono text-dimwhite">{subtitle}</p>
            </div>
          </div>

          {/* Counter */}
          <div className="flex items-center gap-2 font-mono text-xs">
            <div className="px-2.5 py-1 rounded bg-card border border-surface-border text-dimwhite">
              <span className={`font-bold ${brandColorClass}`}>
                {String(currentIndex + 1).padStart(2, "0")}
              </span>
              <span className="text-tertiary"> / </span>
              <span>{String(total).padStart(2, "0")}</span>
            </div>
          </div>
        </div>

        {/* Progress Line */}
        <div className="w-full h-1 bg-surface-border rounded-full overflow-hidden mb-6">
          <div
            className={`h-full bg-gradient-to-r ${barGradientClass} transition-all duration-75`}
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Stacked Card Display Area */}
        <div
          className="relative min-h-[420px] sm:min-h-[400px] w-full flex items-center justify-center pt-2 pb-6 cursor-grab active:cursor-grabbing select-none"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* 3D Stack Cards */}
          {[-1, 0, 1].map((offset) => {
            const index = (currentIndex + offset + total) % total;
            const item = problems[index];
            const isActive = offset === 0;

            const zIndex = 20 - Math.abs(offset) * 10;
            const translateY = offset * 18;
            const scale = 1 - Math.abs(offset) * 0.06;
            const opacity = isActive ? 1 : 0.35;

            return (
              <motion.div
                key={item.id + "-" + index}
                onClick={() => {
                  if (!isActive) {
                    setCurrentIndex(index);
                    setProgress(0);
                  }
                }}
                layout
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{
                  scale,
                  opacity,
                  y: translateY,
                  zIndex,
                }}
                transition={{
                  type: "spring",
                  stiffness: 320,
                  damping: 28,
                }}
                style={{ zIndex }}
                className={`absolute top-0 w-full rounded-md border backdrop-blur-xl p-5 sm:p-7 transition-all ${isActive
                  ? `bg-card/95 ${cardBorderClass}`
                  : "bg-surface/80 border-surface-border opacity-40 cursor-pointer"
                  }`}
              >
                {/* Card Dossier Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-surface-border/60 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className={`font-mono font-black text-xl sm:text-2xl ${brandColorClass}`}>
                      {item.id}
                    </span>
                  </div>

                  <span className="px-2 py-0.5 rounded bg-surface border border-surface-border text-[11px] font-mono text-cyan-brand">
                    {item.domain}
                  </span>
                </div>

                {/* Title */}
                <h4 className="font-display font-black text-lg sm:text-2xl text-offwhite tracking-tight uppercase leading-snug mb-3">
                  {item.title}
                </h4>

                {/* Description */}
                <p className="text-xs sm:text-sm font-sans text-dimwhite leading-relaxed mb-6">
                  {item.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-surface-border/40 font-mono text-[11px]">
                  <span className="text-dimwhite">{item.category}</span>
                  {isActive && (
                    <span className={`font-bold flex items-center gap-1 ${brandColorClass}`}>
                      <span>DOSSIER ACTIVE</span>
                      <Sparkles className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Select Pill Buttons */}
        <div className="mt-auto pt-4 flex flex-wrap items-center justify-center gap-1.5 border-t border-surface-border/40">
          {problems.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => {
                setCurrentIndex(idx);
                setProgress(0);
              }}
              className={`px-2.5 py-1 rounded font-mono text-[11px] transition-all ${currentIndex === idx
                ? `${brandBgClass} border ${brandBorderClass} ${brandColorClass} font-bold scale-105`
                : "bg-card border border-surface-border text-dimwhite hover:text-offwhite"
                }`}
            >
              {p.id}
            </button>
          ))}
        </div>
      </div>
    );
  };

export const ProblemStack: React.FC<ProblemStackProps> = ({
  softwareProblems = [],
  hardwareProblems = [],
  problems = [],
}) => {
  const sw = softwareProblems.length > 0 ? softwareProblems : problems.filter((p) => !p.id.startsWith("HW"));
  const hw = hardwareProblems.length > 0 ? hardwareProblems : problems.filter((p) => p.id.startsWith("HW"));

  const [isPaused, setIsPaused] = useState(false);

  return (
    <section
      id="problems"
      className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-[1600px] w-full mx-auto overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Header */}
      <div className="mb-10 space-y-3">
        <div className="flex flex-col lg:flex-row items-center text-center lg:items-end lg:text-left justify-between gap-6">
          <div className="flex flex-col items-center lg:items-start">
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-brand tracking-widest uppercase mb-2">
              <span className="text-tertiary">004 /</span>
              <span>TECHNICAL DOSSIER &amp; PROBLEM STATEMENTS</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-6xl text-offwhite tracking-tight uppercase leading-tight">
              CHOOSE THE PROBLEM <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sunrise-brand via-cyan-brand to-violet-brand">
                YOU WANT TO SOLVE.
              </span>
            </h2>
          </div>

          {/* Global Play/Pause Button */}
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-2.5 rounded-lg bg-surface/90 hover:bg-surface border border-surface-border text-dimwhite hover:text-cyan-brand transition-colors flex items-center gap-2 font-mono text-xs shadow-md"
            title={isPaused ? "Resume Both Timers" : "Pause Both Timers"}
          >
            {isPaused ? <Play className="w-4 h-4 text-cyan-brand" /> : <Pause className="w-4 h-4 text-sunrise-brand" />}
            <span className="hidden sm:inline">{isPaused ? "RESUME TIMERS" : "PAUSE TIMERS"}</span>
          </button>
        </div>

        {/* Subtitle Lines */}
        <p className="text-center lg:text-left text-xs sm:text-sm font-mono text-dimwhite max-w-3xl pt-2">
          Choose from the problem statements below or bring your own <br />
          We welcome custom real-world problem statements!
        </p>
      </div>

      {/* Dual Column Layout (Left Software, Right Hardware) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <TrackColumn
          title={`SOFTWARE TRACK`}
          subtitle="AI/ML, Web, Mobile, Cloud, GIS & Data Analytics"
          icon={Cpu}
          colorTheme="cyan"
          problems={sw}
          isPaused={isPaused}
          onHoverStart={() => setIsPaused(true)}
          onHoverEnd={() => setIsPaused(false)}
        />

        <TrackColumn
          title={`HARDWARE TRACK`}
          subtitle="IoT, Embedded Systems, Robotics, Sensors & Microgrids"
          icon={Zap}
          colorTheme="sunrise"
          problems={hw}
          isPaused={isPaused}
          onHoverStart={() => setIsPaused(true)}
          onHoverEnd={() => setIsPaused(false)}
        />
      </div>
    </section>
  );
};
