"use client";

import React, { useState, useEffect } from "react";
import { EVENT_CONFIG } from "@/config/event";
import { Menu, X, ArrowUpRight, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { label: "HOME", href: "#home" },
  { label: "PROBLEMS", href: "#problems" },
  { label: "TIMELINE", href: "#timeline" },
  { label: "FAQ", href: "#faq" },
  { label: "CONTACT", href: "#contact" },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Section highlight scrollspy
      const sections = NAV_ITEMS.map((item) =>
        item.href.replace("#", "")
      );

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleRegisterClick = () => {
    if (EVENT_CONFIG.registrationUrl.includes("PLACEHOLDER")) {
      alert(
        "Registration URL is configured as a placeholder. Replace 'registrationUrl' in src/config/event.ts with your active form URL."
      );
    } else {
      window.open(EVENT_CONFIG.registrationUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-surface-border/60 py-3 shadow-2xl"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Identity */}
          <a
            href="#home"
            className="group flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-cyan-brand rounded-sm p-1"
          >
            <div className="h-8 w-8 rounded-sm bg-gradient-to-tr from-cyan-brand via-violet-brand to-sunrise-brand p-[1px] flex items-center justify-center">
              <div className="h-full w-full bg-background rounded-sm flex items-center justify-center group-hover:bg-cyan-brand/10 transition-colors">
                <span className="font-display font-black text-xs text-cyan-brand tracking-tighter">
                  A
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-display font-black tracking-wider text-lg text-offwhite group-hover:text-cyan-brand transition-colors">
                  {EVENT_CONFIG.eventName}
                </span>
                <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-cyan-brand/10 text-cyan-brand border border-cyan-brand/30">
                  {EVENT_CONFIG.eventMeaning}
                </span>
              </div>
              <span className="text-[9px] font-mono text-dimwhite tracking-widest uppercase">
                SIMATS 2026
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden md:flex items-center gap-1 bg-surface/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-surface-border/50"
            aria-label="Main Navigation"
          >
            {NAV_ITEMS.map((item) => {
              const sectionId = item.href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`relative px-4 py-1.5 text-xs font-mono tracking-wider transition-colors rounded-full ${
                    isActive
                      ? "text-offwhite font-bold"
                      : "text-dimwhite hover:text-offwhite"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavTab"
                      className="absolute inset-0 bg-cyan-brand/15 border border-cyan-brand/40 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Right Action CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={handleRegisterClick}
              className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-gradient-to-r from-cyan-brand via-cyan-dim to-violet-brand text-background font-mono font-bold text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(0,240,255,0.25)] hover:shadow-[0_0_30px_rgba(0,240,255,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>REGISTER NOW</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-offwhite hover:text-cyan-brand focus:outline-none focus:ring-2 focus:ring-cyan-brand rounded-sm"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-cyan-brand" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[60px] z-30 bg-background/95 backdrop-blur-2xl border-b border-surface-border p-6 md:hidden shadow-2xl"
          >
            <div className="flex flex-col gap-4">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-mono tracking-widest text-dimwhite hover:text-cyan-brand py-2 border-b border-surface-border/40 flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <span className="text-xs text-tertiary">➔</span>
                </a>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleRegisterClick();
                  }}
                  className="w-full py-3 rounded.sm bg-gradient-to-r from-cyan-brand to-violet-brand text-background font-mono font-bold text-sm tracking-widest uppercase flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>REGISTER NOW</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
                <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-dimwhite pt-2">
                  <span>HYBRID EVENT</span>
                  <span>•</span>
                  <span>SIMATS SCHOOL OF ENG</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
