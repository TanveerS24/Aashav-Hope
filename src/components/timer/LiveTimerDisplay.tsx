"use client";

import React, { useState, useEffect } from "react";
import { useTimerSync } from "@/hooks/useTimerSync";
import { DigitalSegment, ColonSeparator } from "./DigitalSegment";
import { Clock } from "lucide-react";

export const LiveTimerDisplay: React.FC = () => {
  const { timer, formattedTime, status, isLoading, isOnline } = useTimerSync();
  const [sysTime, setSysTime] = useState<string>("");

  // Real-time 1-second system clock ticker
  useEffect(() => {
    const updateSysTime = () => {
      setSysTime(new Date().toLocaleTimeString());
    };
    updateSysTime();
    const interval = setInterval(updateSysTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const isNotStarted = status === "NOT_STARTED";
  const isFinished = status === "FINISHED";
  const isPaused = status === "PAUSED";
  const isRunning = status === "RUNNING";

  return (
    <main
      className="fixed inset-0 z-50 overflow-hidden bg-white text-slate-900 flex flex-col justify-between select-none"
      role="region"
      aria-label="Aashav Hackathon Official Live Timer"
    >
      {/* Background Geometric & Academic Network Motif (Inspired by Brochure) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `radial-gradient(#0284c7 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />

        {/* Clean top subtle accent line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-sky-500 via-blue-700 to-sky-500" />

        {/* Subtle geometric corner brackets */}
        <div className="absolute top-6 left-6 w-16 h-16 border-t-2 border-l-2 border-sky-600/30 rounded-tl-lg" />
        <div className="absolute top-6 right-6 w-16 h-16 border-t-2 border-r-2 border-sky-600/30 rounded-tr-lg" />
        <div className="absolute bottom-6 left-6 w-16 h-16 border-b-2 border-l-2 border-sky-600/30 rounded-bl-lg" />
        <div className="absolute bottom-6 right-6 w-16 h-16 border-b-2 border-r-2 border-sky-600/30 rounded-br-lg" />

        {/* Soft background light blue glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[1200px] h-[60vh] bg-sky-100/40 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* 1. TOP HEADER: Institutional & Event Identity */}
      <header className="relative z-10 w-full pt-4 sm:pt-6 md:pt-8 px-8 sm:px-12 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-sky-600 animate-pulse" />
          <div className="text-left">
            <p className="text-[10px] sm:text-xs md:text-sm font-semibold tracking-[0.2em] text-slate-500 uppercase">
              SIMATS School of Engineering
            </p>
            <p className="text-[9px] sm:text-[11px] font-medium tracking-wider text-sky-700">
              Department of Machine Learning
            </p>
          </div>
        </div>

        {/* Live Server Sync Status */}
        <div className="flex items-center gap-3">
          <div
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors ${
              isOnline
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-amber-50 text-amber-700 border border-amber-200"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isOnline ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
              }`}
            />
            {isOnline ? "SYNCED" : "OFFLINE"}
          </div>
        </div>
      </header>

      {/* 2. HERO CENTER: The Iconic Branding & The Gigantic Countdown Display */}
      <section className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-8 py-2 md:py-4">
        {/* Event Hero Title */}
        <div className="text-center mb-4 sm:mb-6 md:mb-8 lg:mb-10">
          <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight text-slate-950 font-display">
              AASHAV
            </h1>
            <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-sky-600 font-display">
              2026
            </span>
          </div>

          <p className="mt-1 sm:mt-2 text-xs sm:text-sm md:text-base lg:text-lg font-bold tracking-[0.35em] text-slate-600 uppercase">
            &ldquo;THE HOPE&rdquo;
          </p>

          <div className="inline-flex items-center justify-center mt-2 sm:mt-3 px-4 py-1 rounded-full bg-sky-50 border border-sky-200/90 text-sky-800 text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase">
            <Clock size={13} className="mr-2 text-sky-600" />
            Hackathon Timer
          </div>
        </div>

        {/* Loading State or Digital Timer Display */}
        {isLoading ? (
          <div className="flex items-center gap-4 py-12 text-slate-400 animate-pulse">
            <span className="text-4xl sm:text-6xl font-mono font-bold tracking-widest">
              INITIALIZING...
            </span>
          </div>
        ) : (
          <div
            className="flex items-center justify-center gap-1 sm:gap-2 md:gap-4 lg:gap-6 my-2 sm:my-4 max-w-full"
            aria-live="polite"
            aria-atomic="true"
          >
            <DigitalSegment
              value={formattedTime.hours}
              label="Hours"
              isPlaceholder={false}
              theme="light"
              size="hero"
            />
            <ColonSeparator theme="light" size="hero" />
            <DigitalSegment
              value={formattedTime.minutes}
              label="Minutes"
              isPlaceholder={false}
              theme="light"
              size="hero"
            />
            <ColonSeparator theme="light" size="hero" />
            <DigitalSegment
              value={formattedTime.seconds}
              label="Seconds"
              isPlaceholder={false}
              theme="light"
              size="hero"
            />
          </div>
        )}

        {/* Live Status Indicator Banner */}
        <div className="mt-4 sm:mt-6 md:mt-8 text-center">
          {isNotStarted && (
            <div className="inline-flex items-center gap-2.5 px-6 py-2 rounded-full bg-slate-100 border border-slate-300 text-slate-700 text-sm sm:text-base md:text-lg font-bold tracking-widest uppercase shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500 animate-ping" />
              Waiting to Start
            </div>
          )}

          {isRunning && (
            <div className="inline-flex items-center gap-2.5 px-6 py-2 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-sm sm:text-base md:text-lg font-bold tracking-widest uppercase shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              Hackathon Live
            </div>
          )}

          {isPaused && (
            <div className="inline-flex items-center gap-2.5 px-6 py-2 rounded-full bg-amber-50 border border-amber-300 text-amber-800 text-sm sm:text-base md:text-lg font-bold tracking-widest uppercase shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              Timer Paused
            </div>
          )}

          {isFinished && (
            <div className="inline-flex items-center gap-2.5 px-8 py-2.5 rounded-full bg-rose-50 border border-rose-300 text-rose-800 text-base sm:text-lg md:text-xl font-extrabold tracking-widest uppercase shadow-sm animate-bounce">
              <span className="w-3 h-3 rounded-full bg-rose-600" />
              Time&apos;s Up — Hackathon Concluded
            </div>
          )}
        </div>
      </section>

      {/* 3. MINIMAL BOTTOM TELEMETRY BAR */}
      <footer className="relative z-10 w-full pb-4 sm:pb-6 px-8 sm:px-12 flex justify-between items-center text-[10px] sm:text-xs font-mono text-slate-400">
        <div className="tracking-widest">
          NATIONAL GRADE ENGINEERING HACKATHON
        </div>
        <div className="tracking-widest">
          SYS CLOCK: {sysTime || "--:--:--"}
        </div>
      </footer>
    </main>
  );
};
