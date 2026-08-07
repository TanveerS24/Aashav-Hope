export interface CoordinatorConfig {
  name: string;
  role: string;
  email: string;
  phone: string;
  linkedin?: string;
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
  departmentName: string;
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
  coordinators: CoordinatorConfig[];
  sihContext: string;
}

export const EVENT_CONFIG: EventConfig = {
  eventName: "AASHAV",
  eventMeaning: "THE HOPE",
  tagline: "Build what tomorrow needs.",
  subTagline: "The premier national-grade inter-college hybrid hackathon at SIMATS School of Engineering.",
  eventDateDisplay: "22 AUGUST 2026",
  countdownTargetISO: "2026-08-22T09:00:00+05:30", // 22 Aug 2026 09:00 AM IST
  timezone: "Asia/Kolkata",
  venueName: "SIMATS School of Engineering",
  departmentName: "Department of Machine Learning",
  venueFullAddress: "Saveetha Institute of Medical and Technical Sciences, Chennai, Tamil Nadu",

  // Easily customizable URLs for organizers
  mapsUrl: "https://maps.app.goo.gl/QmMUXEKTgQoCsd8b7",
  registrationUrl: "https://forms.gle/4UXKeKC453wy29bn8",

  mode: "HYBRID (ONLINE + OFFLINE)",
  teamSizeDisplay: "1–4 MEMBERS",
  minTeamSize: 1,
  maxTeamSize: 4,
  winnerCount: 5,

  registrationOpenDate: "07 August 2026",
  registrationCloseDate: "20 August 2026 at 2:00 PM",
  selectionAnnounceDate: "21 August 2026 before 10:00 AM",
  selectionConfirmDeadline: "21 August 2026 before 10:00 PM",

  coordinator: {
    name: "S Tanveer Muhammed",
    role: "Head Coordinator",
    email: "stanveer1809@gmail.com",
    phone: "+91 8610534505",
  },

  coordinators: [
    {
      name: "S Tanveer Muhammed",
      role: "Head Coordinator",
      email: "stanveer1809@gmail.com",
      phone: "+91 8610534505",
    },
    {
      name: "Dr Mahaboob Basha",
      role: "Faculty Coordinator",
      email: "mahaboobbashas.sse@saveetha.com",
      phone: "+91 98419 51420",
    },
  ],

  sihContext:
    "Aashav brings real-world high-impact problem statements to students. Test your technical execution, problem breakdown, and presentation rigor on national-grade engineering challenges.",
};
