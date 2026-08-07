"use client";

import React from "react";
import Image from "next/image";
import { Linkedin, Award, Briefcase, ExternalLink, ShieldCheck, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export interface Evaluator {
  name: string;
  role: string;
  company: string;
  ietRole: string;
  image: string;
  linkedin: string;
  summary: string;
  highlights: string[];
}

const EVALUATORS: Evaluator[] = [
  {
    name: "Ananth Krishna S",
    role: "Project Manager — Engineering",
    company: "Kellogg Brown and Root (KBR)",
    ietRole: "IET Executive Member, Chennai Local Network",
    image: "/images/ananth.png",
    linkedin:
      "https://www.linkedin.com/in/ananth-krishna-miet-ceng-09665534?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    summary:
      "Engineering and project management leader with over 18 years of experience executing high-value international energy, oil & gas, and infrastructure projects across global giants including BP, Exxon, and Saudi Aramco. Chartered Engineer (UK) dedicated to mentoring future engineering talent.",
    highlights: [
      "18+ Years International Engineering Leadership",
      "Chartered Engineer (UK) & IET Executive Member",
      "IET Chennai Men Engineer Award 2022 Recipient",
    ],
  },
  {
    name: "Kadiyala Vaisshnavi",
    role: "Manager — Active Safety & ADAS Team",
    company: "Daimler India Commercial Vehicles",
    ietRole: "YP Secretary, IET Chennai | YP Member, IET Bangalore",
    image: "/images/vaisshnavi.png",
    linkedin:
      "https://www.linkedin.com/in/vaisshnavi-k?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    summary:
      "Innovation-driven ADAS and Active Safety engineering manager at Daimler India specializing in autonomous safety systems, electric vehicle infrastructure, and smart IoT automation. Published IEEE researcher and recipient of the Best Women Engineer Award.",
    highlights: [
      "Active Safety & ADAS Manager at Daimler India",
      "Published IEEE International Conference Researcher",
      "Best Women Engineer Award Recipient",
    ],
  },
];

export const EvaluatorsSection: React.FC = () => {
  return (
    <section id="evaluators" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-[1600px] w-full mx-auto overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-cyan-brand/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-sunrise-brand/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col items-center text-center gap-4 mb-16">
        <div className="flex items-center gap-2 font-mono text-xs text-cyan-brand tracking-widest uppercase">
          <span className="text-tertiary">006 /</span>
          <span>CHIEF GUESTS &amp; EVALUATORS</span>
        </div>

        <h2 className="font-display font-black text-4xl sm:text-6xl text-offwhite tracking-tight uppercase">
          EMINENT INDUSTRY LEADERS &amp; JURY
        </h2>

        <p className="text-sm sm:text-base font-mono text-dimwhite max-w-2xl leading-relaxed">
          Meet our distinguished chief guests and technical evaluators bringing industry benchmark standards and expert guidance to Aashav 2026.
        </p>
      </div>

      {/* Evaluator Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {EVALUATORS.map((person, idx) => (
          <motion.div
            key={person.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            className="rounded-lg bg-surface/90 border border-surface-border hover:border-cyan-brand/40 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden backdrop-blur-xl group transition-all"
          >
            {/* Glowing Accent Border Line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-brand/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div>
              {/* Profile Header (Image + Title block) */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6 text-center sm:text-left">
                {/* Profile Avatar Frame */}
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-br from-cyan-brand via-surface-border to-sunrise-brand flex-shrink-0 shadow-[0_0_25px_rgba(0,240,255,0.2)]">
                  <div className="w-full h-full rounded-full overflow-hidden bg-card">
                    <Image
                      src={person.image}
                      alt={person.name}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute bottom-0 right-0 p-1.5 rounded-full bg-background border border-cyan-brand/50 text-cyan-brand shadow-md">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                </div>

                {/* Identity Info */}
                <div className="space-y-2 flex-1">
                  <span className="text-[10px] font-mono tracking-widest text-cyan-brand uppercase px-2.5 py-0.5 rounded bg-cyan-brand/10 border border-cyan-brand/30 inline-block">
                    CHIEF GUEST &amp; EVALUATOR
                  </span>
                  <h3 className="font-display font-black text-2xl sm:text-3xl text-offwhite tracking-tight uppercase">
                    {person.name}
                  </h3>
                  <p className="text-xs sm:text-sm font-mono font-semibold text-sunrise-brand">
                    {person.role}
                  </p>
                  <p className="text-xs font-mono text-dimwhite flex items-center justify-center sm:justify-start gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-tertiary flex-shrink-0" />
                    <span>{person.company}</span>
                  </p>
                  <p className="text-[11px] font-mono text-cyan-brand/90 flex items-center justify-center sm:justify-start gap-1.5">
                    <Award className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{person.ietRole}</span>
                  </p>
                </div>
              </div>

              {/* Concise Summary Paragraph */}
              <p className="text-xs sm:text-sm font-sans text-dimwhite leading-relaxed mb-6 border-t border-surface-border/60 pt-4">
                {person.summary}
              </p>

              {/* Key Highlight Badges */}
              <div className="space-y-2 mb-6 font-mono text-xs">
                {person.highlights.map((item, hIdx) => (
                  <div key={hIdx} className="flex items-center gap-2 text-offwhite bg-card/60 border border-surface-border/60 px-3 py-1.5 rounded">
                    <Sparkles className="w-3.5 h-3.5 text-sunrise-brand flex-shrink-0" />
                    <span className="text-[11px]">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* LinkedIn CTA Button */}
            <div className="pt-4 border-t border-surface-border/60">
              <a
                href={person.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-4 py-2.5 rounded bg-card hover:bg-cyan-brand/10 border border-surface-border hover:border-cyan-brand/50 text-offwhite hover:text-cyan-brand text-xs font-mono font-bold tracking-wider uppercase inline-flex items-center justify-center gap-2 transition-all group/link"
              >
                <Linkedin className="w-4 h-4 text-cyan-brand group-hover/link:scale-110 transition-transform" />
                <span>CONNECT ON LINKEDIN</span>
                <ExternalLink className="w-3.5 h-3.5 text-dimwhite group-hover/link:text-cyan-brand group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-all" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
