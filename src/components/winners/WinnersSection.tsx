"use client";

import React, { useState } from "react";
import Image from "next/image";
import { EVENT_CONFIG } from "@/config/event";
import { 
  Award, 
  Maximize2,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface TrophyAward {
  id: string;
  badge: string;
  rankTitle: string;
  categoryTitle: string;
  subtitle: string;
  image: string;
  colorTheme: "gold" | "green" | "cyan" | "orange";
  description: string;
  recipient: string;
}

const AWARDS_DATA: TrophyAward[] = [
  {
    id: "winner",
    badge: "RANK #1 • OVERALL CHAMPION",
    rankTitle: "01",
    categoryTitle: "OVERALL WINNER",
    subtitle: "Grand Champion Trophy & Medals",
    image: "/images/winners-trophy.png",
    colorTheme: "gold",
    recipient: "Top 1st Place Team across all hackathon tracks",
    description:
      "The pinnacle honor of Aashav 2026. Conferred upon the team displaying unparalleled technical excellence, groundbreaking innovation, architecture robustness, and defense rigor.",
  },
  {
    id: "runner-up",
    badge: "RANK #2 • RUNNER-UP",
    rankTitle: "02",
    categoryTitle: "FIRST RUNNER-UP",
    subtitle: "Runner-Up Trophy & Medals",
    image: "/images/runners-trophy.png",
    colorTheme: "green",
    recipient: "2nd Place Team across all tracks",
    description:
      "Awarded to the second-highest scoring team for outstanding engineering depth, scalable architecture, clean codebase execution, and exceptional presentation delivery.",
  },
  {
    id: "positions-3-4-5",
    badge: "RANKS #3, #4, #5 • 3 TEAMS",
    rankTitle: "03–05",
    categoryTitle: "NEXT 3 POSITIONS",
    subtitle: "3 Dedicated Position Trophies",
    image: "/images/top3-positions-trophy.png",
    colorTheme: "cyan",
    recipient: "3 Teams securing 3rd, 4th & 5th Positions",
    description:
      "Three distinct trophies awarded to the standout teams securing 3rd, 4th, and 5th positions who demonstrated exceptional domain problem-solving and prototype delivery.",
  },
  {
    id: "honorary",
    badge: "INSTITUTIONAL HONOR",
    rankTitle: "HON",
    categoryTitle: "HONORARY AWARD",
    subtitle: "Maximum Participation Trophy",
    image: "/images/honorary-trophy.png",
    colorTheme: "orange",
    recipient: "College / University with Highest Number of Participants",
    description:
      "Special Honorary Institution Trophy presented to the college or university sending the largest delegation of passionate student builders and competing teams to Aashav 2026.",
  },
];

export const WinnersSection: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<{ src: string; title: string } | null>(null);

  const getThemeStyles = (theme: TrophyAward["colorTheme"]) => {
    switch (theme) {
      case "gold":
        return {
          border: "border-amber-400/60 hover:border-amber-400",
          glowBg: "bg-amber-400/10",
          badgeBg: "bg-amber-400/15 text-amber-300 border-amber-400/50",
          textAccent: "text-amber-300",
          imgGlow: "from-amber-400/25 via-transparent to-transparent",
          shadow: "shadow-[0_0_30px_rgba(251,191,36,0.2)] hover:shadow-[0_0_40px_rgba(251,191,36,0.35)]",
          gradientText: "from-amber-300 via-amber-100 to-offwhite",
          topLine: "bg-gradient-to-r from-transparent via-amber-400 to-transparent",
        };
      case "green":
        return {
          border: "border-emerald-500/60 hover:border-emerald-400",
          glowBg: "bg-emerald-500/10",
          badgeBg: "bg-emerald-500/15 text-emerald-400 border-emerald-500/50",
          textAccent: "text-emerald-400",
          imgGlow: "from-emerald-500/25 via-transparent to-transparent",
          shadow: "shadow-[0_0_30px_rgba(16,185,129,0.2)] hover:shadow-[0_0_40px_rgba(16,185,129,0.35)]",
          gradientText: "from-emerald-400 via-emerald-200 to-offwhite",
          topLine: "bg-gradient-to-r from-transparent via-emerald-400 to-transparent",
        };
      case "cyan":
        return {
          border: "border-cyan-brand/60 hover:border-cyan-brand",
          glowBg: "bg-cyan-brand/10",
          badgeBg: "bg-cyan-brand/15 text-cyan-brand border-cyan-brand/50",
          textAccent: "text-cyan-brand",
          imgGlow: "from-cyan-brand/25 via-transparent to-transparent",
          shadow: "shadow-[0_0_30px_rgba(0,240,255,0.2)] hover:shadow-[0_0_40px_rgba(0,240,255,0.35)]",
          gradientText: "from-cyan-brand via-cyan-dim to-offwhite",
          topLine: "bg-gradient-to-r from-transparent via-cyan-brand to-transparent",
        };
      case "orange":
        return {
          border: "border-orange-500/60 hover:border-orange-400",
          glowBg: "bg-orange-500/10",
          badgeBg: "bg-orange-500/15 text-orange-400 border-orange-500/50",
          textAccent: "text-orange-400",
          imgGlow: "from-orange-500/25 via-transparent to-transparent",
          shadow: "shadow-[0_0_30px_rgba(249,115,22,0.2)] hover:shadow-[0_0_40px_rgba(249,115,22,0.35)]",
          gradientText: "from-orange-400 via-orange-200 to-offwhite",
          topLine: "bg-gradient-to-r from-transparent via-orange-400 to-transparent",
        };
    }
  };

  return (
    <section id="winners" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-[1600px] w-full mx-auto overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute left-1/4 top-1/4 -translate-y-1/2 w-[600px] h-[350px] bg-amber-400/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute right-1/4 bottom-1/4 w-[600px] h-[350px] bg-cyan-brand/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col items-center text-center gap-4 mb-16">
        <div className="flex items-center gap-2 font-mono text-xs text-amber-400 tracking-widest uppercase">
          <span className="text-tertiary">008 /</span>
          <span>RECOGNITION, TROPHIES &amp; HONORS</span>
        </div>

        <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-offwhite tracking-tight uppercase max-w-5xl leading-tight">
          6 PRESTIGIOUS AWARDS &amp; TROPHIES
        </h2>

        <p className="text-sm sm:text-base font-mono text-dimwhite max-w-3xl leading-relaxed">
          Celebrating extraordinary engineering brilliance at Aashav 2026. A total of{" "}
          <strong className="text-offwhite">6 awards</strong> will be presented on stage at the{" "}
          <strong className="text-amber-400">Valedictory Ceremony</strong>: honoring{" "}
          <strong className="text-cyan-brand">5 winning teams</strong> with official Trophies, Medals &amp; Certificates, and conferring the{" "}
          <strong className="text-orange-400">Honorary Trophy</strong> to the college with the highest student participation.
        </p>

        {/* Quick Highlights Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-4xl mt-4">
          <div className="p-3 rounded bg-surface/80 border border-amber-400/30 text-center">
            <div className="font-display font-black text-2xl sm:text-3xl text-amber-400">01</div>
            <div className="text-[10px] font-mono text-dimwhite uppercase tracking-wider mt-0.5">Overall Winner</div>
          </div>
          <div className="p-3 rounded bg-surface/80 border border-emerald-500/30 text-center">
            <div className="font-display font-black text-2xl sm:text-3xl text-emerald-400">01</div>
            <div className="text-[10px] font-mono text-dimwhite uppercase tracking-wider mt-0.5">Runner-Up</div>
          </div>
          <div className="p-3 rounded bg-surface/80 border border-cyan-brand/30 text-center">
            <div className="font-display font-black text-2xl sm:text-3xl text-cyan-brand">03</div>
            <div className="text-[10px] font-mono text-dimwhite uppercase tracking-wider mt-0.5">Next Positions (3–5)</div>
          </div>
          <div className="p-3 rounded bg-surface/80 border border-orange-500/30 text-center">
            <div className="font-display font-black text-2xl sm:text-3xl text-orange-400">01</div>
            <div className="text-[10px] font-mono text-dimwhite uppercase tracking-wider mt-0.5">Honorary College Award</div>
          </div>
        </div>
      </div>

      {/* Trophy Cards Grid (4 Comprehensive Showcase Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {AWARDS_DATA.map((award, idx) => {
          const theme = getThemeStyles(award.colorTheme);

          return (
            <motion.div
              key={award.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              className={`rounded-lg bg-surface/95 border ${theme.border} p-6 flex flex-col justify-between relative overflow-hidden backdrop-blur-xl group transition-all duration-300 ${theme.shadow}`}
            >
              {/* Top Accent Line */}
              <div className={`absolute top-0 left-0 right-0 h-[2px] ${theme.topLine}`} />

              <div>
                {/* Header Tag + Rank Number */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className={`text-[10px] font-mono font-bold tracking-wider uppercase px-2.5 py-1 rounded border ${theme.badgeBg}`}>
                    {award.badge}
                  </span>
                  <span className="font-mono text-xs text-tertiary">
                    #{String(idx + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Trophy Image Showcase Frame */}
                <div 
                  onClick={() => setSelectedImage({ src: award.image, title: award.categoryTitle })}
                  className="relative w-full h-64 sm:h-72 rounded-md bg-card/90 border border-surface-border overflow-hidden mb-5 flex items-center justify-center p-4 group/img cursor-pointer"
                >
                  {/* Subtle Background Radial Glow */}
                  <div className={`absolute inset-0 bg-radial ${theme.imgGlow} opacity-40 group-hover/img:opacity-80 transition-opacity duration-500`} />
                  
                  {/* Actual Trophy Photograph */}
                  <div className="relative w-full h-full">
                    <Image
                      src={award.image}
                      alt={award.categoryTitle}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)] group-hover:scale-105 transition-transform duration-500"
                      priority={idx < 2}
                    />
                  </div>

                  {/* Click to Enlarge Button - Always Visible */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage({ src: award.image, title: award.categoryTitle });
                    }}
                    className="absolute bottom-2.5 right-2.5 p-2 rounded bg-background/85 hover:bg-background border border-white/30 hover:border-cyan-brand/70 text-offwhite hover:text-cyan-brand transition-all shadow-[0_4px_12px_rgba(0,0,0,0.5)] hover:scale-110 active:scale-95 cursor-pointer z-10"
                    title="View Full Size Trophy"
                    aria-label={`View full size ${award.categoryTitle} trophy image`}
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Title & Subtitle */}
                <div className="space-y-1 mb-3">
                  <h3 className="font-display font-black text-2xl text-offwhite tracking-tight uppercase">
                    {award.categoryTitle}
                  </h3>
                  <p className={`text-xs font-mono font-semibold ${theme.textAccent}`}>
                    {award.subtitle}
                  </p>
                </div>

                {/* Award Description */}
                <p className="text-xs font-sans text-dimwhite leading-relaxed border-t border-surface-border/60 pt-3">
                  {award.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Commemorative Winner Medals Feature Showcase (Below Trophies, Above Certification) */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-12 rounded-lg bg-surface/95 border border-amber-400/40 hover:border-amber-400/70 p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-[0_0_35px_rgba(251,191,36,0.1)] transition-all"
      >
        {/* Ambient Warm Golden Glow */}
        <div className="absolute -left-20 -top-20 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-grid-pattern pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400/70 to-transparent" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Medal Photograph Showcase (Span 5) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div
              onClick={() => setSelectedImage({ src: "/images/medal.png", title: "Official Aashav Winner Medal" })}
              className="relative w-full max-w-sm h-64 sm:h-72 rounded-md bg-card/90 border border-surface-border overflow-hidden flex items-center justify-center p-4 group/medal cursor-pointer"
            >
              {/* Radial Glow behind medal */}
              <div className="absolute inset-0 bg-radial from-amber-400/25 via-transparent to-transparent opacity-60 group-hover/medal:opacity-90 transition-opacity duration-500" />

              <div className="relative w-full h-full">
                <Image
                  src="/images/medal.png"
                  alt="Official Aashav 2026 Winner Medal"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.85)] group-hover/medal:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Click to Enlarge Button - Always Visible */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage({ src: "/images/medal.png", title: "Official Aashav Winner Medal" });
                }}
                className="absolute bottom-2.5 right-2.5 p-2 rounded bg-background/85 hover:bg-background border border-white/30 hover:border-amber-400/70 text-offwhite hover:text-amber-300 transition-all shadow-[0_4px_12px_rgba(0,0,0,0.5)] hover:scale-110 active:scale-95 cursor-pointer z-10"
                title="View Full Size Medal"
                aria-label="View full size medal image"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Medal Editorial Details (Span 7) */}
          <div className="lg:col-span-7 space-y-4 flex flex-col items-center text-center lg:items-start lg:text-left">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold tracking-wider uppercase px-2.5 py-1 rounded bg-amber-400/15 text-amber-300 border border-amber-400/40">
                OFFICIAL MEDALS • ALL 5 WINNING TEAMS
              </span>
            </div>

            <h3 className="font-display font-black text-2xl sm:text-4xl text-offwhite tracking-tight uppercase">
              COMMEMORATIVE MEDALS OF EXCELLENCE
            </h3>

            <p className="text-xs sm:text-sm font-mono text-amber-300/90 font-semibold">
              Conferred individually upon every student member of the 5 winning teams.
            </p>

            <p className="text-xs sm:text-sans sm:text-sm font-sans text-dimwhite leading-relaxed border-t border-surface-border/60 pt-3">
              In addition to the prestigious team trophies, all individual team members across the top 5 winning teams will be honored on stage with custom-cast Aashav Medals of Honor during the <strong className="text-amber-300">Valedictory Ceremony</strong>.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Participation & Certification Guarantee Callout Banner */}
      <div className="mt-12 rounded-lg bg-card/90 border border-cyan-brand/30 p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 bg-grid-cyan pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="p-3.5 rounded-full bg-cyan-brand/10 border border-cyan-brand/30 text-cyan-brand flex-shrink-0 hidden sm:flex">
              <Award className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="text-[10px] font-mono text-cyan-brand tracking-widest uppercase px-2 py-0.5 rounded bg-cyan-brand/10 border border-cyan-brand/30">
                  ALL PRESENTING TEAMS
                </span>
                <span className="text-xs font-mono text-dimwhite">100% RECOGNITION</span>
              </div>
              <h4 className="font-display font-black text-xl sm:text-2xl text-offwhite uppercase tracking-tight mt-1">
                Official Participation Certificates For All Qualified Teams
              </h4>
              <p className="text-xs font-mono text-dimwhite mt-1 max-w-2xl">
                Every team that presents their solution during the hybrid evaluation round on 29 August 2026 will receive official signed participation certificates from SIMATS School of Engineering.
              </p>
            </div>
          </div>

          <div className="flex-shrink-0 flex items-center gap-3">
            <div className="px-4 py-2 rounded bg-surface border border-surface-border text-center">
              <div className="text-[10px] font-mono text-tertiary uppercase">EVALUATION DATE</div>
              <div className="font-mono text-xs font-bold text-offwhite">{EVENT_CONFIG.eventDateDisplay}</div>
            </div>
            <div className="px-4 py-2 rounded bg-surface border border-surface-border text-center">
              <div className="text-[10px] font-mono text-tertiary uppercase">MODE</div>
              <div className="font-mono text-xs font-bold text-cyan-brand">HYBRID STAGE</div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox / Modal for Enlarged Trophy Image */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-background/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full bg-surface border border-surface-border rounded-lg p-6 overflow-hidden flex flex-col items-center"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-card hover:bg-card-hover border border-surface-border text-offwhite hover:text-cyan-brand transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-4">
                <span className="text-[10px] font-mono tracking-widest text-cyan-brand uppercase px-2.5 py-0.5 rounded bg-cyan-brand/10 border border-cyan-brand/30">
                  OFFICIAL AASHAV 2026 HONORS
                </span>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-offwhite tracking-tight uppercase mt-2">
                  {selectedImage.title}
                </h3>
              </div>

              <div className="relative w-full h-[400px] sm:h-[500px]">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  fill
                  className="object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
                />
              </div>

              <div className="mt-4 text-center">
                <p className="text-xs font-mono text-dimwhite">
                  Presented live at the SIMATS School of Engineering Valedictory Stage.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
