import { Metadata } from "next";
import { StandaloneTimer } from "@/components/timer/StandaloneTimer";

export const metadata: Metadata = {
  title: "Idea Presentation Timer | Aashav 2026",
  description: "5-Minute Team Idea Presentation Countdown Timer for Aashav 2026.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function TimerPage() {
  return <StandaloneTimer />;
}
