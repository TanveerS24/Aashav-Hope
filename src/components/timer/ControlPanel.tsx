"use client";

import React, { useState, useEffect } from "react";
import { useTimerSync } from "@/hooks/useTimerSync";
import {
  Play,
  Pause,
  RotateCcw,
  Square,
  Lock,
  Unlock,
  AlertTriangle,
  ExternalLink,
  Clock,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  BookmarkPlus,
} from "lucide-react";

export const ControlPanel: React.FC = () => {
  const { timer, formattedTime, status, isLoading, isOnline, refetch } = useTimerSync();

  // Authentication State
  const [pin, setPin] = useState<string>("");
  const [savedSecret, setSavedSecret] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  // Duration Input State
  const [hours, setHours] = useState<number>(5);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  // Action status state
  const [actionError, setActionError] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);
  const [isActionPending, setIsActionPending] = useState<boolean>(false);

  // Confirmation Modal State
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    action: "RESET" | "END" | null;
    title: string;
    description: string;
  }>({
    isOpen: false,
    action: null,
    title: "",
    description: "",
  });

  // Load stored secret from sessionStorage on mount
  useEffect(() => {
    const cachedSecret = sessionStorage.getItem("aashav_timer_secret");
    if (cachedSecret) {
      setSavedSecret(cachedSecret);
      verifySecretOnServer(cachedSecret);
    }
  }, []);

  // Update default inputs when timer loads and status is NOT_STARTED
  useEffect(() => {
    if (timer && timer.status === "NOT_STARTED" && timer.durationSeconds > 0) {
      const h = Math.floor(timer.durationSeconds / 3600);
      const m = Math.floor((timer.durationSeconds % 3600) / 60);
      const s = timer.durationSeconds % 60;
      setHours(h);
      setMinutes(m);
      setSeconds(s);
    }
  }, [timer]);

  const verifySecretOnServer = async (secretToTest: string) => {
    setIsVerifying(true);
    setAuthError(null);
    try {
      const res = await fetch("/api/timer/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-timer-secret": secretToTest,
        },
        body: JSON.stringify({ secret: secretToTest }),
      });

      const data = await res.json();
      if (res.ok && data.valid) {
        setIsAuthenticated(true);
        setSavedSecret(secretToTest);
        sessionStorage.setItem("aashav_timer_secret", secretToTest);
      } else {
        setIsAuthenticated(false);
        setAuthError(data.message || "Invalid PIN. Please try again.");
      }
    } catch {
      setAuthError("Failed to connect to authentication server.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin.trim()) {
      setAuthError("Please enter the organizer PIN.");
      return;
    }
    verifySecretOnServer(pin.trim());
  };

  const handleLogout = () => {
    sessionStorage.removeItem("aashav_timer_secret");
    setSavedSecret("");
    setPin("");
    setIsAuthenticated(false);
  };

  // Helper for preset durations
  const applyPreset = (h: number, m: number, s: number) => {
    setHours(h);
    setMinutes(m);
    setSeconds(s);
    setActionError(null);
  };

  const totalInputSeconds = hours * 3600 + minutes * 60 + seconds;

  // Execute timer actions
  const executeAction = async (
    endpoint: string,
    body: Record<string, any> = {}
  ) => {
    setIsActionPending(true);
    setActionError(null);
    setActionSuccess(null);

    try {
      const res = await fetch(`/api/timer/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-timer-secret": savedSecret,
        },
        body: JSON.stringify({ ...body, secret: savedSecret }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Action failed.");
      }

      setActionSuccess(data.message || "Action executed successfully.");
      refetch();
    } catch (err: any) {
      setActionError(err.message || "An unexpected error occurred.");
    } finally {
      setIsActionPending(false);
    }
  };

  const handleSetForLater = () => {
    if (totalInputSeconds <= 0) {
      setActionError("Duration must be greater than 0 seconds.");
      return;
    }

    executeAction("set-duration", { durationSeconds: totalInputSeconds });
  };

  const handleStart = () => {
    if (status === "RUNNING") {
      setActionError("TIMER ALREADY RUNNING. You must Reset or End it before starting a new timer.");
      return;
    }

    if (totalInputSeconds <= 0) {
      setActionError("Duration must be greater than 0 seconds.");
      return;
    }

    executeAction("start", { durationSeconds: totalInputSeconds });
  };

  const handlePauseResume = () => {
    if (status === "RUNNING") {
      executeAction("pause", { action: "pause" });
    } else if (status === "PAUSED") {
      executeAction("pause", { action: "resume" });
    }
  };

  const openConfirmation = (action: "RESET" | "END") => {
    if (action === "RESET") {
      setConfirmModal({
        isOpen: true,
        action: "RESET",
        title: "Confirm Timer Reset",
        description:
          "Are you sure you want to reset the timer to NOT STARTED? This will clear any running countdown.",
      });
    } else if (action === "END") {
      setConfirmModal({
        isOpen: true,
        action: "END",
        title: "Confirm Hackathon Conclusion",
        description:
          "Are you sure you want to END the timer now? This will immediately set the status to TIME'S UP (FINISHED).",
      });
    }
  };

  const handleConfirmAction = () => {
    if (confirmModal.action === "RESET") {
      executeAction("reset", { durationSeconds: totalInputSeconds > 0 ? totalInputSeconds : 18000 });
    } else if (confirmModal.action === "END") {
      executeAction("end");
    }
    setConfirmModal({ isOpen: false, action: null, title: "", description: "" });
  };

  // -------------------------------------------------------------
  // VIEW: PIN Login Modal if not authenticated
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <main className="fixed inset-0 z-50 overflow-auto bg-slate-950 text-slate-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
          <div className="flex items-center justify-center w-14 h-14 bg-sky-500/10 border border-sky-500/30 rounded-2xl mx-auto mb-5 text-sky-400">
            <Lock size={28} />
          </div>

          <h1 className="text-2xl font-bold text-center text-white font-display">
            AASHAV 2026
          </h1>
          <p className="text-xs tracking-widest text-center text-sky-400 font-mono mt-1 uppercase">
            Organizer Control Room
          </p>

          <p className="text-sm text-slate-400 text-center mt-3 mb-6">
            Enter the organizer PIN to access hackathon timer controls.
          </p>

          {authError && (
            <div className="mb-4 p-3 rounded-lg bg-rose-950/50 border border-rose-800/80 text-rose-300 text-sm flex items-center gap-2">
              <AlertCircle size={16} className="shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="pin-input"
                className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5"
              >
                Passcode / PIN
              </label>
              <input
                id="pin-input"
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Enter PIN (e.g., aashav2026)"
                className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono placeholder:text-slate-600 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-center tracking-widest"
                autoFocus
              />
            </div>

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full py-3 px-4 bg-sky-600 hover:bg-sky-500 disabled:bg-slate-800 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-sky-600/20"
            >
              {isVerifying ? (
                <>
                  <RefreshCw size={18} className="animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <Unlock size={18} />
                  Authorize Access
                </>
              )}
            </button>
          </form>

          <p className="text-[11px] text-center text-slate-500 mt-6 font-mono">
            Simats School of Engineering · Department of Machine Learning
          </p>
        </div>
      </main>
    );
  }

  // -------------------------------------------------------------
  // VIEW: Organizer Control Dashboard
  // -------------------------------------------------------------
  return (
    <main className="fixed inset-0 z-50 overflow-y-auto bg-slate-950 text-slate-100 p-4 sm:p-6 md:p-8 select-none">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Top Bar */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 rounded-2xl p-5 backdrop-blur-md">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-sky-400 animate-pulse" />
              <h1 className="text-xl sm:text-2xl font-extrabold text-white font-display">
                AASHAV 2026 CONTROL ROOM
              </h1>
            </div>
            <p className="text-xs font-mono text-slate-400 mt-1">
              Official Hackathon Timer Central Command
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/live"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-sky-600/20 hover:bg-sky-600/30 text-sky-300 border border-sky-500/30 rounded-xl text-xs font-semibold transition-colors"
            >
              <ExternalLink size={14} />
              Open /live Projector
            </a>

            <a
              href="/timer"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-xl text-xs font-semibold transition-colors"
            >
              <ExternalLink size={14} />
              Open /timer Workspace
            </a>

            <button
              onClick={handleLogout}
              className="px-3.5 py-2 bg-rose-950/30 hover:bg-rose-950/60 text-rose-300 border border-rose-800/40 rounded-xl text-xs font-semibold transition-colors"
            >
              Lock
            </button>
          </div>
        </header>

        {/* Alerts / Feedback Banner */}
        {actionError && (
          <div className="p-4 rounded-xl bg-rose-950/70 border border-rose-800 text-rose-200 text-sm flex items-start gap-3 shadow-lg">
            <AlertTriangle size={20} className="shrink-0 text-rose-400 mt-0.5" />
            <div>
              <p className="font-semibold">Action Blocked</p>
              <p className="text-xs text-rose-300 mt-0.5">{actionError}</p>
            </div>
          </div>
        )}

        {actionSuccess && (
          <div className="p-4 rounded-xl bg-emerald-950/70 border border-emerald-800 text-emerald-200 text-sm flex items-start gap-3 shadow-lg">
            <CheckCircle2 size={20} className="shrink-0 text-emerald-400 mt-0.5" />
            <div>
              <p className="font-semibold">Success</p>
              <p className="text-xs text-emerald-300 mt-0.5">{actionSuccess}</p>
            </div>
          </div>
        )}

        {/* Status Card & Big Clock Preview */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4 mb-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
                Current State
              </span>
              <div className="flex items-center gap-3 mt-1.5">
                {status === "NOT_STARTED" && (
                  <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-800 text-slate-300 border border-slate-700">
                    <span className="w-2 h-2 rounded-full bg-slate-400" />
                    NOT STARTED (STAGED)
                  </span>
                )}
                {status === "RUNNING" && (
                  <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-950 text-emerald-300 border border-emerald-700 animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    ● LIVE / RUNNING
                  </span>
                )}
                {status === "PAUSED" && (
                  <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-950 text-amber-300 border border-amber-700">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    PAUSED
                  </span>
                )}
                {status === "FINISHED" && (
                  <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-950 text-rose-300 border border-rose-700">
                    <span className="w-2 h-2 rounded-full bg-rose-400" />
                    FINISHED / TIME&apos;S UP
                  </span>
                )}

                <span className="text-xs font-mono text-slate-500">
                  {isOnline ? "Server Synced" : "Reconnecting..."}
                </span>
              </div>
            </div>

            {/* Quick Refresh */}
            <button
              onClick={() => refetch()}
              disabled={isLoading}
              className="self-start sm:self-auto p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              title="Refresh Timer State"
            >
              <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
            </button>
          </div>

          {/* Large Countdown Display */}
          <div className="text-center py-4 sm:py-6">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-slate-400">
              {status === "NOT_STARTED" ? "Configured Display Duration (Staged)" : "Remaining Hackathon Time"}
            </span>
            <div className="text-5xl sm:text-6xl md:text-7xl font-mono font-bold tracking-tight text-white mt-2 font-numeric">
              {formattedTime.hours} : {formattedTime.minutes} : {formattedTime.seconds}
            </div>

            {/* Sub details */}
            <div className="flex justify-center items-center gap-6 mt-4 text-xs font-mono text-slate-400 flex-wrap">
              {timer?.startedAt && (
                <div>
                  <span className="text-slate-500">Started: </span>
                  {new Date(timer.startedAt).toLocaleTimeString()}
                </div>
              )}
              {timer?.endsAt && (
                <div>
                  <span className="text-slate-500">Ends At: </span>
                  {new Date(timer.endsAt).toLocaleTimeString()}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Duration Configuration & Preset Section */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="text-sm font-bold uppercase tracking-widest text-slate-300 flex items-center gap-2">
              <Clock size={16} className="text-sky-400" />
              Set Timer Duration
            </h2>

            {/* SET FOR LATER BUTTON */}
            <button
              type="button"
              onClick={handleSetForLater}
              disabled={isActionPending}
              className="inline-flex items-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-500 disabled:bg-slate-800 text-white font-bold rounded-xl text-xs transition-all shadow-md shadow-sky-950 cursor-pointer"
            >
              <BookmarkPlus size={15} />
              SET FOR LATER (STAGE ON /LIVE)
            </button>
          </div>

          {/* Quick Presets */}
          <div>
            <span className="text-xs font-mono text-slate-400 block mb-2">
              Quick Presets:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              <button
                type="button"
                onClick={() => applyPreset(2, 0, 0)}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                  hours === 2 && minutes === 0 && seconds === 0
                    ? "bg-sky-600 border-sky-400 text-white"
                    : "bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700"
                }`}
              >
                2 Hours
              </button>
              <button
                type="button"
                onClick={() => applyPreset(5, 0, 0)}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                  hours === 5 && minutes === 0 && seconds === 0
                    ? "bg-sky-600 border-sky-400 text-white"
                    : "bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700"
                }`}
              >
                5 Hours (Official)
              </button>
              <button
                type="button"
                onClick={() => applyPreset(8, 0, 0)}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                  hours === 8 && minutes === 0 && seconds === 0
                    ? "bg-sky-600 border-sky-400 text-white"
                    : "bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700"
                }`}
              >
                8 Hours
              </button>
              <button
                type="button"
                onClick={() => applyPreset(12, 0, 0)}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                  hours === 12 && minutes === 0 && seconds === 0
                    ? "bg-sky-600 border-sky-400 text-white"
                    : "bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700"
                }`}
              >
                12 Hours
              </button>
              <button
                type="button"
                onClick={() => applyPreset(24, 0, 0)}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                  hours === 24 && minutes === 0 && seconds === 0
                    ? "bg-sky-600 border-sky-400 text-white"
                    : "bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700"
                }`}
              >
                24 Hours
              </button>
            </div>
          </div>

          {/* Exact Numeric Inputs */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label
                htmlFor="input-hours"
                className="block text-xs font-mono uppercase text-slate-400 mb-1.5"
              >
                Hours
              </label>
              <input
                id="input-hours"
                type="number"
                min="0"
                max="240"
                value={hours}
                onChange={(e) => setHours(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full py-3 px-4 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-xl sm:text-2xl font-bold text-center focus:outline-none focus:border-sky-500"
              />
            </div>
            <div>
              <label
                htmlFor="input-minutes"
                className="block text-xs font-mono uppercase text-slate-400 mb-1.5"
              >
                Minutes
              </label>
              <input
                id="input-minutes"
                type="number"
                min="0"
                max="59"
                value={minutes}
                onChange={(e) =>
                  setMinutes(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))
                }
                className="w-full py-3 px-4 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-xl sm:text-2xl font-bold text-center focus:outline-none focus:border-sky-500"
              />
            </div>
            <div>
              <label
                htmlFor="input-seconds"
                className="block text-xs font-mono uppercase text-slate-400 mb-1.5"
              >
                Seconds
              </label>
              <input
                id="input-seconds"
                type="number"
                min="0"
                max="59"
                value={seconds}
                onChange={(e) =>
                  setSeconds(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))
                }
                className="w-full py-3 px-4 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-xl sm:text-2xl font-bold text-center focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>
        </section>

        {/* Action Controls Section */}
        <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-300">
            Control Actions
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* START / RESTART */}
            <button
              type="button"
              onClick={handleStart}
              disabled={isActionPending || status === "RUNNING"}
              className="py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-950 flex items-center justify-center gap-2"
            >
              <Play size={18} />
              START TIMER
            </button>

            {/* PAUSE / RESUME */}
            <button
              type="button"
              onClick={handlePauseResume}
              disabled={isActionPending || (status !== "RUNNING" && status !== "PAUSED")}
              className="py-3.5 px-4 bg-amber-600 hover:bg-amber-500 disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all shadow-lg shadow-amber-950 flex items-center justify-center gap-2"
            >
              {status === "PAUSED" ? (
                <>
                  <Play size={18} /> RESUME
                </>
              ) : (
                <>
                  <Pause size={18} /> PAUSE
                </>
              )}
            </button>

            {/* END TIMER */}
            <button
              type="button"
              onClick={() => openConfirmation("END")}
              disabled={isActionPending || status === "FINISHED" || status === "NOT_STARTED"}
              className="py-3.5 px-4 bg-rose-600 hover:bg-rose-500 disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all shadow-lg shadow-rose-950 flex items-center justify-center gap-2"
            >
              <Square size={18} />
              END TIMER
            </button>

            {/* RESET TIMER */}
            <button
              type="button"
              onClick={() => openConfirmation("RESET")}
              disabled={isActionPending}
              className="py-3.5 px-4 bg-slate-800 hover:bg-slate-700 disabled:bg-slate-900 disabled:text-slate-600 text-slate-200 font-bold border border-slate-700 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw size={18} />
              RESET
            </button>
          </div>
        </section>
      </div>

      {/* Confirmation Modal */}
      {confirmModal.isOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center gap-3 text-amber-400 mb-4">
              <AlertTriangle size={24} />
              <h3 className="text-lg font-bold text-white">{confirmModal.title}</h3>
            </div>

            <p className="text-sm text-slate-300 mb-6">
              {confirmModal.description}
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() =>
                  setConfirmModal({ isOpen: false, action: null, title: "", description: "" })
                }
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmAction}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-colors ${
                  confirmModal.action === "END"
                    ? "bg-rose-600 hover:bg-rose-500"
                    : "bg-amber-600 hover:bg-amber-500"
                }`}
              >
                Confirm {confirmModal.action}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
