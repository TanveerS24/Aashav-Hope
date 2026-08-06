export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "General" | "Participation" | "Schedule" | "Rules";
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: "faq-1",
    question: "Who can participate in Aashav?",
    answer:
      "Aashav is open to passionate engineering, technology, and design students who want to experience real-world SIH problem solving under timed constraints.",
    category: "General",
  },
  {
    id: "faq-2",
    question: "How many people can be in a team?",
    answer:
      "Teams must consist of exactly 3 to 4 participants. Cross-disciplinary collaboration within teams is highly encouraged.",
    category: "Participation",
  },
  {
    id: "faq-3",
    question: "Is Aashav online or offline?",
    answer:
      "Aashav is conducted in a hybrid format — both offline (at SIMATS School of Engineering campus) and online participation options are fully supported.",
    category: "Participation",
  },
  {
    id: "faq-4",
    question: "When does registration close?",
    answer:
      "Registration closes strictly on 20 August 2026 at 2:00 PM IST. Early submission is strongly recommended as slots are limited.",
    category: "Schedule",
  },
  {
    id: "faq-5",
    question: "When will selected teams be announced?",
    answer:
      "The list of shortlisted teams will be officially published before 10:00 AM IST on 21 August 2026.",
    category: "Schedule",
  },
  {
    id: "faq-6",
    question: "When must selected teams confirm participation?",
    answer:
      "Selected teams must complete their participation confirmation before 10:00 PM IST on 21 August 2026 to lock their spot.",
    category: "Schedule",
  },
  {
    id: "faq-7",
    question: "Where is the offline event venue located?",
    answer:
      "The offline hackathon track will be held at SIMATS School of Engineering (Saveetha Institute of Medical and Technical Sciences), Chennai.",
    category: "General",
  },
  {
    id: "faq-8",
    question: "Are these real-world problem statements?",
    answer:
      "Yes. The problem statements used for Aashav are directly adapted from previous-year Smart India Hackathon (SIH) problem statements to give teams realistic industry-oriented preparation.",
    category: "Rules",
  },
  {
    id: "faq-9",
    question: "How many teams will be recognized as winners?",
    answer:
      "Exactly 5 teams will ultimately be selected and honored as winners during the Valedictory Ceremony.",
    category: "Rules",
  },
  {
    id: "faq-10",
    question: "What hardware/software stack can we use?",
    answer:
      "Teams are free to build using web, mobile, AI/ML, cloud, hardware/IoT, or embedded frameworks suitable for their chosen problem statement, provided all code developed is original.",
    category: "Rules",
  },
];
