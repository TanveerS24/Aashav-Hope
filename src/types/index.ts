export interface ProblemStatement {
  id: string;
  title: string;
  domain: string;
  source?: string;
  complexity?: string;
  category: string;
  description: string;
  track?: "software" | "hardware";
}

export interface CategorizedProblems {
  software: ProblemStatement[];
  hardware: ProblemStatement[];
}
