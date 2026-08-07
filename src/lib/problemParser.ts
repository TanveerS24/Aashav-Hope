import fs from "fs";
import path from "path";
import { ProblemStatement, CategorizedProblems } from "@/types";

export const FALLBACK_SOFTWARE_PROBLEMS: ProblemStatement[] = [
  {
    id: "SW-01",
    title: "SMART TOURIST SAFETY MONITORING & INCIDENT RESPONSE SYSTEM USING AI AND GEO-FENCING",
    domain: "Smart Cities & Public Safety",
    category: "Software",
    track: "software",
    description:
      "Develop an AI-powered tourist safety platform integrating real-time geo-fencing, emergency incident detection, live location sharing, and automated alert mechanisms to enhance traveler safety and enable rapid emergency response.",
  },
  {
    id: "SW-02",
    title: "AI-POWERED PRECISE TRAIN TRAFFIC CONTROL SYSTEM",
    domain: "Transportation & Intelligent Mobility",
    category: "Software",
    track: "software",
    description:
      "Design an AI-driven railway traffic management system utilizing predictive scheduling, real-time train tracking, conflict detection, and route optimization algorithms to maximize section throughput while improving operational safety and efficiency.",
  },
  {
    id: "SW-03",
    title: "SUPPLY CHAIN TRANSPARENCY FOR AGRICULTURAL PRODUCE",
    domain: "Agriculture & Supply Chain Management",
    category: "Software",
    track: "software",
    description:
      "Build a digital agricultural supply chain platform incorporating blockchain-based traceability, real-time logistics tracking, quality verification, and stakeholder transparency to ensure authenticity and improve farm-to-market visibility.",
  },
  {
    id: "SW-04",
    title: "DIGITAL HERITAGE PRESERVATION AND TOURISM PLATFORM",
    domain: "Tourism, Culture & Smart Cities",
    category: "Software",
    track: "software",
    description:
      "Develop an interactive digital platform that showcases heritage sites through virtual tours, 3D visualization, geolocation services, and historical content to promote tourism while preserving cultural heritage.",
  },
  {
    id: "SW-05",
    title: "AI-POWERED MOBILE PLATFORM FOR SPORTS TALENT ASSESSMENT",
    domain: "Sports Technology & Artificial Intelligence",
    category: "Software",
    track: "software",
    description:
      "Engineer a mobile application leveraging AI-based video analysis, performance metrics, motion tracking, and skill evaluation to provide accessible and unbiased sports talent identification and athlete development.",
  },
  {
    id: "SW-06",
    title: "REAL-TIME HOSPITAL BED AND ICU AVAILABILITY SYSTEM",
    domain: "Healthcare & Digital Health",
    category: "Software",
    track: "software",
    description:
      "Develop a centralized healthcare management platform that aggregates real-time hospital bed, ICU, ventilator, and emergency resource availability, enabling faster patient referrals and optimized healthcare coordination.",
  },
  {
    id: "SW-07",
    title: "SMART MEDICINE REMINDER AND ADHERENCE TRACKER",
    domain: "Healthcare & Patient Care",
    category: "Software",
    track: "software",
    description:
      "Build an intelligent medication management application featuring personalized reminders, adherence tracking, dosage history, caregiver notifications, and AI-driven insights to improve patient compliance and treatment outcomes.",
  },
  {
    id: "SW-08",
    title: "DISASTER PREPAREDNESS AND RESPONSE SYSTEM",
    domain: "Disaster Management & Emergency Response",
    category: "Software",
    track: "software",
    description:
      "Develop an intelligent disaster preparedness and response platform integrating real-time hazard monitoring, AI-based risk prediction, evacuation planning, resource coordination, and emergency communication to enhance public safety and enable rapid disaster response.",
  },
];

