import type { Metadata, Viewport } from "next";
import "./globals.css";
import { EVENT_CONFIG } from "@/config/event";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { BackgroundHorizon } from "@/components/ui/BackgroundHorizon";

export const metadata: Metadata = {
  title: "Aashav — The hope | Hackathon 2026 | SIMATS School of Engineering",
  description:
    "Aashav — The hope is a national-level inter-college hybrid hackathon at SIMATS School of Engineering designed to challenge students with real-world problem statements and showcase technical innovation.",
  keywords: [
    "Aashav",
    "The hope",
    "Inter-College Hackathon",
    "Hackathon 2026",
    "SIMATS",
    "SIMATS School of Engineering",
    "National Hackathon",
    "Real-World Challenges",
    "Hybrid Hackathon",
    "Engineering Competition",
    "Chennai Hackathon",
  ],
  authors: [{ name: "Aashav Hackathon Team" }],
  openGraph: {
    title: "Aashav — The hope | Hackathon 2026",
    description:
      "Build what tomorrow needs. The premier national-grade inter-college hybrid hackathon at SIMATS School of Engineering on 22 August 2026.",
    url: "https://aashav2026.com",
    siteName: "Aashav — The hope",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aashav — The hope | Hackathon 2026",
    description:
      "Build what tomorrow needs. National-grade inter-college hackathon at SIMATS School of Engineering.",
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
