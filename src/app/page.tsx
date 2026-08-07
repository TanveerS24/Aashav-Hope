import React from "react";
import { getCategorizedProblemStatements } from "@/lib/problemParser";
import { Navbar } from "@/components/navigation/Navbar";
import { HeroSection } from "@/components/hero/HeroSection";
import { CountdownSection } from "@/components/countdown/CountdownSection";
import { AboutSection } from "@/components/about/AboutSection";
import { EventInfoGrid } from "@/components/info/EventInfoGrid";
import { ProblemStack } from "@/components/problems/ProblemStack";
import { TimelineSection } from "@/components/timeline/TimelineSection";
import { EvaluatorsSection } from "@/components/evaluators/EvaluatorsSection";
import { LocationSection } from "@/components/location/LocationSection";
import { WinnersSection } from "@/components/winners/WinnersSection";
import { FAQSection } from "@/components/faq/FAQSection";
import { ContactSection } from "@/components/contact/ContactSection";
import { Footer } from "@/components/footer/Footer";

export default function HomePage() {
  const categorized = getCategorizedProblemStatements();

  return (
    <main className="min-h-screen flex flex-col justify-between">
      <Navbar />

      <HeroSection />

      <AboutSection />

      <CountdownSection />

      <EventInfoGrid />

      <ProblemStack
        softwareProblems={categorized.software}
        hardwareProblems={categorized.hardware}
      />

      <TimelineSection />

      <EvaluatorsSection />

      <LocationSection />

      <WinnersSection />

      <ContactSection />

      <FAQSection />

      <Footer />
    </main>
  );
}
