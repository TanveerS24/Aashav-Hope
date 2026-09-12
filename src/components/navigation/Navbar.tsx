"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { EVENT_CONFIG } from "@/config/event";
import {
  Menu,
  X,
  ChevronDown,
  Camera,
  Clock,
  Sliders,
  Tv,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { label: "HOME", href: "#home" },
  { label: "PROBLEMS", href: "#problems" },
  { label: "TIMELINE", href: "#timeline" },
  { label: "GUESTS", href: "#evaluators" },
  { label: "AWARDS", href: "#winners" },
  { label: "CONTACT", href: "#contact" },
  { label: "FAQ", href: "#faq" },
];

export interface FeatureRoute {
  label: string;
  href: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

export const FEATURE_ROUTES: FeatureRoute[] = [
  {
    label: "Event Gallery",
    href: "/gallery",
    description: "Milestones, photos & event retrospective",
    icon: Camera,
  },
  {
    label: "Presentation Timer",
    href: "/timer",
    description: "5-minute team idea pitch countdown",
    icon: Clock,
  },
  {
    label: "Control Panel",
    href: "/control",
    description: "Timer synchronization & remote control",
    icon: Sliders,
  },
  {
    label: "Live Stage Display",
    href: "/live",
    description: "Full-screen projector broadcast timer",
    icon: Tv,
  },
];

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [linksMenuOpen, setLinksMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isSubRoute = pathname !== "/";
  const isAnyFeatureRouteActive = FEATURE_ROUTES.some(
    (route) => pathname === route.href
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      if (pathname === "/") {
        // Section highlight scrollspy on home page
        const sections = NAV_ITEMS.map((item) => item.href.replace("#", ""));

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
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Click outside to close Links dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setLinksMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getNavHref = (hashHref: string) => {
    if (!hashHref.startsWith("#")) return hashHref;
    if (pathname === "/") return hashHref;
    return `/${hashHref}`;
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#0d1017]/90 backdrop-blur-2xl border-b border-white/20 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            : "bg-[#0d1017]/70 backdrop-blur-xl border-b border-white/10 py-3.5 shadow-md"
        }`}
      >
        <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Identity */}
          <Link
            href={isSubRoute ? "/" : "#home"}
            className="group flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-cyan-brand rounded-sm p-1"
          >
            <Image
              src="/images/logo.png"
              alt="AASHAV Logo"
              width={48}
              height={48}
              className="h-10 sm:h-11 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-display font-black tracking-wider text-base sm:text-lg text-offwhite group-hover:text-cyan-brand transition-colors">
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
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden md:flex items-center gap-1 bg-white/5 backdrop-blur-xl px-3 py-1.5 rounded-full border border-white/15 shadow-lg"
            aria-label="Main Navigation"
          >
            {NAV_ITEMS.map((item) => {
              const sectionId = item.href.replace("#", "");
              const isActive = !isSubRoute && activeSection === sectionId;
              return (
                <a
                  key={item.label}
                  href={getNavHref(item.href)}
                  className={`relative px-3.5 py-1.5 text-xs font-mono tracking-wider transition-colors rounded-full ${
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

            {/* LINKS Dropdown (After FAQ) */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={() => setLinksMenuOpen(true)}
              onMouseLeave={() => setLinksMenuOpen(false)}
            >
              <button
                type="button"
                onClick={() => setLinksMenuOpen((prev) => !prev)}
                className={`relative px-3.5 py-1.5 text-xs font-mono tracking-wider transition-all rounded-full flex items-center gap-1.5 ${
                  isAnyFeatureRouteActive || linksMenuOpen
                    ? "text-cyan-brand font-bold bg-cyan-brand/15 border border-cyan-brand/40 shadow-[0_0_15px_rgba(0,240,255,0.2)]"
                    : "text-dimwhite hover:text-offwhite hover:bg-white/5"
                }`}
                aria-expanded={linksMenuOpen}
                aria-label="Event Apps and Links Menu"
              >
                <span className="relative z-10">LINKS</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    linksMenuOpen ? "rotate-180 text-cyan-brand" : "text-tertiary"
                  }`}
                />
              </button>

              {/* Dropdown Menu Box */}
              <AnimatePresence>
                {linksMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 mt-2 w-80 sm:w-[350px] p-2.5 rounded-xl bg-[#0d1017]/95 backdrop-blur-2xl border border-white/20 shadow-2xl z-50 flex flex-col gap-1.5"
                  >
                    <div className="px-3 py-1.5 text-[10px] font-mono tracking-widest text-cyan-brand uppercase border-b border-surface-border/60 flex items-center justify-between">
                      <span>{"// EVENT APPS & ROUTES"}</span>
                      <span className="text-[9px] text-tertiary font-semibold">
                        4 ROUTES
                      </span>
                    </div>
                    {FEATURE_ROUTES.map((route) => {
                      const Icon = route.icon;
                      const isActive = pathname === route.href;
                      return (
                        <Link
                          key={route.href}
                          href={route.href}
                          onClick={() => setLinksMenuOpen(false)}
                          className={`p-2.5 rounded-lg flex items-start gap-3 transition-colors ${
                            isActive
                              ? "bg-cyan-brand/15 border border-cyan-brand/40 text-offwhite"
                              : "hover:bg-white/5 text-dimwhite hover:text-offwhite border border-transparent"
                          }`}
                        >
                          <div
                            className={`p-2 rounded-md shrink-0 mt-0.5 ${
                              isActive
                                ? "bg-cyan-brand text-black"
                                : "bg-surface text-cyan-brand border border-surface-border"
                            }`}
                          >
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-mono text-xs font-bold text-offwhite">
                              {route.label}
                            </div>
                            <p className="text-[11px] font-mono text-tertiary leading-normal mt-0.5 whitespace-normal">
                              {route.description}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Right Action CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/gallery"
              className="relative inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-surface/90 hover:bg-surface border border-cyan-brand/40 text-cyan-brand hover:text-white font-mono font-bold text-[11px] tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(0,240,255,0.15)] hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]"
            >
              <Camera className="w-3.5 h-3.5 text-cyan-brand" />
              <span>GALLERY</span>
            </Link>

            <button
              disabled
              className="relative inline-flex items-center gap-2 px-3.5 py-2 rounded-sm bg-surface/90 border border-rose-500/40 text-rose-300/90 font-mono font-bold text-[11px] tracking-wider uppercase cursor-not-allowed opacity-90 select-none shadow-[0_0_15px_rgba(244,63,94,0.15)]"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              <span>EVENT CONCLUDED</span>
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
            className="fixed inset-x-0 top-[60px] z-30 bg-[#0d1017]/95 backdrop-blur-2xl border-b border-white/20 p-6 md:hidden shadow-2xl max-h-[calc(100vh-60px)] overflow-y-auto"
          >
            <div className="flex flex-col gap-3">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={getNavHref(item.href)}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-mono tracking-widest text-dimwhite hover:text-cyan-brand py-2 border-b border-surface-border/40 flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <span className="text-xs text-tertiary">➔</span>
                </a>
              ))}

              {/* Mobile LINKS Section (After FAQ) */}
              <div className="pt-3 pb-2 border-t border-surface-border/60">
                <div className="text-[10px] font-mono tracking-widest text-cyan-brand uppercase mb-3 flex items-center justify-between">
                  <span>{"// EVENT APPS & ROUTES (LINKS)"}</span>
                  <span className="text-[9px] text-tertiary font-semibold">
                    4 ROUTES
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {FEATURE_ROUTES.map((route) => {
                    const Icon = route.icon;
                    const isActive = pathname === route.href;
                    return (
                      <Link
                        key={route.href}
                        href={route.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`p-3 rounded-lg flex items-center justify-between gap-3 border transition-all ${
                          isActive
                            ? "bg-cyan-brand/15 border-cyan-brand/50 text-offwhite"
                            : "bg-surface/60 border-surface-border text-dimwhite"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className="w-4 h-4 text-cyan-brand" />
                          <div className="font-mono text-xs font-bold text-offwhite">
                            {route.label}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="pt-3 flex flex-col gap-3">
                <button
                  disabled
                  className="w-full py-3 rounded-sm bg-surface/90 border border-rose-500/40 text-rose-300 font-mono font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2 cursor-not-allowed opacity-90 select-none shadow-lg"
                >
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                  <span>EVENT CONCLUDED</span>
                </button>
                <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-dimwhite pt-1">
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
