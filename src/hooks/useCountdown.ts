"use client";

import { useState, useEffect, useCallback } from "react";
import { EVENT_CONFIG } from "@/config/event";

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isLive: boolean;
  formatted: string;
}

export function useCountdown(targetISO?: string): TimeLeft {
  const targetTime = targetISO
    ? new Date(targetISO).getTime()
    : new Date(EVENT_CONFIG.countdownTargetISO).getTime();

  const calculate = useCallback((): TimeLeft => {
    const now = Date.now();
    const diff = targetTime - now;

    if (diff <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isLive: true,
        formatted: "00d 00h 00m 00s",
      };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const pad = (n: number) => n.toString().padStart(2, "0");
    const formatted = `${pad(days)}d ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;

    return {
      days,
      hours,
      minutes,
      seconds,
      isLive: false,
      formatted,
    };
  }, [targetTime]);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculate);

  useEffect(() => {
    // Initial immediate calculate
    setTimeLeft(calculate());

    // Sync timer interval exactly at every second boundary
    const interval = setInterval(() => {
      setTimeLeft(calculate());
    }, 1000);

    return () => clearInterval(interval);
  }, [calculate]);

  return timeLeft;
}
