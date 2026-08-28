"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Sliders, Presentation, Sparkles, Plus, Settings } from "lucide-react";

export const StandaloneTimer: React.FC = () => {
  // Editable duration inputs (default 5 minutes 00 seconds)
  const [inputMinutes, setInputMinutes] = useState<number>(5);
  const [inputSeconds, setInputSeconds] = useState<number>(0);

  // Local Timer State
  const [remainingSeconds, setRemainingSeconds] = useState<number>(5 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [showControls, setShowControls] = useState<boolean>(true);
  const [sysTime, setSysTime] = useState<string>("");

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Real-time 1-second system clock
  useEffect(() => {
    const updateSysTime = () => {
      setSysTime(new Date().toLocaleTimeString());
    };
    updateSysTime();
    const interval = setInterval(updateSysTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Local countdown tick
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setRemainingSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            setIsRunning(false);
            setIsPaused(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const handleStart = () => {
    if (!isPaused && remainingSeconds === 0) {
      const total = inputMinutes * 60 + inputSeconds;
      setRemainingSeconds(total > 0 ? total : 5 * 60);
    }
    setIsRunning(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsRunning(false);
    setIsPaused(true);
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsPaused(false);
    const total = inputMinutes * 60 + inputSeconds;
    setRemainingSeconds(total > 0 ? total : 5 * 60);
  };

  const addTime = (secsToAdd: number) => {
    setRemainingSeconds((prev) => prev + secsToAdd);
  };

  const handleMinutesChange = (val: number) => {
    const safeM = Math.max(0, Math.min(180, val));
    setInputMinutes(safeM);
    if (!isRunning && !isPaused) {
      setRemainingSeconds(safeM * 60 + inputSeconds);
    }
  };

  const handleSecondsChange = (val: number) => {
    const safeS = Math.max(0, Math.min(59, val));
    setInputSeconds(safeS);
    if (!isRunning && !isPaused) {
      setRemainingSeconds(inputMinutes * 60 + safeS);
    }
  };

  // Formatted MM : SS (No hours!)
  const m = Math.floor(remainingSeconds / 60);
  const s = remainingSeconds % 60;

  const formattedMinutes = String(m).padStart(2, "0");
  const formattedSeconds = String(s).padStart(2, "0");

  const isFinished = remainingSeconds === 0 && !isRunning && !isPaused;
  const isNotStarted = !isRunning && !isPaused && !isFinished;
  const isLastMinute = isRunning && remainingSeconds <= 60 && remainingSeconds > 0;

  return (
    <main
      className="fixed inset-0 z-50 overflow-hidden bg-gradient-to-br from-slate-950 via-[#071933] to-[#0a2347] text-white flex flex-col justify-between select-none"
      role="region"
      aria-label="Aashav Hackathon Idea Presentation Timer"
    >
      {/* Dynamic Deep Blue Geometric & Academic Network Motif */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Subtle grid pattern in vibrant sky blue */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: `radial-gradient(#38bdf8 1px, transparent 1px)`,
            backgroundSize: "36px 36px",
          }}
        />

        {/* Top vibrant sky blue accent line */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-sky-400 via-cyan-300 to-blue-500 shadow-lg shadow-sky-500/20" />

        {/* Corner geometric brackets in luminous blue */}
        <div className="absolute top-6 left-6 w-16 h-16 border-t-2 border-l-2 border-sky-400/40 rounded-tl-lg" />
        <div className="absolute top-6 right-6 w-16 h-16 border-t-2 border-r-2 border-sky-400/40 rounded-tr-lg" />
        <div className="absolute bottom-6 left-6 w-16 h-16 border-b-2 border-l-2 border-sky-400/40 rounded-bl-lg" />
        <div className="absolute bottom-6 right-6 w-16 h-16 border-b-2 border-r-2 border-sky-400/40 rounded-br-lg" />

        {/* Center luminous deep sky-blue radiance */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] max-w-[1000px] h-[55vh] bg-sky-500/15 rounded-full blur-[100px] pointer-events-none" />
      </div>

      {/* 1. TOP HEADER */}
      <header className="relative z-10 w-full pt-4 sm:pt-6 md:pt-8 px-8 sm:px-12 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-sm shadow-cyan-400" />
          <div className="text-left">
            <p className="text-[10px] sm:text-xs md:text-sm font-semibold tracking-[0.2em] text-slate-400 uppercase">
              SIMATS School of Engineering
            </p>
            <p className="text-[9px] sm:text-[11px] font-medium tracking-wider text-sky-400">
              Department of Machine Learning
            </p>
          </div>
        </div>

        {/* Toggle Controls Visibility Button */}
        <button
          onClick={() => setShowControls((prev) => !prev)}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-sky-950/70 hover:bg-sky-900/80 text-sky-300 border border-sky-600/40 text-xs font-semibold transition-all shadow-md"
        >
          <Sliders size={13} />
          {showControls ? "Hide Inputs" : "Edit Inputs"}
        </button>
      </header>

      {/* 2. HERO CENTER: Idea Presentation Timer (MM : SS) */}
      <section className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-8 py-2 md:py-4">
        {/* Event Hero Title */}
        <div className="text-center mb-3 sm:mb-5 md:mb-6">
          <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight text-white font-display">
              AASHAV
            </h1>
            <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-sky-400 font-display">
              2026
            </span>
          </div>

          <p className="mt-1 sm:mt-2 text-xs sm:text-sm md:text-base font-bold tracking-[0.35em] text-slate-300 uppercase">
            &ldquo;THE HOPE&rdquo;
          </p>

          <div className="inline-flex items-center justify-center mt-2 px-4 py-1 rounded-full bg-sky-500/15 border border-sky-400/40 text-sky-200 text-xs sm:text-sm font-semibold tracking-[0.25em] uppercase shadow-sm">
            <Presentation size={14} className="mr-2 text-sky-300" />
            Idea Presentation Timer
          </div>
        </div>

        {/* The Giant MM : SS Digital Display (Deep Blue Themed) */}
        <div
          className={`flex items-center justify-center gap-2 sm:gap-4 md:gap-8 lg:gap-10 my-2 sm:my-4 max-w-full transition-transform duration-300 ${
            isLastMinute ? "scale-105" : ""
          }`}
          aria-live="polite"
          aria-atomic="true"
        >
          {/* Minutes Segment */}
          <div className="flex flex-col items-center select-none">
            <div
              className={`relative rounded-2xl md:rounded-3xl flex items-center justify-center font-mono font-bold tracking-tight leading-none text-7xl sm:text-8xl md:text-9xl lg:text-[11rem] xl:text-[13rem] px-5 sm:px-8 py-3 sm:py-6 shadow-2xl transition-all ${
                isLastMinute
                  ? "bg-amber-950/70 border-2 border-amber-500/70 text-amber-300 shadow-amber-500/20 animate-pulse"
                  : isFinished
                  ? "bg-rose-950/70 border-2 border-rose-500/70 text-rose-300 shadow-rose-500/20"
                  : "bg-slate-900/90 border-2 border-sky-500/40 text-sky-100 shadow-sky-950/50"
              }`}
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {/* Corner accents */}
              <span className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-sky-400/50 rounded-tl-sm" />
              <span className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-sky-400/50 rounded-tr-sm" />
              <span className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-sky-400/50 rounded-bl-sm" />
              <span className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-sky-400/50 rounded-br-sm" />

              <span className="drop-shadow-md">{formattedMinutes}</span>
            </div>
            <span className="uppercase font-sans text-xs sm:text-sm md:text-base lg:text-lg tracking-[0.25em] font-semibold text-sky-300/80 mt-2 sm:mt-4">
              Minutes
            </span>
          </div>

          {/* Colon Separator */}
          <div
            className={`font-mono font-bold leading-none select-none flex items-center justify-center pb-8 sm:pb-12 md:pb-16 text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[11rem] ${
              isLastMinute ? "text-amber-400" : isFinished ? "text-rose-400" : "text-sky-400"
            }`}
            aria-hidden="true"
          >
            :
          </div>

          {/* Seconds Segment */}
          <div className="flex flex-col items-center select-none">
            <div
              className={`relative rounded-2xl md:rounded-3xl flex items-center justify-center font-mono font-bold tracking-tight leading-none text-7xl sm:text-8xl md:text-9xl lg:text-[11rem] xl:text-[13rem] px-5 sm:px-8 py-3 sm:py-6 shadow-2xl transition-all ${
                isLastMinute
                  ? "bg-amber-950/70 border-2 border-amber-500/70 text-amber-300 shadow-amber-500/20 animate-pulse"
                  : isFinished
                  ? "bg-rose-950/70 border-2 border-rose-500/70 text-rose-300 shadow-rose-500/20"
                  : "bg-slate-900/90 border-2 border-sky-500/40 text-sky-100 shadow-sky-950/50"
              }`}
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {/* Corner accents */}
              <span className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-sky-400/50 rounded-tl-sm" />
              <span className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-sky-400/50 rounded-tr-sm" />
              <span className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-sky-400/50 rounded-bl-sm" />
              <span className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-sky-400/50 rounded-br-sm" />

              <span className="drop-shadow-md">{formattedSeconds}</span>
            </div>
            <span className="uppercase font-sans text-xs sm:text-sm md:text-base lg:text-lg tracking-[0.25em] font-semibold text-sky-300/80 mt-2 sm:mt-4">
              Seconds
            </span>
          </div>
        </div>

        {/* Live Status Indicator Banner */}
        <div className="mt-3 sm:mt-5 md:mt-6 text-center">
          {isNotStarted && (
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-sky-950/80 border border-sky-500/40 text-sky-300 text-sm sm:text-base font-bold tracking-widest uppercase shadow-lg">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-ping" />
              Ready for Pitch ({formattedMinutes}:{formattedSeconds})
            </div>
          )}

          {isRunning && !isLastMinute && (
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-sm sm:text-base font-bold tracking-widest uppercase shadow-lg">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              Pitch in Progress
            </div>
          )}

          {isLastMinute && (
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-amber-950/90 border border-amber-400 text-amber-300 text-sm sm:text-base font-extrabold tracking-widest uppercase shadow-lg animate-pulse">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              Final Minute Warning
            </div>
          )}

          {isPaused && (
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 text-sm sm:text-base font-bold tracking-widest uppercase shadow-lg">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              Pitch Paused
            </div>
          )}

          {isFinished && (
            <div className="inline-flex items-center gap-2 px-8 py-2.5 rounded-full bg-rose-950 border border-rose-500 text-rose-200 text-base sm:text-lg font-extrabold tracking-widest uppercase shadow-2xl animate-bounce">
              <span className="w-3 h-3 rounded-full bg-rose-500" />
              Time&apos;s Up — Thank You Team!
            </div>
          )}
        </div>

        {/* Persistent Control Bar (Always contains Play, Pause, and Reset) */}
        <div className="mt-5 sm:mt-7 p-3 sm:p-4 bg-slate-900/95 border border-sky-500/40 shadow-2xl rounded-2xl flex flex-wrap items-center justify-center gap-3 backdrop-blur-md">
          {/* Editable Minutes & Seconds Inputs (Collapsible via toggle) */}
          {showControls && (
            <div className="flex items-center gap-2 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800">
              <div className="flex items-center gap-1.5">
                <input
                  id="editable-minutes"
                  type="number"
                  min="0"
                  max="180"
                  value={inputMinutes}
                  disabled={isRunning}
                  onChange={(e) => handleMinutesChange(parseInt(e.target.value) || 0)}
                  className="w-14 py-1 px-1.5 bg-slate-900 border border-slate-700 rounded-lg text-center font-mono font-bold text-base text-white focus:outline-none focus:border-sky-400"
                  aria-label="Set minutes"
                />
                <label htmlFor="editable-minutes" className="text-xs font-mono text-slate-400 uppercase">
                  min
                </label>
              </div>

              <span className="text-slate-600 font-bold font-mono">:</span>

              <div className="flex items-center gap-1.5">
                <input
                  id="editable-seconds"
                  type="number"
                  min="0"
                  max="59"
                  value={inputSeconds}
                  disabled={isRunning}
                  onChange={(e) => handleSecondsChange(parseInt(e.target.value) || 0)}
                  className="w-14 py-1 px-1.5 bg-slate-900 border border-slate-700 rounded-lg text-center font-mono font-bold text-base text-white focus:outline-none focus:border-sky-400"
                  aria-label="Set seconds"
                />
                <label htmlFor="editable-seconds" className="text-xs font-mono text-slate-400 uppercase">
                  sec
                </label>
              </div>
            </div>
          )}

          {/* Quick Add Time Buttons for Q&A (Visible when running) */}
          {isRunning && (
            <div className="flex items-center gap-1.5 px-2 border-l border-slate-800">
              <button
                type="button"
                onClick={() => addTime(30)}
                className="py-1.5 px-2.5 bg-sky-950 hover:bg-sky-900 border border-sky-600/40 text-sky-300 text-xs font-bold rounded-lg flex items-center gap-0.5 transition-colors"
              >
                <Plus size={12} /> 30s
              </button>
              <button
                type="button"
                onClick={() => addTime(60)}
                className="py-1.5 px-2.5 bg-sky-950 hover:bg-sky-900 border border-sky-600/40 text-sky-300 text-xs font-bold rounded-lg flex items-center gap-0.5 transition-colors"
              >
                <Plus size={12} /> 1m
              </button>
            </div>
          )}

          {/* Always Available Core Action Buttons: Play, Pause, Reset */}
          <div className="flex items-center gap-2">
            {!isRunning ? (
              <button
                onClick={handleStart}
                className="py-2 px-5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md transition-colors"
              >
                <Play size={14} />
                {isPaused ? "Resume" : "Start Pitch"}
              </button>
            ) : (
              <button
                onClick={handlePause}
                className="py-2 px-5 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md transition-colors"
              >
                <Pause size={14} />
                Pause
              </button>
            )}

            <button
              onClick={handleReset}
              className="py-2 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold border border-slate-700 rounded-xl text-xs flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw size={14} />
              Reset
            </button>
          </div>
        </div>
      </section>

      {/* 3. MINIMAL BOTTOM TELEMETRY BAR */}
      <footer className="relative z-10 w-full pb-4 sm:pb-6 px-8 sm:px-12 flex justify-between items-center text-[10px] sm:text-xs font-mono text-slate-400">
        <div className="tracking-widest flex items-center gap-2">
          <Sparkles size={12} className="text-sky-400" />
          IDEA PRESENTATION TIMER
        </div>
        <div className="tracking-widest">
          SYS CLOCK: {sysTime || "--:--:--"}
        </div>
      </footer>
    </main>
  );
};
