import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import FacebookGallery from "@/components/FacebookGallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AdUnit from "@/components/ads/AdUnit";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <AdUnit slot="1234567890" className="py-4 bg-white" />
        <About />
        <Services />
        <AdUnit slot="0987654321" className="py-4 bg-sand/20" />
        <FacebookGallery />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