export const FALLBACK_HARDWARE_PROBLEMS: ProblemStatement[] = [
  {
    id: "HW-01",
    title: "ECHOLOCATE — INDOOR NAVIGATION FOR THE VISUALLY IMPAIRED USING ULTRASONIC MESH",
    domain: "Assistive Technology",
    category: "Hardware + Software",
    track: "hardware",
    description:
      "Develop a wearable indoor navigation system integrating ultrasonic ranging sensors, inertial motion tracking, and haptic feedback actuators to assist visually impaired users in safely navigating complex indoor environments without GPS or beacon-based infrastructure.",
  },
  {
    id: "HW-02",
    title: "SMART HELMET FOR MINE WORKER SAFETY MONITORING",
    domain: "Industrial Safety & Wearables",
    category: "Hardware",
    track: "hardware",
    description:
      "Engineer a rugged smart safety helmet featuring multi-gas sensors, temperature monitoring, impact detection, and wireless telemetry to continuously monitor underground mine conditions and instantly alert control centers during hazardous incidents.",
  },
  {
    id: "HW-03",
    title: "AUTONOMOUS RAILWAY TRACK CRACK DETECTION ROBOT",
    domain: "Transportation & Robotics",
    category: "Hardware",
    track: "hardware",
    description:
      "Construct an autonomous rail-mounted inspection robot equipped with ultrasonic flaw detection, vibration sensing, computer vision cameras, and GPS-enabled reporting to identify railway track cracks, misalignments, and structural defects for predictive maintenance.",
  },
  {
    id: "HW-04",
    title: "STRUCTURAL HEALTH MONITORING SYSTEM FOR BRIDGES",
    domain: "Civil Infrastructure & IoT",
    category: "Hardware",
    track: "hardware",
    description:
      "Design a distributed structural health monitoring network incorporating strain gauges, vibration sensors, and wireless IoT communication to continuously assess bridge integrity and provide early warnings of structural stress, fatigue, and potential failure.",
  },
  {
    id: "HW-05",
    title: "AUTOMATED HYDROPONIC NUTRIENT DOSING SYSTEM",
    domain: "Agriculture & Automation",
    category: "Hardware",
    track: "hardware",
    description:
      "Develop an automated hydroponic nutrient management system integrating pH, electrical conductivity (EC), and water-level sensors with precision dosing pumps to maintain optimal nutrient balance and maximize crop growth without manual intervention.",
  },
  {
    id: "HW-06",
    title: "EARTHQUAKE STABILIZED SYSTEM",
    domain: "Disaster Management & Structural Safety",
    category: "Hardware",
    track: "hardware",
    description:
      "Build an active earthquake stabilization platform utilizing multi-axis accelerometers, gyroscopes, and real-time motion control actuators to minimize structural vibrations and improve stability during seismic disturbances.",
  },
  {
    id: "HW-07",
    title: "DETECTION AND PREVENTION OF TAMPERING IN WEIGHING AND MEASURING INSTRUMENTS",
    domain: "Industrial Automation & Legal Metrology",
    category: "Hardware",
    track: "hardware",
    description:
      "Engineer an intelligent tamper detection system for weighing and measuring instruments using load-cell anomaly analysis, enclosure tamper sensors, secure data logging, and wireless alerts to prevent unauthorized calibration and measurement fraud.",
  },
  {
    id: "HW-08",
    title: "INTELLIGENT PESTICIDE SPRINKLING SYSTEM",
    domain: "Agriculture, FoodTech & Rural Development",
    category: "Hardware",
    track: "hardware",
    description:
      "Develop a low-cost intelligent pesticide sprinkling system integrating computer vision, HSV color thresholding, and precision spray actuators to detect plant leaf infection severity and automatically apply proportional pesticide dosage while minimizing chemical overuse without requiring machine learning models.",
  },
];

function parseProblemJson(filePath: string, track: "software" | "hardware"): ProblemStatement[] {
  try {
    if (!fs.existsSync(filePath)) return [];

    const rawContent = fs.readFileSync(filePath, "utf-8");
    const jsonList = JSON.parse(rawContent);

    if (!Array.isArray(jsonList)) return [];

    return jsonList.map((item: any, idx: number) => {
      const numericId = item.id || idx + 1;
      const formattedId = track === "software"
        ? `SW-${String(numericId).padStart(2, "0")}`
        : `HW-${String(numericId).padStart(2, "0")}`;

      return {
        id: formattedId,
        title: (item.title || "UNTITLED PROBLEM STATEMENT").toUpperCase(),
        domain: item.domain || "General Engineering",
        category: item.category || (track === "software" ? "Software" : "Hardware"),
        description: item.description || "",
        track,
      };
    });
  } catch (err) {
    console.error(`Error reading JSON ${filePath}:`, err);
    return [];
  }
}

export function getCategorizedProblemStatements(): CategorizedProblems {
  const baseDir = process.cwd();
  
  // JSON Paths in data/problems/
  const swJsonPath = path.join(baseDir, "data", "problems", "sw-statements.json");
  const hwJsonPath = path.join(baseDir, "data", "problems", "hw-statements.json");

  let software = parseProblemJson(swJsonPath, "software");
  let hardware = parseProblemJson(hwJsonPath, "hardware");

  return {
    software: software.length > 0 ? software : FALLBACK_SOFTWARE_PROBLEMS,
    hardware: hardware.length > 0 ? hardware : FALLBACK_HARDWARE_PROBLEMS,
  };
}

// For backwards compatibility
export function getProblemStatements(): ProblemStatement[] {
  const cat = getCategorizedProblemStatements();
  return [...cat.software, ...cat.hardware];
}
