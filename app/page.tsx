import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Menu from "@/components/Menu";
import WokMixer from "@/components/WokMixer";
import AnimatedWords from "@/components/AnimatedWords";
import PhotoCollage from "@/components/PhotoCollage";
import ScratchCard from "@/components/ScratchCard";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import MobileBar from "@/components/MobileBar";
import NoodleScrollLine from "@/components/NoodleScrollLine";

// New "Website of the Year" features
import Preloader from "@/components/Preloader";
import CursorTrail from "@/components/CursorTrail";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import FortuneCookie from "@/components/FortuneCookie";
import InteractiveReservation from "@/components/InteractiveReservation";

export default function Home() {
  return (
    <main>
      <Preloader />
      <CursorTrail />
      <ThemeSwitcher />
      <FortuneCookie />
      
      <Navbar />
      <NoodleScrollLine />
      <Hero />
      <Menu />
      <WokMixer />
      <InteractiveReservation />
      <AnimatedWords />
      <PhotoCollage />
      <ScratchCard />
      <Contact />
      <Footer />
      <WhatsAppFloat />
      <MobileBar />
    </main>
  );
}
