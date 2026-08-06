"use client";

import React from "react";
import { EVENT_CONFIG } from "@/config/event";
import { Mail, Phone, Linkedin, MessageSquare, UserCheck, Shield } from "lucide-react";

export const ContactSection: React.FC = () => {
  const { coordinator } = EVENT_CONFIG;

  const hasEmail =
    coordinator.email && !coordinator.email.includes("YOUR_EMAIL");
  const hasPhone =
    coordinator.phone && !coordinator.phone.includes("YOUR_PHONE");
  const hasLinkedin =
    coordinator.linkedin && !coordinator.linkedin.includes("YOUR_LINKEDIN");

  const handleEmail = () => {
    if (hasEmail) {
      window.location.href = `mailto:${coordinator.email}`;
    } else {
      alert("Coordinator email placeholder 'YOUR_EMAIL' is configured in src/config/event.ts.");
    }
  };

  const handlePhone = () => {
    if (hasPhone) {
      window.location.href = `tel:${coordinator.phone}`;
    } else {
      alert("Coordinator phone placeholder 'YOUR_PHONE' is configured in src/config/event.ts.");
    }
  };

  const handleLinkedin = () => {
    if (hasLinkedin) {
      window.open(coordinator.linkedin, "_blank", "noopener,noreferrer");
    } else {
      alert("Coordinator LinkedIn placeholder 'YOUR_LINKEDIN' is configured in src/config/event.ts.");
    }
  };

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-[1600px] w-full mx-auto">
      <div className="relative rounded-lg bg-surface/90 border border-surface-border p-8 sm:p-12 overflow-hidden backdrop-blur-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Header Info (Span 7) */}
          <div className="lg:col-span-7 space-y-6 flex flex-col items-center text-center lg:items-start lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 font-mono text-xs text-cyan-brand tracking-widest uppercase">
              <span className="text-tertiary">008 /</span>
              <span>DIRECT INQUIRIES & SUPPORT</span>
            </div>

            <h2 className="font-display font-black text-4xl sm:text-6xl text-offwhite tracking-tight uppercase">
              NEED ANSWERS?
            </h2>

            <p className="text-lg font-sans text-dimwhite">
              Talk to the Aashav team.
            </p>

            <p className="text-xs font-mono text-dimwhite leading-relaxed max-w-lg">
              Have questions regarding registration eligibility, hybrid participation, problem statements, or venue logistics? Reach out directly to the Head Coordinator.
            </p>
          </div>

          {/* Head Coordinator Card (Span 5) */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-8 rounded-sm bg-card border border-surface-border hover:border-cyan-brand/40 transition-all shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-surface-border pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded bg-cyan-brand/10 border border-cyan-brand/30 flex items-center justify-center text-cyan-brand">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-cyan-brand tracking-widest uppercase block">
                      {coordinator.role}
                    </span>
                    <h3 className="font-display font-bold text-xl text-offwhite tracking-wide">
                      {coordinator.name}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleEmail}
                  className="w-full py-3 px-4 rounded bg-surface hover:bg-surface-border border border-surface-border hover:border-cyan-brand text-offwhite font-mono text-xs tracking-wider uppercase flex items-center justify-between transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-cyan-brand" />
                    <span>EMAIL COORDINATOR</span>
                  </span>
                  <span className="text-[10px] text-dimwhite">{hasEmail ? coordinator.email : "[CONFIGURED]"}</span>
                </button>

                <button
                  onClick={handlePhone}
                  className="w-full py-3 px-4 rounded bg-surface hover:bg-surface-border border border-surface-border hover:border-cyan-brand text-offwhite font-mono text-xs tracking-wider uppercase flex items-center justify-between transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-sunrise-brand" />
                    <span>CALL DIRECT</span>
                  </span>
                  <span className="text-[10px] text-dimwhite">{hasPhone ? coordinator.phone : "[CONFIGURED]"}</span>
                </button>

                <button
                  onClick={handleLinkedin}
                  className="w-full py-3 px-4 rounded bg-surface hover:bg-surface-border border border-surface-border hover:border-cyan-brand text-offwhite font-mono text-xs tracking-wider uppercase flex items-center justify-between transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4 text-violet-brand" />
                    <span>LINKEDIN PROFILE</span>
                  </span>
                  <span className="text-[10px] text-dimwhite">CONNECT</span>
                </button>
              </div>

              <div className="mt-6 pt-4 border-t border-surface-border/40 text-[10px] font-mono text-tertiary text-center">
                SIMATS SCHOOL OF ENGINEERING • AASHAV 2026
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
