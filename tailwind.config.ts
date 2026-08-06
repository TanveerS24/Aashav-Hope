import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#040507",
        surface: "#090b10",
        "surface-border": "#1a1f2c",
        card: "#0d1017",
        "card-hover": "#131824",
        cyan: {
          brand: "#00f0ff",
          glow: "#00f0ff20",
          dim: "#00b8c4",
        },
        violet: {
          brand: "#8b5cf6",
          glow: "#8b5cf620",
          dim: "#6d28d9",
        },
        sunrise: {
          brand: "#ff6b35",
          glow: "#ff6b3520",
          light: "#ff8c5a",
        },
        offwhite: "#f3f4f6",
        dimwhite: "#9ca3af",
        tertiary: "#4b5563",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "sans-serif"],
        display: ["var(--font-display)", "Outfit", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(1000%)" },
        },
        beacon: {
          "0%, 100%": { opacity: "0.2" },
          "50%": { opacity: "1" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "pulse-glow": "pulseGlow 6s ease-in-out infinite",
        scanline: "scanline 8s linear infinite",
        beacon: "beacon 2s ease-in-out infinite",
        "float-slow": "floatSlow 5s ease-in-out infinite",
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
        "grid-cyan":
          "linear-gradient(to right, rgba(0, 240, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 240, 255, 0.05) 1px, transparent 1px)",
        "horizon-glow":
          "radial-gradient(ellipse 80% 50% at 50% 120%, rgba(0, 240, 255, 0.15), rgba(139, 92, 246, 0.1) 50%, rgba(255, 107, 53, 0.05) 75%, transparent 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
