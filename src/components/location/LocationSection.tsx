"use client";

import React from "react";
import { EVENT_CONFIG } from "@/config/event";
import { MapPin, Navigation, ExternalLink, Compass, ShieldAlert } from "lucide-react";

export const LocationSection: React.FC = () => {
  const handleOpenMaps = () => {
    if (EVENT_CONFIG.mapsUrl.includes("PLACEHOLDER")) {
      alert(
        "Google Maps URL is set to a placeholder in src/config/event.ts. Update 'mapsUrl' with your venue link."
      );
    } else {
      window.open(EVENT_CONFIG.mapsUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section id="location" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Container Card */}
      <div className="relative rounded-lg bg-surface/90 border border-surface-border p-8 sm:p-12 overflow-hidden backdrop-blur-xl">
        {/* Vector Radar Mesh Visual Background */}
        <div className="absolute right-0 top-0 bottom-0 w-full lg:w-1/2 opacity-20 pointer-events-none bg-grid-cyan bg-[size:30px_30px]" />
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-cyan-brand/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left Venue Information */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-brand tracking-widest uppercase">
              <span className="text-tertiary">005 /</span>
              <span>HYBRID VENUE & PHYSICAL LOCATION</span>
            </div>

            <h2 className="font-display font-black text-4xl sm:text-6xl text-offwhite tracking-tight uppercase">
              WHERE HOPE BEGINS
            </h2>

            <div className="space-y-2">
              <div className="flex items-center gap-3 text-sunrise-brand font-mono font-bold text-lg">
                <MapPin className="w-5 h-5" />
                <span>{EVENT_CONFIG.venueName}</span>
              </div>
              <p className="text-sm font-mono text-dimwhite leading-relaxed pl-8">
                {EVENT_CONFIG.venueFullAddress}
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-dimwhite">
              <div className="px-3 py-1.5 rounded bg-card border border-surface-border flex items-center gap-2">
                <Compass className="w-4 h-4 text-cyan-brand" />
                <span>COORDINATES: 13.0298° N, 79.9723° E</span>
              </div>
              <div className="px-3 py-1.5 rounded bg-card border border-surface-border flex items-center gap-2">
                <Navigation className="w-4 h-4 text-violet-brand" />
                <span>HYBRID ROOMS + ON-CAMPUS ARENA</span>
              </div>
            </div>

            {/* Action CTA Button */}
            <div className="pt-4">
              <button
                onClick={handleOpenMaps}
                className="px-6 py-3.5 rounded-sm bg-gradient-to-r from-cyan-brand via-cyan-dim to-violet-brand text-background font-mono font-bold text-xs tracking-wider uppercase flex items-center gap-2.5 shadow-[0_0_20px_rgba(0,240,255,0.25)] hover:shadow-[0_0_35px_rgba(0,240,255,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all group"
              >
                <span>OPEN IN MAPS</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Stylized Interactive Radar Graphic */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full border border-cyan-brand/30 p-4 flex items-center justify-center bg-card/60">
              {/* Concentric radar rings */}
              <div className="absolute inset-4 rounded-full border border-cyan-brand/20 animate-ping opacity-20" />
              <div className="absolute inset-12 rounded-full border border-surface-border" />
              <div className="absolute inset-24 rounded-full border border-sunrise-brand/30" />

              {/* Crosshair lines */}
              <div className="absolute inset-x-0 top-1/2 h-[1px] bg-cyan-brand/20" />
              <div className="absolute inset-y-0 left-1/2 w-[1px] bg-cyan-brand/20" />

              {/* Center Beacon Pin */}
              <div className="relative z-10 flex flex-col items-center gap-2 text-center p-4 bg-background/90 border border-cyan-brand/50 rounded shadow-xl">
                <div className="h-3 w-3 rounded-full bg-sunrise-brand animate-ping" />
                <span className="font-mono font-black text-xs text-offwhite tracking-wider">
                  SIMATS ENG
                </span>
                <span className="text-[9px] font-mono text-cyan-brand">
                  100% READY
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
