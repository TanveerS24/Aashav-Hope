"use client";

import React from "react";
import { EVENT_CONFIG } from "@/config/event";
import { Cpu, Target, Zap, Users2, ShieldCheck, Flame } from "lucide-react";
import { motion } from "framer-motion";

const PILLARS = [
  {
    icon: Target,
    title: "REAL PROBLEMS",
    description:
      "Problem statements adapted from previous-year Smart India Hackathon challenges, ensuring authentic industry relevance.",
  },
  {
    icon: Cpu,
    title: "INDUSTRY THINKING",
    description:
      "Move beyond toy applications. Architect scalable, production-ready solutions evaluated on code quality and technical depth.",
  },
  {
    icon: Zap,
    title: "RAPID BUILDING",
    description:
      "Experience high-intensity development under strict timed constraints mirroring national competition pressure.",
  },
  {
    icon: Users2,
    title: "TEAMWORK",
    description:
      "Form 3–4 member multidisciplinary teams to delegate engineering, UI/UX, and architectural defense responsibilities.",
  },
  {
    icon: ShieldCheck,
    title: "SIH PREPARATION",
    description:
      "Gain tactical experience presenting to technical panels and defending architectural choices prior to SIH 2026.",
  },
];

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-[1600px] w-full mx-auto">
      {/* Editorial Header */}
      <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-4">
        <div className="flex items-center gap-2 font-mono text-xs text-cyan-brand tracking-widest uppercase">
          <span className="text-tertiary">002 /</span>
          <span>MISSION & PHILOSOPHY</span>
        </div>

        <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-offwhite tracking-tight uppercase">
          WHY AASHAV?
        </h2>

        {/* Prominent Callout Statement */}
        <div className="mt-4 p-6 sm:p-8 rounded-sm bg-gradient-to-r from-card via-surface to-card border-l-4 border-sunrise-brand border-y border-r border-surface-border w-full">
          <div className="flex items-start gap-4">
            <Flame className="w-8 h-8 text-sunrise-brand flex-shrink-0 mt-1" />
            <div>
              <blockquote className="font-display font-bold text-xl sm:text-3xl text-offwhite tracking-wide leading-snug">
                &quot;Not just another hackathon. A proving ground before SIH 2026.&quot;
              </blockquote>
              <p className="mt-2 text-xs font-mono text-dimwhite">
                Engineered at SIMATS School of Engineering to bridge academic learning with competitive technical execution.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Editorial Content Grid */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Editorial Narrative */}
        <div className="lg:col-span-7 space-y-6 text-dimwhite font-sans leading-relaxed text-base sm:text-lg">
          <p>
            <strong className="text-offwhite font-semibold">Aashav (Meaning &quot;The hope&quot;)</strong> was conceived to solve a systemic gap in traditional student hackathons: the reliance on generic surface-level prototypes.
          </p>
          <p>
            By leveraging authentic previous-year <strong className="text-cyan-brand font-mono font-normal">Smart India Hackathon (SIH)</strong> problem statements, Aashav provides student teams with an invaluable opportunity to understand complex problem statements, construct resilient system architectures, and deliver pitch-ready technical implementations.
          </p>
          <p>
            Whether participating <strong className="text-offwhite font-semibold">online or on-campus at SIMATS School of Engineering</strong>, your team will undergo rigorous evaluations designed to simulate national-level hackathon pressure.
          </p>

          <div className="pt-4 flex items-center gap-3 text-xs font-mono text-cyan-brand">
            <div className="h-2 w-2 rounded-full bg-cyan-brand animate-ping" />
            <span>HONORING 5 WINNING TEAMS AT THE VALEDICTORY CEREMONY</span>
          </div>
        </div>

        {/* Right Pillars Technical Grid */}
        <div className="lg:col-span-5 grid grid-cols-1 gap-4">
          {PILLARS.map((pillar, idx) => {
            const IconComponent = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-5 rounded-sm bg-surface/70 border border-surface-border hover:border-cyan-brand/40 transition-colors group"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded bg-cyan-brand/10 text-cyan-brand group-hover:bg-sunrise-brand/10 group-hover:text-sunrise-brand transition-colors">
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <h3 className="font-mono font-bold text-sm text-offwhite tracking-wider">
                    {pillar.title}
                  </h3>
                </div>
                <p className="text-xs font-mono text-dimwhite leading-relaxed pl-9">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
