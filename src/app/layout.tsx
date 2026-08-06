import type { Metadata, Viewport } from "next";
import "./globals.css";
import { EVENT_CONFIG } from "@/config/event";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { BackgroundHorizon } from "@/components/ui/BackgroundHorizon";

export const metadata: Metadata = {
  title: "Aashav — Hope | Hackathon 2026 | SIMATS School of Engineering",
  description:
    "Aashav — Hope is a national-level hybrid hackathon at SIMATS School of Engineering designed to challenge students with previous SIH-style problem statements and prepare teams for SIH 2026.",
  keywords: [
    "Aashav",
    "Hope",
    "Hackathon 2026",
    "SIMATS",
    "SIMATS School of Engineering",
    "Smart India Hackathon",
    "SIH 2026",
    "Hybrid Hackathon",
    "Engineering Competition",
    "Chennai Hackathon",
  ],
  authors: [{ name: "Aashav Hackathon Team" }],
  openGraph: {
    title: "Aashav — Hope | Hackathon 2026",
    description:
      "Build what tomorrow needs. The definitive SIH 2026 warm-up hybrid hackathon at SIMATS School of Engineering on 22 August 2026.",
    url: "https://aashav2026.com",
    siteName: "Aashav — Hope",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aashav — Hope | Hackathon 2026",
    description:
      "Build what tomorrow needs. Official SIH 2026 preparation warm-up hackathon at SIMATS School of Engineering.",
  },
};

export const viewport: Viewport = {
  themeColor: "#040507",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="relative bg-background text-offwhite min-h-screen antialiased selection:bg-cyan-brand/30 selection:text-white">
        <CustomCursor />
        <BackgroundHorizon />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
