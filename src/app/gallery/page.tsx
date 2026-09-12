import { Metadata } from "next";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/footer/Footer";
import { GalleryView } from "@/components/gallery/GalleryView";
import { EVENT_CONFIG } from "@/config/event";

export const metadata: Metadata = {
  title: `Event Gallery & Milestones | ${EVENT_CONFIG.eventName} 2026`,
  description: `Explore the photo retrospective, milestone defenses, evaluator reviews, and valedictory ceremony of ${EVENT_CONFIG.eventName} — ${EVENT_CONFIG.eventMeaning} at ${EVENT_CONFIG.venueName}.`,
  openGraph: {
    title: `Event Gallery | ${EVENT_CONFIG.eventName} 2026`,
    description: `Official photo archive and highlight defenses from the 24h engineering hackathon at SIMATS School of Engineering.`,
    images: ["/images/gallery/Winners.jpg"],
  },
};

export default function GalleryPage() {
  return (
    <main className="min-h-screen flex flex-col justify-between bg-[#07090e]">
      <Navbar />
      <GalleryView />
      <Footer />
    </main>
  );
}
