export interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  timestamp: string;
  imageSrc: string;
  imageAlt: string;
  description: string;
  keyHighlights: string[];
  roleBadge: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "cheif-guest",
    title: "Chief Guest Welcome & Keynote Address",
    subtitle: "Setting the Stage for National-Grade Innovation",
    category: "INAUGURAL KEYNOTE",
    timestamp: "STAGE 01 • INAUGURAL SESSION",
    imageSrc: "/images/gallery/cheif_guest.jpg",
    imageAlt: "Chief Guest Welcome and Inaugural Address at Aashav 2026",
    description:
      "The ceremonial inauguration of Aashav 2026 commenced with the arrival and inspiring address of our distinguished Chief Guest. The keynote emphasized the vital responsibility of young engineers to build pragmatic, socially transformative solutions addressing real-world challenges in AI, healthcare, and smart systems.",
    keyHighlights: [
      "Keynote Address & Dignitary Welcome",
      "Official Inauguration Ceremony",
      "Inspiring Words on Engineering Impact",
    ],
    roleBadge: "Chief Guest",
  },
  {
    id: "event-coordinator",
    title: "Event Coordination & Master of Ceremonies",
    subtitle: "Stage Steering, Schedule Synchronization & Announcements",
    category: "EVENT OPERATIONS",
    timestamp: "STAGE 02 • PROGRAMME CONTROL",
    imageSrc: "/images/gallery/event_coordinator.jpg",
    imageAlt: "Event Coordinator Steering Hackathon Stage and Sessions",
    description:
      "The event coordination team and master of ceremonies anchoring every session transition with poise and precision. From setting stage protocols to steering hackathon timeline gates, their energy maintained the rhythm throughout the event.",
    keyHighlights: [
      "Stage Flow Management & Protocol",
      "Programme Announcements & Moderation",
      "Schedule Synchronization Across Tracks",
    ],
    roleBadge: "Event Coordinator",
  },
  {
    id: "student-coordinator",
    title: "Student Organizing Committee & Technical Leads",
    subtitle: "Participant Briefing, Operational Logistics & Ground Support",
    category: "STUDENT COUNCIL",
    timestamp: "STAGE 03 • COMMAND & LOGISTICS",
    imageSrc: "/images/gallery/student_coordinator.jpg",
    imageAlt: "Student Organizing Committee and Coordinators",
    description:
      "Student coordinators and technical leads addressing the assembly, guiding teams through presentation requirements, and ensuring seamless logistics, participant hospitality, and lab infrastructure throughout the hackathon.",
    keyHighlights: [
      "Team Briefing & Guidelines",
      "Logistics & Technical Support Crew",
      "Participant Hospitality & Operations",
    ],
    roleBadge: "Student Coordinator",
  },
  {
    id: "evaluation-by-chief-guest",
    title: "Project Evaluation & Inspection by Chief Guest",
    subtitle: "Hands-on Scrutiny of Flagship Innovations & Prototypes",
    category: "CHIEF GUEST EVALUATION",
    timestamp: "STAGE 04 • MERIT SCRUTINY",
    imageSrc: "/images/gallery/Evaluation_by_chief_guest.jpg",
    imageAlt: "Chief Guest Inspecting Student Innovations and Prototypes",
    description:
      "The Chief Guest personally reviewing student projects, inspecting working software algorithms and hardware circuits, interrogating design decisions, and offering high-level industry insights to participant teams.",
    keyHighlights: [
      "Direct Review by Chief Guest",
      "Live Software & Hardware Inspection",
      "Industry Insights & Constructive Critique",
    ],
    roleBadge: "Chief Guest Review",
  },
  {
    id: "evaluation-by-external",
    title: "Project Evaluation & Defense by External Teams",
    subtitle: "Rigorous Code Walkthroughs, Hardware Demos & Defense",
    category: "PROJECT DEFENSE",
    timestamp: "STAGE 05 • TECHNICAL PRESENTATIONS",
    imageSrc: "/images/gallery/evaluation_by_external_student.jpg",
    imageAlt: "Student Team Demonstrating Hardware and Software Solution",
    description:
      "Competing teams defending their algorithms, hardware rigs, and AI models before the evaluation panel, providing live demonstrations under strict 5-minute timed intervals and answering in-depth technical questions.",
    keyHighlights: [
      "Live Working Demonstrations",
      "5-Minute Timed Pitch & Code Defense",
      "Technical Interrogation & Feedback",
    ],
    roleBadge: "External Evaluation",
  },
  {
    id: "external-evaluators",
    title: "Felicitation & Certificate Distribution by External Evaluators",
    subtitle: "Industry Jury Honoring Participant Accomplishments",
    category: "JURY FELICITATION",
    timestamp: "STAGE 06 • EVALUATOR CEREMONY",
    imageSrc: "/images/gallery/external_evaluators.jpg",
    imageAlt: "External Evaluators Presenting Certificates to Teams",
    description:
      "Distinguished external evaluators and jury members presenting certificates of excellence and participation to student teams, commending their tireless engineering efforts, creativity, and presentation caliber.",
    keyHighlights: [
      "Certificate Distribution by Industry Jury",
      "Recognition of High-Caliber Solutions",
      "Words of Encouragement & Professional Mentorship",
    ],
    roleBadge: "External Evaluators",
  },
  {
    id: "coordinator",
    title: "Faculty Coordinators Certificate & Medal Distribution",
    subtitle: "Department Leadership Recognizing Dedicated Teams",
    category: "FACULTY FELICITATION",
    timestamp: "STAGE 07 • COORDINATOR RECOGNITION",
    imageSrc: "/images/gallery/coordinator.jpg",
    imageAlt: "Faculty Coordinators Awarding Medals and Certificates to Students",
    description:
      "Department of Machine Learning faculty coordinators and institutional leadership awarding medals and certificates to participants, honoring their dedication throughout the 24-hour hackathon marathon.",
    keyHighlights: [
      "Medal & Certificate Awards by Faculty",
      "SIMATS Department of Machine Learning",
      "Celebrating Participant Achievement",
    ],
    roleBadge: "Faculty Coordinator",
  },
  {
    id: "winners",
    title: "Grand Valedictory Ceremony & Champions Felicitation",
    subtitle: "Awarding Championship Trophies, Cash Prizes & Grand Honors",
    category: "VALEDICTORY & AWARDS",
    timestamp: "STAGE 08 • CHAMPIONS FINALE",
    imageSrc: "/images/gallery/Winners.jpg",
    imageAlt: "Winning Teams Receiving Awards and Trophies at Aashav 2026",
    description:
      "The grand culmination of Aashav 2026: top-performing teams felicitated with prestigious championship trophies, gold and silver medallions, cash awards, and certificates of merit in front of peers, faculty, and dignitaries.",
    keyHighlights: [
      "National-Grade Championship Trophies",
      "Cash Prize & Medal Distribution",
      "Standing Ovation for All Finalist Teams",
    ],
    roleBadge: "Prize Winners",
  },
];
