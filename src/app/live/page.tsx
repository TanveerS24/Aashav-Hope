import { Metadata } from "next";
import { LiveTimerDisplay } from "@/components/timer/LiveTimerDisplay";

export const metadata: Metadata = {
  title: "Live Timer | Aashav 2026",
  description: "Official real-time hackathon timer display for Aashav 2026 — The Hope at SIMATS School of Engineering.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LivePage() {
  return <LiveTimerDisplay />;
}
