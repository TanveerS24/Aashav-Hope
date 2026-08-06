"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { ProblemStatement } from "@/types";
import { ChevronLeft, ChevronRight, Layers, ExternalLink, Sparkles, Terminal, Pause, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProblemStackProps {
  problems: ProblemStatement[];
}

export const ProblemStack: React.FC<ProblemStackProps> = ({ problems }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);

  const total = problems.length;
  const cycleIntervalMs = 6000;

  const nextProblem = useCallback(() => {
    setCurrentIndex((prev: number) => (prev + 1) % total);
    setProgress(0);
  }, [total]);

  const prevProblem = useCallback(() => {
    setCurrentIndex((prev: number) => (prev - 1 + total) % total);
    setProgress(0);
  }, [total]);

  // Auto-cycling timer & progress bar tick
  useEffect(() => {
    if (isPaused) return;

    const intervalTime = 50; // Update progress every 50ms
    const step = (intervalTime / cycleIntervalMs) * 100;

    const timer = setInterval(() => {
      setProgress((prev: number) => {
        if (prev >= 100) {
          nextProblem();
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPaused, nextProblem]);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const section = document.getElementById("problems");
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

      if (isVisible) {
        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
          nextProblem();
        } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
          prevProblem();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextProblem, prevProblem]);

  // Mobile Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    if (diff > 50) {
      nextProblem();
    } else if (diff < -50) {
      prevProblem();
    }
    setTouchStart(null);
  };

  if (!problems || problems.length === 0) return null;

  return (
    <section
      id="problems"
      className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-cyan-brand tracking-widest uppercase mb-2">
            <span className="text-tertiary">003 /</span>
            <span>TECHNICAL DOSSIER & PROBLEM STATEMENTS</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-6xl text-offwhite tracking-tight uppercase leading-tight">
            CHOOSE THE PROBLEM <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sunrise-brand via-cyan-brand to-violet-brand">
              YOU WANT TO SOLVE.
            </span>
          </h2>
        </div>

        {/* Play/Pause & Counter Controls */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-surface/80 border border-surface-border text-xs font-mono text-dimwhite">
            <span className="text-cyan-brand font-bold">
              {String(currentIndex + 1).padStart(2, "0")}
            </span>
            <span className="text-tertiary">/</span>
            <span>{String(total).padStart(2, "0")}</span>
          </div>

          <button
            onClick={() => setIsPaused(!isPaused)}
            className="p-2 rounded bg-surface/80 hover:bg-surface border border-surface-border hover:border-cyan-brand/40 text-dimwhite hover:text-cyan-brand transition-colors"
            title={isPaused ? "Resume Auto-Rotation" : "Pause Auto-Rotation"}
            aria-label={isPaused ? "Resume Auto-Rotation" : "Pause Auto-Rotation"}
          >
            {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={prevProblem}
              className="p-2 rounded bg-surface/80 hover:bg-surface border border-surface-border hover:border-cyan-brand text-offwhite transition-colors"
              aria-label="Previous Problem Statement"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextProblem}
              className="p-2 rounded bg-surface/80 hover:bg-surface border border-surface-border hover:border-cyan-brand text-offwhite transition-colors"
              aria-label="Next Problem Statement"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Animated Progress Bar */}
      <div className="w-full h-1 bg-surface-border rounded-full overflow-hidden mb-8">
        <motion.div
          className="h-full bg-gradient-to-r from-cyan-brand to-sunrise-brand"
          style={{ width: `${progress}%` }}
          transition={{ ease: "linear" }}
        />
      </div>

      {/* Stacked Folder / Dossier Container */}
      <div
        className="relative min-h-[520px] sm:min-h-[460px] w-full flex items-center justify-center pt-8 pb-12 cursor-grab active:cursor-grabbing select-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Render visible stack layers behind active layer */}
        {[-2, -1, 0, 1, 2].map((offset) => {
          const index = (currentIndex + offset + total) % total;
          const item = problems[index];
          const isActive = offset === 0;

          // 3D Stacking transforms
          const zIndex = 30 - Math.abs(offset) * 10;
          const translateY = offset * 24;
          const scale = 1 - Math.abs(offset) * 0.05;
          const opacity = isActive ? 1 : Math.abs(offset) === 1 ? 0.45 : 0.2;

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
                stiffness: 300,
                damping: 26,
              }}
              style={{ zIndex }}
              className={`absolute top-0 w-full max-w-4xl rounded-md border backdrop-blur-xl p-6 sm:p-10 transition-all ${
                isActive
                  ? "bg-card/95 border-cyan-brand/60 shadow-[0_10px_40px_rgba(0,240,255,0.15)] hover:border-cyan-brand"
                  : "bg-surface/80 border-surface-border hover:border-dimwhite/40 cursor-pointer"
              }`}
            >
              {/* Dossier Header Tab */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-surface-border/60 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <span className="font-mono font-black text-2xl sm:text-3xl text-cyan-brand">
                    {item.id}
                  </span>
                  <div className="h-4 w-[1px] bg-surface-border" />
                  <span className="text-[11px] font-mono tracking-widest text-sunrise-brand uppercase bg-sunrise-brand/10 border border-sunrise-brand/30 px-2 py-0.5 rounded">
                    {item.source}
                  </span>
                </div>

                <div className="flex items-center gap-3 font-mono text-xs text-dimwhite">
                  <span className="px-2.5 py-1 rounded bg-surface border border-surface-border text-cyan-brand">
                    {item.domain}
                  </span>
                  <span className="hidden sm:inline px-2.5 py-1 rounded bg-surface border border-surface-border text-dimwhite">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Dossier Title */}
              <h3 className="font-display font-black text-2xl sm:text-4xl text-offwhite tracking-tight uppercase leading-snug mb-4">
                {item.title}
              </h3>

              {/* Dossier Description */}
              <p className="text-sm sm:text-base font-sans text-dimwhite leading-relaxed mb-8 max-w-3xl">
                {item.description}
              </p>

              {/* Dossier Footer Specs */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-surface-border/40 font-mono text-xs">
                <div className="flex items-center gap-4 text-dimwhite">
                  <span>COMPLEXITY: <strong className="text-offwhite">{item.complexity}</strong></span>
                  <span className="text-tertiary">•</span>
                  <span>SIH FORMAT: <strong className="text-cyan-brand">VERIFIED</strong></span>
                </div>

                {isActive && (
                  <div className="flex items-center gap-2 text-cyan-brand font-bold tracking-wider">
                    <span>FOCUS DOSSIER ACTIVE</span>
                    <Sparkles className="w-4 h-4" />
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Layer Navigation Quick Bar */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
        {problems.map((p: ProblemStatement, idx: number) => (
          <button
            key={p.id}
            onClick={() => {
              setCurrentIndex(idx);
              setProgress(0);
            }}
            className={`px-3 py-1.5 rounded font-mono text-xs transition-all ${
              currentIndex === idx
                ? "bg-cyan-brand/20 border border-cyan-brand text-cyan-brand font-bold scale-105"
                : "bg-surface/60 border border-surface-border text-dimwhite hover:text-offwhite hover:border-surface-border"
            }`}
          >
            {p.id}
          </button>
        ))}
      </div>
    </section>
  );
};
