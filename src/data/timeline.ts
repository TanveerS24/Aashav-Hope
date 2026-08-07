export interface TimelineEvent {
  time: string;
  title: string;
  description: string;
  badge?: string;
  isMilestone?: boolean;
}

export interface TimelinePhase {
  phaseId: string;
  phaseTitle: string;
  subtitle: string;
  dateRange: string;
  status: "upcoming" | "active" | "completed";
  events: TimelineEvent[];
}

export const TIMELINE_PHASES: TimelinePhase[] = [
  {
    phaseId: "01",
    phaseTitle: "REGISTRATION",
    subtitle: "Team Formation & Application Submission",
    dateRange: "07 AUG — 20 AUG 2026",
    status: "active",
    events: [
      {
        time: "07 AUG 2026",
        title: "Registration Opens",
        description: "Official portal opens for solo participants and 1–4 member team registrations.",
        badge: "START",
      },
      {
        time: "20 AUG 2026 — 10:00 AM",
        title: "Registration Closes",
        description: "Strict submission cutoff. No late team registrations will be accepted.",
        badge: "DEADLINE",
        isMilestone: true,
      },
    ],
  },
  {
    phaseId: "02",
    phaseTitle: "SELECTION & CONFIRMATION",
    subtitle: "Shortlisting & Slot Locking",
    dateRange: "21 AUGUST 2026",
    status: "upcoming",
    events: [
      {
        time: "20 AUG 2026 — Before 10:00 PM",
        title: "Selected Team List Announced",
        description: "Shortlisted teams notified via official channel & dashboard.",
        badge: "ANNOUNCEMENT",
      },
      {
        time: "21 AUG 2026 — Before 10:00 PM",
        title: "Selected Teams Must Confirm Participation",
        description: "Mandatory confirmation cutoff to secure hybrid hackathon slots.",
        badge: "CONFIRMATION",
        isMilestone: true,
      },
    ],
  },
  {
    phaseId: "03",
    phaseTitle: "HACKATHON DAY",
    subtitle: "22 August 2026 — SIMATS Campus & Virtual Arenas",
    dateRange: "22 AUGUST 2026",
    status: "upcoming",
    events: [
      {
        time: "08:30 AM",
        title: "Inauguration",
        badge: "Address the crowd",
        description: "Opening keynote, briefing on problem constraints, and mentor allocation.",
      },
      {
        time: "09:00 AM",
        title: "Hackathon Begins",
        description: "Countdown clock triggers. Teams start rapid prototyping & development.",
        badge: "LIVE CODE",
        isMilestone: true,
      },
      {
        time: "12:30 PM",
        title: "First Round Evaluation",
        badge: "Evaluvation",
        description: "Mid-way progress checkpoint & architectural review by industry judges.",
      },
      {
        time: "02:30 PM",
        title: "Hackathon Ends + Final Evaluation",
        description: "Repository freeze, code submission, and final jury presentation pitching.",
        badge: "CODE FREEZE",
        isMilestone: true,
      },
      {
        time: "03:00 PM",
        title: "Valedictory Ceremony + Winner Announcement",
        description: "Closing ceremony and formal honoring of the 5 winning teams.",
        badge: "CEREMONY",
        isMilestone: true,
      },
    ],
  },
];
