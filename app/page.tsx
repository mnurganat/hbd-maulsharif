import Stars from "@/components/Stars";
import Hero from "@/components/Hero";
import EventTimeline from "@/components/EventTimeline";
import Gallery from "@/components/Gallery";
import Wishlist from "@/components/Wishlist";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Stars />

      <Hero />

      <div className="h-px bg-gradient-to-r from-transparent via-[#3d0060] to-transparent mx-auto max-w-2xl" />

      <EventTimeline />

      <div className="h-px bg-gradient-to-r from-transparent via-[#3d0060] to-transparent mx-auto max-w-2xl" />

      <Gallery />

      <div className="h-px bg-gradient-to-r from-transparent via-[#3d0060] to-transparent mx-auto max-w-2xl" />

      <Wishlist />

      <Footer />
    </main>
  );
}
