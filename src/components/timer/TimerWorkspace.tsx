"use client";

import React, { useState, useEffect } from "react";
import { useTimerSync } from "@/hooks/useTimerSync";
import { DigitalSegment, ColonSeparator } from "./DigitalSegment";
import { Play, Pause, RotateCcw, Square, ExternalLink, RefreshCw, BookmarkPlus } from "lucide-react";

export const TimerWorkspace: React.FC = () => {
  const { timer, formattedTime, status, isLoading, isOnline, refetch } = useTimerSync();

  const [hours, setHours] = useState<number>(5);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [secret, setSecret] = useState<string>("");
  const [isSecretSaved, setIsSecretSaved] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    const cached = sessionStorage.getItem("aashav_timer_secret");
    if (cached) {
      setSecret(cached);
      setIsSecretSaved(true);
    }
  }, []);

  const totalInputSeconds = hours * 3600 + minutes * 60 + seconds;

  const performAction = async (endpoint: string, payload: Record<string, any> = {}) => {
    setStatusMessage(null);
    try {
      const activeSecret = secret || sessionStorage.getItem("aashav_timer_secret") || "aashav2026";
      const res = await fetch(`/api/timer/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-timer-secret": activeSecret,
        },
        body: JSON.stringify({ ...payload, secret: activeSecret }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to execute action");
      }

      setStatusMessage(data.message || "Updated successfully");
      refetch();
    } catch (err: any) {
      setStatusMessage(`Error: ${err.message}`);
    }
  };

  const handleSetForLater = () => {
    if (totalInputSeconds <= 0) {
      setStatusMessage("Error: Duration must be greater than 0");
      return;
    }
    performAction("set-duration", { durationSeconds: totalInputSeconds });
  };

  const handleStart = () => {
    if (status === "RUNNING") {
      setStatusMessage("Error: TIMER ALREADY RUNNING");
      return;
    }
    if (totalInputSeconds <= 0) {
      setStatusMessage("Error: Duration must be greater than 0");
      return;
    }
    performAction("start", { durationSeconds: totalInputSeconds });
  };

  const handlePauseResume = () => {
    if (status === "RUNNING") {
      performAction("pause", { action: "pause" });
    } else if (status === "PAUSED") {
      performAction("pause", { action: "resume" });
    }
  };

  const handleReset = () => {
    performAction("reset", { durationSeconds: totalInputSeconds > 0 ? totalInputSeconds : 18000 });
  };

  const handleEnd = () => {
    performAction("end");
  };

  return (
    <main className="fixed inset-0 z-50 overflow-y-auto bg-slate-950 text-slate-100 p-4 sm:p-8 flex flex-col justify-between select-none">
      {/* Top Header */}
      <header className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-5xl mx-auto w-full pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold text-white font-display flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            AASHAV 2026 — TIMER WORKSPACE
          </h1>
          <p className="text-xs font-mono text-slate-400">
            Functional Workspace &amp; Synchronization Engine
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/live"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-600/20 hover:bg-sky-600/30 text-sky-300 border border-sky-500/30 text-xs font-semibold"
          >
            <ExternalLink size={13} />
            /live Projector
          </a>
          <a
            href="/control"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-semibold"
          >
            <ExternalLink size={13} />
            /control
          </a>
          <button
            onClick={() => refetch()}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400"
            title="Refresh"
          >
            <RefreshCw size={15} />
          </button>
        </div>
      </header>

      {/* Center Countdown Display */}
      <section className="my-auto py-8 flex flex-col items-center justify-center max-w-5xl mx-auto w-full">
        {/* Status Pill */}
        <div className="mb-6">
          {status === "NOT_STARTED" && (
            <span className="px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-widest bg-slate-800 text-slate-300 border border-slate-700">
              NOT STARTED (STAGED)
            </span>
          )}
          {status === "RUNNING" && (
            <span className="px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-widest bg-emerald-950 text-emerald-300 border border-emerald-700 animate-pulse">
              ● RUNNING
            </span>
          )}
          {status === "PAUSED" && (
            <span className="px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-widest bg-amber-950 text-amber-300 border border-amber-700">
              PAUSED
            </span>
          )}
          {status === "FINISHED" && (
            <span className="px-4 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-widest bg-rose-950 text-rose-300 border border-rose-700">
              FINISHED / TIME&apos;S UP
            </span>
          )}
        </div>

        {/* Large Digital Clock */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-6">
          <DigitalSegment
            value={formattedTime.hours}
            label="Hours"
            theme="dark"
            size="medium"
          />
          <ColonSeparator theme="dark" size="medium" />
          <DigitalSegment
            value={formattedTime.minutes}
            label="Minutes"
            theme="dark"
            size="medium"
          />
          <ColonSeparator theme="dark" size="medium" />
          <DigitalSegment
            value={formattedTime.seconds}
            label="Seconds"
            theme="dark"
            size="medium"
          />
        </div>

        {statusMessage && (
          <p className="mt-4 text-xs font-mono text-cyan-300 bg-slate-900 border border-slate-800 px-4 py-2 rounded-lg">
            {statusMessage}
          </p>
        )}
      </section>

      {/* Bottom Compact Controls */}
      <footer className="max-w-3xl mx-auto w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Quick Input Fields */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <input
                type="number"
                min="0"
                value={hours}
                onChange={(e) => setHours(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-14 py-1.5 px-2 bg-slate-950 border border-slate-700 rounded-lg text-center font-mono font-bold text-sm text-white"
              />
              <span className="text-xs font-mono text-slate-400">h</span>
            </div>

            <div className="flex items-center gap-1.5">
              <input
                type="number"
                min="0"
                max="59"
                value={minutes}
                onChange={(e) => setMinutes(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                className="w-14 py-1.5 px-2 bg-slate-950 border border-slate-700 rounded-lg text-center font-mono font-bold text-sm text-white"
              />
              <span className="text-xs font-mono text-slate-400">m</span>
            </div>

            <div className="flex items-center gap-1.5">
              <input
                type="number"
                min="0"
                max="59"
                value={seconds}
                onChange={(e) => setSeconds(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                className="w-14 py-1.5 px-2 bg-slate-950 border border-slate-700 rounded-lg text-center font-mono font-bold text-sm text-white"
              />
              <span className="text-xs font-mono text-slate-400">s</span>
            </div>

            <button
              onClick={handleSetForLater}
              className="py-1.5 px-3 bg-sky-700 hover:bg-sky-600 rounded-lg text-xs font-bold text-white flex items-center gap-1 ml-2"
              title="Save duration on live display without starting countdown"
            >
              <BookmarkPlus size={13} />
              Set for Later
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleStart}
              disabled={status === "RUNNING"}
              className="py-2 px-4 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-600 rounded-xl text-xs font-bold text-white flex items-center gap-1.5"
            >
              <Play size={14} /> START
            </button>

            <button
              onClick={handlePauseResume}
              disabled={status !== "RUNNING" && status !== "PAUSED"}
              className="py-2 px-4 bg-amber-600 hover:bg-amber-500 disabled:bg-slate-800 disabled:text-slate-600 rounded-xl text-xs font-bold text-white flex items-center gap-1.5"
            >
              {status === "PAUSED" ? <Play size={14} /> : <Pause size={14} />}
              {status === "PAUSED" ? "RESUME" : "PAUSE"}
            </button>

            <button
              onClick={handleReset}
              className="py-2 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5"
            >
              <RotateCcw size={14} /> RESET
            </button>

            <button
              onClick={handleEnd}
              disabled={status === "FINISHED" || status === "NOT_STARTED"}
              className="py-2 px-4 bg-rose-600 hover:bg-rose-500 disabled:bg-slate-800 disabled:text-slate-600 rounded-xl text-xs font-bold text-white flex items-center gap-1.5"
            >
              <Square size={14} /> END
            </button>
          </div>
        </div>
      </footer>
    </main>
  );
};
