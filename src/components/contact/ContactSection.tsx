"use client";

import React from "react";
import { EVENT_CONFIG, CoordinatorConfig } from "@/config/event";
import { Mail, Phone, UserCheck, ShieldCheck } from "lucide-react";

export const ContactSection: React.FC = () => {
  const { coordinators } = EVENT_CONFIG;

  const handleEmail = (email: string) => {
    if (email && !email.includes("FACULTY_EMAIL")) {
      window.location.href = `mailto:${email}`;
    } else {
      alert("Email placeholder is configured in src/config/event.ts.");
    }
  };

  const handlePhone = (phone: string) => {
    if (phone && !phone.includes("FACULTY_PHONE")) {
      window.location.href = `tel:${phone}`;
    } else {
      alert("Phone placeholder is configured in src/config/event.ts.");
    }
  };

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-[1600px] w-full mx-auto">
      <div className="relative rounded-lg bg-surface/90 border border-surface-border p-8 sm:p-12 overflow-hidden backdrop-blur-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Header Info (Span 5) */}
          <div className="lg:col-span-5 space-y-6 flex flex-col items-center text-center lg:items-start lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-2 font-mono text-xs text-cyan-brand tracking-widest uppercase">
              <span className="text-tertiary">009 /</span>
              <span>DIRECT INQUIRIES &amp; SUPPORT</span>
            </div>

            <h2 className="font-display font-black text-4xl sm:text-6xl text-offwhite tracking-tight uppercase">
              NEED ANSWERS?
            </h2>

            <p className="text-lg font-sans text-dimwhite">
              Talk to the Aashav team.
            </p>

            <p className="text-xs font-mono text-dimwhite leading-relaxed max-w-lg">
              Have questions regarding registration eligibility, hybrid participation, problem statements, or venue? Reach out directly to our Head Coordinator or Faculty Coordinator.
            </p>
          </div>

          {/* Coordinators Grid (Span 7) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            {coordinators.map((c: CoordinatorConfig, idx: number) => {
              const isFaculty = c.role.toLowerCase().includes("faculty");
              const isEmailValid = c.email && !c.email.includes("FACULTY_EMAIL");
              const isPhoneValid = c.phone && !c.phone.includes("FACULTY_PHONE");

              return (
                <div
                  key={c.role + "-" + idx}
                  className="p-6 rounded-sm bg-card border border-surface-border hover:border-cyan-brand/40 transition-all shadow-2xl relative overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between border-b border-surface-border pb-4 mb-6">
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-10 w-10 rounded border flex items-center justify-center ${isFaculty
                              ? "bg-sunrise-brand/10 border-sunrise-brand/30 text-sunrise-brand"
                              : "bg-cyan-brand/10 border-cyan-brand/30 text-cyan-brand"
                            }`}
                        >
                          {isFaculty ? (
                            <ShieldCheck className="w-5 h-5" />
                          ) : (
                            <UserCheck className="w-5 h-5" />
                          )}
                        </div>
                        <div>
                          <span
                            className={`text-[10px] font-mono tracking-widest uppercase block ${isFaculty ? "text-sunrise-brand" : "text-cyan-brand"
                              }`}
                          >
                            {c.role}
                          </span>
                          <h3 className="font-display font-bold text-lg text-offwhite tracking-wide">
                            {c.name}
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons (No LinkedIn) */}
                    <div className="space-y-3">
                      <button
                        onClick={() => handleEmail(c.email)}
                        className="w-full py-3 px-4 rounded bg-surface hover:bg-surface-border border border-surface-border hover:border-cyan-brand text-offwhite font-mono text-xs tracking-wider uppercase flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 transition-colors"
                      >
                        <span className="flex items-center gap-2 shrink-0">
                          <Mail className="w-4 h-4 text-cyan-brand" />
                          <span>EMAIL</span>
                        </span>
                        <span className="text-[10px] sm:text-xs text-dimwhite break-all text-right lowercase font-mono">
                          {isEmailValid ? c.email : "[configured]"}
                        </span>
                      </button>

                      <button
                        onClick={() => handlePhone(c.phone)}
                        className="w-full py-3 px-4 rounded bg-surface hover:bg-surface-border border border-surface-border hover:border-cyan-brand text-offwhite font-mono text-xs tracking-wider uppercase flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 transition-colors"
                      >
                        <span className="flex items-center gap-2 shrink-0">
                          <Phone className="w-4 h-4 text-sunrise-brand" />
                          <span>CALL DIRECT</span>
                        </span>
                        <span className="text-[10px] sm:text-xs text-dimwhite shrink-0">
                          {isPhoneValid ? c.phone : "[CONFIGURED]"}
                        </span>
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-surface-border/40 text-[10px] font-mono text-tertiary text-center">
                    SIMATS SCHOOL OF ENGINEERING • DEPARTMENT OF MACHINE LEARNING
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
