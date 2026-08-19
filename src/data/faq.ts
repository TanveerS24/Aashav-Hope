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
      "Aashav is open to passionate engineering, technology, and design students who want to experience real-world technical problem solving under timed constraints.",
    category: "General",
  },
  {
    id: "faq-2",
    question: "How many people can be in a team?",
    answer:
      "Solo participants are welcome! Teams can consist of 1 to 4 members. Cross-disciplinary collaboration is encouraged.",
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
      "Registration closes strictly on 24 August 2026 at 12:00 PM IST. Early submission is strongly recommended as slots are limited.",
    category: "Schedule",
  },
  {
    id: "faq-5",
    question: "When will selected teams be announced?",
    answer:
      "The list of shortlisted teams will be officially published on or before 25 August 2026 at 12:00 PM IST.",
    category: "Schedule",
  },
  {
    id: "faq-6",
    question: "When must selected teams confirm participation?",
    answer:
      "Selected teams must complete their participation confirmation before 10:00 PM IST on 25 August 2026 to lock their spot.",
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
      "Yes. The problem statements used for Aashav are directly adapted from real-world civic and industry challenges to give teams realistic engineering preparation.",
    category: "Rules",
  },
  {
    id: "faq-9",
    question: "How many teams will be recognized as winners and what do participants receive?",
    answer:
      "Exactly 5 teams will be honored as winners and awarded official Winner Certificates with Medals. In addition, all participating teams that present their project will receive official Participation Certificates.",
    category: "Rules",
  },
  {
    id: "faq-10",
    question: "What hardware/software stack can we use?",
    answer:
      "Teams are free to build using web, mobile, AI/ML, cloud, hardware/IoT, or embedded frameworks suitable for their chosen problem statement, provided all code developed is original.",
    category: "Rules",
  },
  {
    id: "faq-11",
    question: "Can our team bring our own problem statement?",
    answer:
      "Yes! We strongly encourage original ideas. Teams are welcome to propose their own problem statement, provided it is meaningful, solves a real-world civic or technological problem, and demonstrates genuine technical depth.",
    category: "Rules",
  },
  {
    id: "faq-12",
    question: "What metrics will projects be evaluated on?",
    answer:
      "All submissions will be evaluated by technical jury panels based on project completeness, real-world impact, usability, technical feasibility, and architectural defense.",
    category: "Rules",
  },
  {
    id: "faq-13",
    question: "Is there a cash prize for this?",
    answer:
      "Since the event is fully sponsored by us, we do not have any cash prize.",
    category: "General",
  },
];
