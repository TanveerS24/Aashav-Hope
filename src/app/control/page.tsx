import { Metadata } from "next";
import { ControlPanel } from "@/components/timer/ControlPanel";

export const metadata: Metadata = {
  title: "Timer Control Room | Aashav 2026",
  description: "Organizer control dashboard for Aashav 2026 hackathon timer.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ControlPage() {
  return <ControlPanel />;
}
