"use client";

import React from "react";

export const BackgroundHorizon: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-background">
      {/* 1. Subtle Engineering Grid Overlay */}
      <div className="absolute inset-0 bg-grid-pattern bg-[size:40px_40px] opacity-[0.18]" />

      {/* 2. Horizon Glow Accent (Light rising from bottom) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[140vw] max-w-[1600px] h-[550px] bg-horizon-glow opacity-80 filter blur-[80px] pointer-events-none animate-pulse-glow" />

      {/* 3. Luminous Orb / Rising Sun of HOPE motif */}
      <div className="absolute -bottom-[240px] left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-t-full bg-gradient-to-t from-sunrise-brand/20 via-cyan-brand/10 to-transparent blur-3xl opacity-60" />

      {/* 4. Thin Vector Horizon Beam Line */}
      <div className="absolute top-[68%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-brand/30 to-transparent" />

      {/* 5. Terminal Coordinates micro-elements on edges */}
      <div className="hidden lg:flex justify-between items-center absolute top-24 left-8 right-8 text-[10px] font-mono text-cyan-brand/30 tracking-widest select-none">
        <span>LOC: 13.0298° N, 79.9723° E</span>
        <span className="animate-beacon">● SIGNAL STATUS: ACTIVE</span>
        <span>SYS.REF: AASHAV_2026_SIH_WARMUP</span>
      </div>

      {/* 6. Subtle Noise / Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(4,5,7,0.7)_100%)]" />
    </div>
  );
};
