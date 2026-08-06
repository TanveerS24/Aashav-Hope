import fs from "fs";
import path from "path";
import { ProblemStatement } from "@/types";

export const FALLBACK_PROBLEMS: ProblemStatement[] = [
  {
    id: "01",
    title: "AI-POWERED PUBLIC SERVICE ASSISTANT",
    domain: "AI & Public Services",
    source: "SIH Previous Year",
    complexity: "Advanced",
    category: "Software",
    description:
      "Develop a multi-lingual, voice-enabled AI assistant for rural citizens to navigate government welfare schemes, check eligibility, and generate verified application documents offline or with low connectivity.",
  },
  {
    id: "02",
    title: "SMART URBAN WATER MONITORING & LEAK DETECTOR",
    domain: "IoT & Smart Cities",
    source: "SIH Previous Year",
    complexity: "Medium",
    category: "Hardware / Software",
    description:
      "Design an IoT sensor network integrated with spatial graph analytics to detect non-revenue water loss, pipe corrosion, and pressure anomalies across municipal distribution grids in real time.",
  },
  {
    id: "03",
    title: "INTELLIGENT SOLID WASTE MANAGEMENT & ROUTE OPTIMIZATION",
    domain: "Sustainability & Clean Tech",
    source: "SIH Previous Year",
    complexity: "Advanced",
    category: "Software / Analytics",
    description:
      "Construct a dynamic waste bin fill-level analytics engine with dynamic vehicle routing algorithms to minimize fuel consumption and prevent overflow in high-density urban zones.",
  },
  {
    id: "04",
    title: "ACCESSIBLE DIGITAL EDUCATION PLATFORM FOR DIFFERENLY ABLED",
    domain: "EdTech & Accessibility",
    source: "SIH Previous Year",
    complexity: "High",
    category: "Software / Web Accessibility",
    description:
      "Build an adaptive learning interface complying with WCAG 2.1 AAA guidelines, supporting real-time sign language translation, haptic feedback integration, and eye-gaze control for disabled learners.",
  },
  {
    id: "05",
    title: "SMART AGRICULTURE DECISION SUPPORT SYSTEM",
    domain: "AgriTech & Climate Risk",
    source: "SIH Previous Year",
    complexity: "Advanced",
    category: "AI / GIS",
    description:
      "Engineered precision farming platform pairing satellite imagery with hyper-local microclimate sensors to deliver AI crop advisory, pest outbreak forecasting, and direct market price intelligence.",
  },
  {
    id: "06",
    title: "DISASTER RESPONSE COORDINATION & MESH COMMUNICATION",
    domain: "Disaster Management",
    source: "SIH Previous Year",
    complexity: "High",
    category: "Networking / Mobile",
    description:
      "Create a zero-infrastructure peer-to-peer mesh networking mobile platform for search-and-rescue teams during floods and earthquakes to broadcast SOS distress signals without cellular service.",
  },
  {
    id: "07",
    title: "PUBLIC TRANSPORT FLEET & PASSENGER LOAD OPTIMIZATION",
    domain: "Mobility & Smart Transport",
    source: "SIH Previous Year",
    complexity: "Medium",
    category: "Software / Data Science",
    description:
      "Deploy a real-time computer vision system on city buses to calculate passenger density, dynamic arrival estimations, and automated route adjustments during peak transit traffic hours.",
  },
  {
    id: "08",
    title: "OPEN INNOVATION — REAL WORLD INDUSTRY CHALLENGE",
    domain: "Cross-Disciplinary Innovation",
    source: "SIH Previous Year",
    complexity: "Open",
    category: "Hardware / Software",
    description:
      "Propose and build a breakthrough technical solution addressing a critical unserved bottleneck in healthcare, renewable energy, cybersecurity, or logistics following SIH industry standards.",
  },
];

export function getProblemStatements(): ProblemStatement[] {
  try {
    const filePath = path.join(process.cwd(), "data", "problem-statements.txt");
    if (!fs.existsSync(filePath)) {
      return FALLBACK_PROBLEMS;
    }

    const rawContent = fs.readFileSync(filePath, "utf-8");
    const blocks = rawContent.split("---").filter((b) => b.trim().length > 0);

    const parsed: ProblemStatement[] = [];

    for (let i = 0; i < blocks.length; i += 2) {
      const metadataChunk = blocks[i];
      const descriptionChunk = blocks[i + 1];

      if (!metadataChunk || !descriptionChunk) continue;

      const metaLines = metadataChunk.trim().split("\n");
      const meta: Record<string, string> = {};

      for (const line of metaLines) {
        const colonIdx = line.indexOf(":");
        if (colonIdx !== -1) {
          const key = line.slice(0, colonIdx).trim().toLowerCase();
          const val = line.slice(colonIdx + 1).trim();
          meta[key] = val;
        }
      }

      parsed.push({
        id: meta["id"] || `0${parsed.length + 1}`,
        title: meta["title"] || "UNTITLED PROBLEM STATEMENT",
        domain: meta["domain"] || "General Engineering",
        source: meta["source"] || "SIH Previous Year",
        complexity: meta["complexity"] || "Standard",
        category: meta["category"] || "Software",
        description: descriptionChunk.trim(),
      });
    }

    return parsed.length > 0 ? parsed : FALLBACK_PROBLEMS;
  } catch (error) {
    console.error("Error reading problem-statements.txt:", error);
    return FALLBACK_PROBLEMS;
  }
}
