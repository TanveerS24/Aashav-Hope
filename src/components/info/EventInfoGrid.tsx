"use client";

import React from "react";
import { EVENT_CONFIG } from "@/config/event";
import { Calendar, MapPin, Monitor, Users, Trophy } from "lucide-react";

export const EventInfoGrid: React.FC = () => {
  return (
    <section className="relative py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Asymmetric Technical Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Item 1: DATE (Span 4) */}
        <div className="md:col-span-4 rounded-sm bg-surface/90 border border-surface-border p-6 flex flex-col justify-between relative overflow-hidden group hover:border-cyan-brand/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-cyan-brand tracking-widest uppercase">
              SPEC 01 // EVENT DATE
            </span>
            <Calendar className="w-4 h-4 text-dimwhite group-hover:text-cyan-brand transition-colors" />
          </div>
          <div className="mt-8">
            <div className="font-display font-black text-3xl sm:text-4xl text-offwhite tracking-tight">
              22 AUG 2026
            </div>
            <div className="text-xs font-mono text-dimwhite mt-1">
              SATURDAY • 08:30 AM — 03:30 PM IST
            </div>
          </div>
        </div>

        {/* Item 2: VENUE (Span 8) */}
        <div className="md:col-span-8 rounded-sm bg-gradient-to-br from-surface to-card border border-surface-border p-6 flex flex-col justify-between relative overflow-hidden group hover:border-cyan-brand/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-cyan-brand tracking-widest uppercase">
              SPEC 02 // VENUE LOCATION
            </span>
            <MapPin className="w-4 h-4 text-sunrise-brand" />
          </div>
          <div className="mt-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="font-display font-black text-2xl sm:text-4xl text-offwhite tracking-tight uppercase">
                {EVENT_CONFIG.venueName}
              </div>
              <div className="text-xs font-mono text-dimwhite mt-1">
                CAMPUS ARENA & VIRTUAL HYBRID ROOMS
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-cyan-brand/10 text-cyan-brand text-xs font-mono border border-cyan-brand/30 self-start sm:self-auto">
              HYBRID HOSTING
            </span>
          </div>
        </div>

        {/* Item 3: FORMAT (Span 4) */}
        <div className="md:col-span-4 rounded-sm bg-surface/90 border border-surface-border p-6 flex flex-col justify-between relative overflow-hidden group hover:border-cyan-brand/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-cyan-brand tracking-widest uppercase">
              SPEC 03 // PARTICIPATION MODE
            </span>
            <Monitor className="w-4 h-4 text-dimwhite group-hover:text-cyan-brand transition-colors" />
          </div>
          <div className="mt-8">
            <div className="font-display font-black text-2xl sm:text-3xl text-offwhite tracking-tight">
              ONLINE + OFFLINE
            </div>
            <div className="text-xs font-mono text-dimwhite mt-1">
              ON-CAMPUS LABS OR REMOTE DISCORD ARENAS
            </div>
          </div>
        </div>

        {/* Item 4: TEAM SIZE (Span 4) */}
        <div className="md:col-span-4 rounded-sm bg-surface/90 border border-surface-border p-6 flex flex-col justify-between relative overflow-hidden group hover:border-cyan-brand/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-cyan-brand tracking-widest uppercase">
              SPEC 04 // SQUAD STRUCTURE
            </span>
            <Users className="w-4 h-4 text-dimwhite group-hover:text-cyan-brand transition-colors" />
          </div>
          <div className="mt-8">
            <div className="font-display font-black text-3xl sm:text-4xl text-offwhite tracking-tight">
              3–4 MEMBERS
            </div>
            <div className="text-xs font-mono text-dimwhite mt-1">
              PER TEAM • MULTIDISCIPLINARY ALLOWED
            </div>
          </div>
        </div>

        {/* Item 5: WINNERS (Span 4) */}
        <div className="md:col-span-4 rounded-sm bg-gradient-to-br from-sunrise-brand/10 via-surface to-surface border border-sunrise-brand/40 p-6 flex flex-col justify-between relative overflow-hidden group hover:border-sunrise-brand transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono text-sunrise-brand tracking-widest uppercase">
              SPEC 05 // HONORED TEAMS
            </span>
            <Trophy className="w-4 h-4 text-sunrise-brand animate-pulse" />
          </div>
          <div className="mt-8 flex items-baseline gap-3">
            <div className="font-display font-black text-4xl sm:text-5xl text-sunrise-brand tracking-tight">
              5 TEAMS
            </div>
            <div className="text-xs font-mono text-dimwhite">
              HONORED AS WINNERS
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
