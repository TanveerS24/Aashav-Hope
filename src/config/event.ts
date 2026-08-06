export interface CoordinatorConfig {
  name: string;
  role: string;
  email: string;
  phone: string;
  linkedin: string;
}

export interface EventConfig {
  eventName: string;
  eventMeaning: string;
  tagline: string;
  subTagline: string;
  eventDateDisplay: string;
  countdownTargetISO: string; // ISO string for timer calculations
  timezone: string;
  venueName: string;
  venueFullAddress: string;
  mapsUrl: string;
  registrationUrl: string;
  mode: string;
  teamSizeDisplay: string;
  minTeamSize: number;
  maxTeamSize: number;
  winnerCount: number;
  registrationOpenDate: string;
  registrationCloseDate: string;
  selectionAnnounceDate: string;
  selectionConfirmDeadline: string;
  coordinator: CoordinatorConfig;
  sihContext: string;
}

export const EVENT_CONFIG: EventConfig = {
  eventName: "AASHAV",
  eventMeaning: "HOPE",
  tagline: "Build what tomorrow needs.",
  subTagline: "The definitive SIH 2026 warm-up hackathon at SIMATS School of Engineering.",
  eventDateDisplay: "22 AUGUST 2026",
  countdownTargetISO: "2026-08-22T09:00:00+05:30", // 22 Aug 2026 09:00 AM IST
  timezone: "Asia/Kolkata",
  venueName: "SIMATS School of Engineering",
  venueFullAddress: "Saveetha Institute of Medical and Technical Sciences, Chennai, Tamil Nadu",
  
  // Easily customizable URLs for organizers
  mapsUrl: "PLACEHOLDER_GOOGLE_MAPS_URL",
  registrationUrl: "https://forms.gle/4UXKeKC453wy29bn8",
  
  mode: "HYBRID (ONLINE + OFFLINE)",
  teamSizeDisplay: "3–4 MEMBERS",
  minTeamSize: 3,
  maxTeamSize: 4,
  winnerCount: 5,

  registrationOpenDate: "07 August 2026",
  registrationCloseDate: "20 August 2026 at 2:00 PM",
  selectionAnnounceDate: "21 August 2026 before 10:00 AM",
  selectionConfirmDeadline: "21 August 2026 before 10:00 PM",

  coordinator: {
    name: "YOUR_NAME",
    role: "Head Coordinator",
    email: "YOUR_EMAIL",
    phone: "YOUR_PHONE",
    linkedin: "YOUR_LINKEDIN",
  },

  sihContext:
    "Aashav brings real previous-year Smart India Hackathon problem statements to students. Test your technical execution, problem breakdown, and presentation rigor before SIH 2026.",
};
