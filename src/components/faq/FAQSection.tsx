"use client";

import React, { useState } from "react";
import { FAQ_ITEMS } from "@/data/faq";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>("faq-2"); // Open team size by default

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-[1400px] w-full mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center text-center gap-4 mb-16">
        <div className="flex items-center gap-2 font-mono text-xs text-cyan-brand tracking-widest uppercase">
          <span className="text-tertiary">010 /</span>
          <span>FREQUENTLY ASKED QUESTIONS</span>
        </div>

        <h2 className="font-display font-black text-4xl sm:text-6xl text-offwhite tracking-tight uppercase">
          CLEARING ALL DOUBTS
        </h2>

        <p className="text-sm font-mono text-dimwhite max-w-xl">
          Everything you need to know about team constraints, selection rules, and event logistics for Aashav 2026.
        </p>
      </div>

      {/* Accordion Container */}
      <div className="space-y-4">
        {FAQ_ITEMS.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div
              key={item.id}
              className={`rounded-sm border transition-all ${
                isOpen
                  ? "bg-card/90 border-cyan-brand/50 shadow-[0_0_20px_rgba(0,240,255,0.1)]"
                  : "bg-surface/80 border-surface-border hover:border-surface-border/80"
              }`}
            >
              <button
                onClick={() => toggleItem(item.id)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${item.id}`}
                className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none focus:ring-1 focus:ring-cyan-brand rounded-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-cyan-brand font-bold">
                    [{item.category}]
                  </span>
                  <h3 className="font-display font-bold text-base sm:text-lg text-offwhite tracking-wide">
                    {item.question}
                  </h3>
                </div>

                <div
                  className={`p-1.5 rounded-full border transition-transform duration-300 ${
                    isOpen
                      ? "bg-cyan-brand/20 border-cyan-brand text-cyan-brand rotate-180"
                      : "bg-surface border-surface-border text-dimwhite"
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`faq-answer-${item.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 sm:px-6 pb-6 pt-2 text-sm font-sans text-dimwhite leading-relaxed border-t border-surface-border/40">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
};
