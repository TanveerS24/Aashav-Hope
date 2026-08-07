"use client";

import React from "react";
import { EVENT_CONFIG } from "@/config/event";
import { Cpu, Target, Zap, Users2, ShieldCheck, Flame, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const PILLARS = [
  {
    icon: Target,
    title: "REAL PROBLEMS",
    description:
      "Problem statements adapted from real-world industry and civic challenges, ensuring authentic engineering relevance.",
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
    title: "SOLO OR TEAMWORK",
    description:
      "Participate solo or form 1–4 member teams to build and defend your technical solution before jury panels.",
  },
  {
    icon: ShieldCheck,
    title: "NATIONAL PREPARATION",
    description:
      "Gain tactical experience presenting to technical panels and defending architectural choices prior to major national challenges.",
  },
];

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative min-h-screen flex flex-col justify-center py-24 px-4 sm:px-6 lg:px-8 max-w-[1600px] w-full mx-auto">
      {/* Editorial Header */}
      <div className="flex flex-col items-center sm:items-start text-center sm:text-left gap-4">
        <div className="flex items-center gap-2 font-mono text-xs text-cyan-brand tracking-widest uppercase">
          <span className="text-tertiary">001 /</span>
          <span>MISSION &amp; PHILOSOPHY</span>
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
                &quot;Not just another hackathon. A proving ground for real-world technical innovation.&quot;
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
            By leveraging authentic <strong className="text-cyan-brand font-mono font-normal">high-impact national &amp; industry</strong> problem statements, Aashav provides student teams with an invaluable opportunity to understand complex problem statements, construct resilient system architectures, and deliver pitch-ready technical implementations.
          </p>
          <p>
            Whether participating <strong className="text-offwhite font-semibold">online or on-campus at SIMATS School of Engineering</strong>, your team will undergo rigorous evaluations designed to simulate national-level hackathon pressure.
          </p>
          <p>
            Both <strong className="text-sunrise-brand font-semibold">Software &amp; Hardware tracks</strong> are fully supported. Teams building physical hardware prototypes (IoT, embedded systems, robotics, smart sensor networks) and software applications (AI/ML, Web, Mobile, Cloud, GIS) compete under tailored evaluation rubrics focusing on technical depth, execution completeness, and architectural defense.
          </p>

          <p>
            Teams are also strongly encouraged to <strong className="text-cyan-brand font-semibold">bring their own problem statements</strong>, as long as the proposed challenge is meaningful, addresses a real-world civic or industry problem, and presents genuine technical depth.
          </p>

          <p>
            All solutions will be rigorously evaluated by technical jury panels across multiple key metrics including <strong className="text-offwhite font-semibold">completeness, real-world impact, usability, and technical feasibility</strong>.
          </p>

          <div className="pt-2 flex items-center gap-3 text-xs font-mono text-cyan-brand">
            <div className="h-2 w-2 rounded-full bg-cyan-brand animate-ping" />
            <span>EXPERT JURY EVALUATION &amp; TECHNICAL ARCHITECTURE DEFENSE</span>
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
