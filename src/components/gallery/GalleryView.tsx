"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { GALLERY_ITEMS, GalleryItem } from "@/data/gallery";
import {
  Sparkles,
  Award,
  Clock,
  CheckCircle2,
  Maximize2,
  X,
  ArrowRight,
  ArrowLeft,
  Calendar,
  MapPin,
  Sliders,
  Tv,
  Camera,
} from "lucide-react";
import { EVENT_CONFIG } from "@/config/event";

export const GalleryView: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  return (
    <div className="relative min-h-screen bg-[#07090e] text-offwhite overflow-hidden pt-24 pb-20">
      {/* Ambient background glows */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-brand/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[800px] right-0 w-[600px] h-[500px] bg-sunrise-brand/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[400px] left-0 w-[600px] h-[500px] bg-violet-brand/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#00f0ff 1px, transparent 1px), linear-gradient(90deg, #00f0ff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-[1500px] w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-dimwhite mb-8">
          <Link
            href="/"
            className="hover:text-cyan-brand transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK TO HOME</span>
          </Link>
          <span className="text-surface-border">/</span>
          <span className="text-cyan-brand font-semibold">EVENT GALLERY</span>
        </div>

        {/* Gallery Hero Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-24">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-brand/10 border border-cyan-brand/30 text-cyan-brand font-mono text-xs tracking-widest uppercase mb-5"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>{"// AASHAV 2026 RETROSPECTIVE ARCHIVE"}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl font-display font-black tracking-wider uppercase text-offwhite leading-tight"
          >
            MOMENTS OF{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sunrise-brand via-cyan-brand to-violet-brand">
              INNOVATION
            </span>{" "}
            &amp; TRIUMPH
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-5 text-sm sm:text-base text-dimwhite leading-relaxed max-w-2xl mx-auto font-sans"
          >
            Relive the high-stakes 24-hour engineering marathon at{" "}
            <span className="text-offwhite font-medium">{EVENT_CONFIG.venueName}</span>. 
            From inaugural addresses and rigorous prototype evaluations to the felicitation of national champions.
          </motion.p>

          {/* Quick Metrics / Metadata Badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs font-mono"
          >
            <div className="px-3.5 py-1.5 rounded-md bg-surface/70 border border-surface-border text-dimwhite flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-sunrise-brand" />
              <span>{EVENT_CONFIG.eventDateDisplay}</span>
            </div>
            <div className="px-3.5 py-1.5 rounded-md bg-surface/70 border border-surface-border text-dimwhite flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-cyan-brand" />
              <span>{EVENT_CONFIG.departmentName}</span>
            </div>
            <div className="px-3.5 py-1.5 rounded-md bg-surface/70 border border-surface-border text-dimwhite flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-violet-brand" />
              <span>8 HIGHLIGHT MILESTONES</span>
            </div>
          </motion.div>
        </div>

        {/* Alternating Gallery Items Grid */}
        <div className="space-y-16 sm:space-y-24">
          {GALLERY_ITEMS.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`flex flex-col ${
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                } gap-8 lg:gap-14 items-center bg-surface/40 backdrop-blur-xl border border-white/10 hover:border-cyan-brand/30 rounded-2xl p-5 sm:p-8 transition-all duration-300 shadow-xl group`}
              >
                {/* Image Showcase Column - Centered, No Overflow */}
                <div className="w-full lg:w-1/2 shrink-0">
                  <div className="relative rounded-2xl overflow-hidden border border-white/10 group-hover:border-cyan-brand/50 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.6)] bg-[#04060a] flex flex-col">
                    {/* Top Telemetry Header for Image */}
                    <div className="flex items-center justify-between px-4 py-2.5 bg-[#090d15] border-b border-surface-border text-[11px] font-mono">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-cyan-brand animate-pulse" />
                        <span className="text-cyan-brand font-bold uppercase tracking-wider text-[10px] sm:text-[11px]">
                          {item.timestamp}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-sunrise-brand/20 text-sunrise-brand text-[10px] font-semibold border border-sunrise-brand/40">
                          {item.roleBadge}
                        </span>
                        <button
                          onClick={() => setSelectedItem(item)}
                          className="p-1 rounded bg-white/5 hover:bg-cyan-brand hover:text-black text-dimwhite transition-colors"
                          title="Inspect Full Resolution"
                          aria-label="Inspect Full Resolution"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Centered Image Frame - No Overflow, No Crop */}
                    <div
                      onClick={() => setSelectedItem(item)}
                      className="relative w-full h-[320px] sm:h-[400px] md:h-[440px] flex items-center justify-center p-3 bg-gradient-to-b from-[#06080e] to-[#020306] cursor-pointer group/img overflow-hidden"
                    >
                      <Image
                        src={item.imageSrc}
                        alt={item.imageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 650px"
                        className="object-contain object-center p-2 transition-transform duration-300 ease-out group-hover/img:scale-[1.02]"
                        priority={index < 2}
                      />
                      <div className="absolute inset-0 bg-cyan-brand/0 group-hover/img:bg-cyan-brand/5 transition-colors pointer-events-none" />
                    </div>

                    {/* Subtle Bottom Bar */}
                    <div className="px-4 py-2 bg-[#090d15]/80 border-t border-surface-border/60 flex items-center justify-between text-[10px] font-mono text-tertiary">
                      <span>CLICK IMAGE TO ENLARGE</span>
                      <span className="text-cyan-brand font-semibold">AASHAV ARCHIVE</span>
                    </div>
                  </div>
                </div>

                {/* Descriptive Content Column */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                  {/* Category Pill & Sequence Index */}
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-sunrise-brand font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-sunrise-brand" />
                      <span>{item.category}</span>
                    </div>
                    <span className="text-[11px] font-mono text-tertiary px-2 py-0.5 rounded bg-surface border border-surface-border">
                      MILESTONE {String(index + 1).padStart(2, "0")} / {String(GALLERY_ITEMS.length).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-display font-black text-offwhite tracking-wide leading-tight group-hover:text-cyan-brand transition-colors">
                    {item.title}
                  </h2>
                  <p className="text-xs sm:text-sm font-mono text-cyan-brand/90 mt-1 font-medium">
                    {item.subtitle}
                  </p>

                  {/* Paragraph Description */}
                  <p className="mt-4 text-sm sm:text-base text-dimwhite leading-relaxed font-sans">
                    {item.description}
                  </p>

                  {/* Key Highlights Bullet Chips */}
                  <div className="mt-6 pt-5 border-t border-surface-border/60">
                    <div className="text-[10px] font-mono text-tertiary uppercase tracking-widest mb-3">
                      Key Highlights &amp; Insights
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {item.keyHighlights.map((hl, hlIdx) => (
                        <span
                          key={hlIdx}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-offwhite hover:border-cyan-brand/40 transition-colors"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-brand shrink-0" />
                          <span>{hl}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Inspect Action Link */}
                  <div className="mt-6">
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="inline-flex items-center gap-2 text-xs font-mono text-cyan-brand hover:text-white font-semibold group/btn transition-colors"
                    >
                      <span>INSPECT FULL RESOLUTION</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Bottom Navigation & Hidden Routes Hub */}
        <div className="mt-24 pt-16 border-t border-surface-border/80">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sunrise-brand/10 border border-sunrise-brand/30 text-sunrise-brand font-mono text-xs tracking-wider uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>EXPLORE ALL EVENT ROUTES</span>
            </div>
            <h3 className="text-2xl font-display font-black text-offwhite tracking-wide uppercase">
              HACKATHON TELEMETRY &amp; TOOLS
            </h3>
            <p className="text-xs sm:text-sm font-mono text-dimwhite mt-2">
              Access the live stage broadcast screen, organizer synchronization control room, and pitch presentation clocks.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/timer"
              className="p-5 rounded-xl bg-surface/50 border border-surface-border hover:border-cyan-brand/50 transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-cyan-brand/10 border border-cyan-brand/30 flex items-center justify-center text-cyan-brand mb-3 group-hover:scale-110 transition-transform">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="font-display font-bold text-base text-offwhite group-hover:text-cyan-brand transition-colors">
                  Presentation Timer
                </div>
                <p className="text-xs font-mono text-dimwhite mt-1">
                  5-Minute pitch countdown clock for competing teams.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1 text-[11px] font-mono text-cyan-brand font-semibold">
                <span>LAUNCH TIMER</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/control"
              className="p-5 rounded-xl bg-surface/50 border border-surface-border hover:border-sunrise-brand/50 transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-sunrise-brand/10 border border-sunrise-brand/30 flex items-center justify-center text-sunrise-brand mb-3 group-hover:scale-110 transition-transform">
                  <Sliders className="w-5 h-5" />
                </div>
                <div className="font-display font-bold text-base text-offwhite group-hover:text-sunrise-brand transition-colors">
                  Control Room
                </div>
                <p className="text-xs font-mono text-dimwhite mt-1">
                  Organizer control console to start, pause, and reset synchronized clocks.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1 text-[11px] font-mono text-sunrise-brand font-semibold">
                <span>OPEN CONTROL</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/live"
              className="p-5 rounded-xl bg-surface/50 border border-surface-border hover:border-violet-brand/50 transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-violet-brand/10 border border-violet-brand/30 flex items-center justify-center text-violet-brand mb-3 group-hover:scale-110 transition-transform">
                  <Tv className="w-5 h-5" />
                </div>
                <div className="font-display font-bold text-base text-offwhite group-hover:text-violet-brand transition-colors">
                  Live Stage Display
                </div>
                <p className="text-xs font-mono text-dimwhite mt-1">
                  Projector-ready stage broadcast timer with large digital readout.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1 text-[11px] font-mono text-violet-brand font-semibold">
                <span>VIEW BROADCAST</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/"
              className="p-5 rounded-xl bg-surface/50 border border-surface-border hover:border-white/50 transition-all duration-200 group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-offwhite mb-3 group-hover:scale-110 transition-transform">
                  <ArrowLeft className="w-5 h-5" />
                </div>
                <div className="font-display font-bold text-base text-offwhite group-hover:text-cyan-brand transition-colors">
                  AASHAV Homepage
                </div>
                <p className="text-xs font-mono text-dimwhite mt-1">
                  Return to main landing page with problem statements and schedule.
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1 text-[11px] font-mono text-offwhite font-semibold">
                <span>GO TO HOME</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Full-Screen Image Inspection */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl p-4 sm:p-8 flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full bg-[#0d1017] border border-white/20 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
            >
              {/* Header Bar */}
              <div className="px-5 py-4 border-b border-surface-border flex items-center justify-between bg-surface/80">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider uppercase rounded bg-cyan-brand/20 text-cyan-brand border border-cyan-brand/40">
                    {selectedItem.category}
                  </span>
                  <span className="font-display font-bold text-sm sm:text-base text-offwhite truncate">
                    {selectedItem.title}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="p-1.5 rounded-lg text-dimwhite hover:text-white hover:bg-white/10 transition-colors"
                  aria-label="Close Preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Image Container */}
              <div className="relative flex-1 min-h-[300px] sm:min-h-[500px] bg-black flex items-center justify-center p-2">
                <Image
                  src={selectedItem.imageSrc}
                  alt={selectedItem.imageAlt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>

              {/* Caption Footer */}
              <div className="p-4 sm:p-5 border-t border-surface-border bg-surface/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <p className="text-xs sm:text-sm font-sans text-dimwhite max-w-3xl leading-relaxed">
                  {selectedItem.description}
                </p>
                <div className="shrink-0 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-sunrise-brand/20 text-sunrise-brand text-[11px] font-mono border border-sunrise-brand/40">
                    {selectedItem.roleBadge}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
