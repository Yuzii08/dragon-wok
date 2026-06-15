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

export default function Home() {
  return (
    <main>
      <Navbar />
      <NoodleScrollLine />
      <Hero />
      <Menu />
      <WokMixer />
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
