"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { TimerState, TimerApiResponse, TimerStatus } from "@/types/timer";

export interface FormattedTime {
  hours: string;
  minutes: string;
  seconds: string;
  totalSeconds: number;
}

export function formatTime(seconds: number): FormattedTime {
  const safeSeconds = Math.max(0, Math.floor(Number.isFinite(seconds) ? seconds : 0));
  const h = Math.floor(safeSeconds / 3600);
  const m = Math.floor((safeSeconds % 3600) / 60);
  const s = safeSeconds % 60;

  return {
    hours: String(h).padStart(2, "0"),
    minutes: String(m).padStart(2, "0"),
    seconds: String(s).padStart(2, "0"),
    totalSeconds: safeSeconds,
  };
}

export function useTimerSync() {
  const [timer, setTimer] = useState<TimerState | null>(null);
  const [remainingSeconds, setRemainingSeconds] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [lastSyncedAt, setLastSyncedAt] = useState<Date | null>(null);

  const serverOffsetMsRef = useRef<number>(0);
  const timerRef = useRef<TimerState | null>(null);
  timerRef.current = timer;

  // Fetch status from server
  const fetchStatus = useCallback(async () => {
    try {
      const res = await fetch("/api/timer/status", {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache",
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }

      const data: TimerApiResponse = await res.json();
      if (data.success && data.timer) {
        const clientNow = Date.now();
        const serverTimeMs = new Date(data.serverTime).getTime();
        serverOffsetMsRef.current = serverTimeMs - clientNow;

        setTimer(data.timer);
        setRemainingSeconds(data.remainingSeconds);
        setError(null);
        setIsOnline(true);
        setLastSyncedAt(new Date());
      }
    } catch (err: any) {
      console.warn("Timer sync warning:", err);
      setIsOnline(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Polling loop
  useEffect(() => {
    fetchStatus();

    // Responsive polling: faster when running, slower when idle
    const intervalTime = timer?.status === "RUNNING" ? 2000 : 4000;
    const interval = setInterval(() => {
      fetchStatus();
    }, intervalTime);

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchStatus();
      }
    };

    const handleOnline = () => {
      setIsOnline(true);
      fetchStatus();
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [fetchStatus, timer?.status]);

  // Local precise high-frequency countdown ticker to prevent display delay
  useEffect(() => {
    const tick = () => {
      const current = timerRef.current;
      if (!current) return;

      if (current.status === "NOT_STARTED") {
        setRemainingSeconds(current.durationSeconds || 0);
        return;
      }

      if (current.status === "FINISHED") {
        setRemainingSeconds(0);
        return;
      }

      if (current.status === "PAUSED") {
        setRemainingSeconds(current.remainingSecondsOnPause ?? 0);
        return;
      }

      if (current.status === "RUNNING") {
        if (!current.endsAt) {
          setRemainingSeconds(0);
          return;
        }

        const adjustedNow = Date.now() + serverOffsetMsRef.current;
        const endsMs = new Date(current.endsAt).getTime();
        const diffSeconds = Math.max(0, Math.ceil((endsMs - adjustedNow) / 1000));

        setRemainingSeconds(diffSeconds);

        if (diffSeconds === 0 && current.status === "RUNNING") {
          setTimer((prev) => (prev ? { ...prev, status: "FINISHED" } : null));
        }
      }
    };

    tick();
    const interval = setInterval(tick, 250); // 250ms tick for responsive updates
    return () => clearInterval(interval);
  }, []);

  const formattedTime = formatTime(remainingSeconds);

  return {
    timer,
    remainingSeconds,
    formattedTime,
    status: (timer?.status || "NOT_STARTED") as TimerStatus,
    isLoading,
    error,
    isOnline,
    lastSyncedAt,
    refetch: fetchStatus,
  };
}
