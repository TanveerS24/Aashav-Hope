"use client";

import React from "react";

interface DigitalSegmentProps {
  value: string;
  label: string;
  isPlaceholder?: boolean;
  theme?: "light" | "dark";
  size?: "hero" | "medium" | "compact";
}

export const DigitalSegment: React.FC<DigitalSegmentProps> = ({
  value,
  label,
  isPlaceholder = false,
  theme = "light",
  size = "hero",
}) => {
  const isLight = theme === "light";

  // Responsive font sizes optimized for projector readability
  const sizeClasses = {
    hero: "text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10.5rem] 2xl:text-[12rem] px-3 sm:px-6 py-2 sm:py-4",
    medium: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl px-3 sm:px-4 py-2",
    compact: "text-2xl sm:text-3xl md:text-4xl px-2 py-1",
  }[size];

  const labelSizeClasses = {
    hero: "text-xs sm:text-sm md:text-base lg:text-lg tracking-[0.25em] font-semibold mt-2 sm:mt-4",
    medium: "text-xs sm:text-sm tracking-[0.2em] font-medium mt-1.5",
    compact: "text-[10px] sm:text-xs tracking-widest mt-1",
  }[size];

  const boxBg = isLight
    ? "bg-slate-50/80 border border-slate-200/90 shadow-sm shadow-sky-950/5 text-slate-900"
    : "bg-slate-900/90 border border-slate-800 shadow-inner text-white";

  const numColor = isLight
    ? isPlaceholder
      ? "text-sky-700/40"
      : "text-slate-900"
    : isPlaceholder
    ? "text-cyan-brand/30"
    : "text-cyan-brand";

  const labelColor = isLight ? "text-sky-900/70" : "text-slate-400";

  return (
    <div className="flex flex-col items-center select-none">
      {/* Number Card */}
      <div
        className={`relative rounded-xl md:rounded-2xl flex items-center justify-center font-mono font-bold tracking-tight leading-none ${sizeClasses} ${boxBg}`}
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        {/* Subtle top corner accents for academic/engineering aesthetic */}
        <span
          className={`absolute top-1.5 left-1.5 w-2 h-2 border-t-2 border-l-2 rounded-tl-sm ${
            isLight ? "border-sky-500/40" : "border-cyan-brand/40"
          }`}
        />
        <span
          className={`absolute top-1.5 right-1.5 w-2 h-2 border-t-2 border-r-2 rounded-tr-sm ${
            isLight ? "border-sky-500/40" : "border-cyan-brand/40"
          }`}
        />
        <span
          className={`absolute bottom-1.5 left-1.5 w-2 h-2 border-b-2 border-l-2 rounded-bl-sm ${
            isLight ? "border-sky-500/40" : "border-cyan-brand/40"
          }`}
        />
        <span
          className={`absolute bottom-1.5 right-1.5 w-2 h-2 border-b-2 border-r-2 rounded-br-sm ${
            isLight ? "border-sky-500/40" : "border-cyan-brand/40"
          }`}
        />

        <span className={`${numColor} drop-shadow-sm transition-all duration-150`}>
          {value}
        </span>
      </div>

      {/* Unit Label */}
      <span className={`uppercase font-sans ${labelSizeClasses} ${labelColor}`}>
        {label}
      </span>
    </div>
  );
};

export const ColonSeparator: React.FC<{
  theme?: "light" | "dark";
  size?: "hero" | "medium" | "compact";
}> = ({ theme = "light", size = "hero" }) => {
  const isLight = theme === "light";

  const sizeClasses = {
    hero: "text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[10rem] pb-8 sm:pb-12 md:pb-16",
    medium: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl pb-4 sm:pb-6",
    compact: "text-xl sm:text-2xl md:text-3xl pb-2",
  }[size];

  const color = isLight ? "text-sky-600/70" : "text-cyan-brand/60";

  return (
    <div
      className={`font-mono font-bold leading-none select-none flex items-center justify-center px-1 sm:px-2 md:px-3 ${sizeClasses} ${color}`}
      aria-hidden="true"
    >
      :
    </div>
  );
};
